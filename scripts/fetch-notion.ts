import { Client } from "@notionhq/client";
import { NotionToMarkdown } from "notion-to-md";
import { createHash } from "node:crypto";
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

// --- Config ---
const NOTION_TOKEN = process.env.NOTION_TOKEN;
const NOTION_DATABASE_ID = process.env.NOTION_DATABASE_ID;

// Property name overrides (case-sensitive for Notion API filters).
// Set these to match the exact names in your Notion database.
// The Getters below use these values with case-insensitive matching.
const PROP_PUBLISHED = process.env.NOTION_PROP_PUBLISHED ?? "published";
const PROP_DATE = process.env.NOTION_PROP_DATE ?? "post date";
const PROP_TITLE = process.env.NOTION_PROP_TITLE ?? "Name";   // fallback to "Title" too
const PROP_SLUG = process.env.NOTION_PROP_SLUG ?? "Slug";
const PROP_EXCERPT = process.env.NOTION_PROP_EXCERPT ?? "Excerpt";
const PROP_TAGS = process.env.NOTION_PROP_TAGS ?? "Tags";

if (!NOTION_TOKEN) {
  console.error("ERROR: NOTION_TOKEN environment variable is not set.");
  console.error("Add it to your .env file or export it in your shell.");
  process.exit(1);
}
if (!NOTION_DATABASE_ID) {
  console.error("ERROR: NOTION_DATABASE_ID environment variable is not set.");
  console.error("Add it to your .env file or export it in your shell.");
  process.exit(1);
}

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const BLOG_DIR = join(__dirname, "..", "src", "content", "blog");

// --- Notion client setup ---
const notion = new Client({ auth: NOTION_TOKEN });
const n2m = new NotionToMarkdown({ notionClient: notion });

// --- Types ---
interface NotionProperties {
  [key: string]: {
    type: string;
    title?: Array<{ plain_text: string }>;
    rich_text?: Array<{ plain_text: string }>;
    multi_select?: Array<{ name: string }>;
    checkbox?: boolean;
    date?: { start: string } | null;
  };
}

// --- Property helpers (case-insensitive name + type matching) ---

function findProp(props: NotionProperties, name: string, expectedType: string) {
  const lower = name.toLowerCase();
  for (const [key, prop] of Object.entries(props)) {
    if (key.toLowerCase() === lower && prop.type === expectedType) return prop;
  }
  return null;
}

function getText(props: NotionProperties, name: string): string {
  const prop = findProp(props, name, "title") ?? findProp(props, name, "rich_text");
  if (!prop) return "";
  if (prop.title?.[0]?.plain_text) return prop.title[0].plain_text;
  if (prop.rich_text?.[0]?.plain_text) return prop.rich_text[0].plain_text;
  return "";
}

function getDate(props: NotionProperties, name: string): string | null {
  const prop = findProp(props, name, "date");
  const start = prop?.date?.start;
  if (!start) return null;
  return start.split("T")[0]!;
}

function getMultiSelect(props: NotionProperties, name: string): string[] {
  const prop = findProp(props, name, "multi_select");
  return prop?.multi_select?.map((item) => item.name) ?? [];
}

function slugify(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

function hashContent(content: string): string {
  return createHash("sha256").update(content).digest("hex").slice(0, 12);
}
function buildMdx(
  title: string,
  date: string,
  excerpt: string,
  tags: string[],
  body: string,
): string {
  const tagsStr =
    tags.length > 0
      ? `[${tags.map((t) => `"${t.replace(/"/g, '\\"')}"`).join(", ")}]`
      : "[]";

  return `---
title: "${title.replace(/"/g, '\\"')}"
date: ${date}
tags: ${tagsStr}
excerpt: "${excerpt.replace(/"/g, '\\"')}"
draft: false
---

${body.trim()}
`;
}
// --- Main ---
async function main() {
  await mkdir(BLOG_DIR, { recursive: true });

  // 1. Resolve data source ID
  // The NOTION_DATABASE_ID from the URL may be a database ID or data source ID.
  // We try to retrieve it as a database first; if that works, grab the first
  // data source. Otherwise fall back to using it directly as data_source_id.
  console.log("🔍 Resolving Notion database...");
  let dataSourceId = NOTION_DATABASE_ID!;
  try {
    const db = await notion.databases.retrieve({ database_id: NOTION_DATABASE_ID! });
    const ds = (db as any).data_sources?.[0]?.id;
    if (ds) {
      dataSourceId = ds;
      console.log(`   Found data source: ${dataSourceId}`);
    } else {
      console.log(`   No data sources found, using database ID as data source ID`);
    }
  } catch {
    console.log(`   Not a database ID, treating as data source ID directly`);
  }

  // 2. Query published pages
  console.log("🔍 Querying published pages...");
  const response = await notion.dataSources.query({
    data_source_id: dataSourceId,
    filter: {
      property: PROP_PUBLISHED,
      checkbox: { equals: true },
    },
    sorts: [{ property: PROP_DATE, direction: "descending" }],
  });

  const pages = response.results;
  console.log(`   Found ${pages.length} published page(s).\n`);

  let newCount = 0;
  let updatedCount = 0;
  let unchangedCount = 0;
  let skippedCount = 0;

  // 2. Process each page
  for (const page of pages) {
    const props = page.properties as NotionProperties;

    const title = getText(props, PROP_TITLE) || getText(props, "Title");
    let slug = getText(props, PROP_SLUG);
    const excerpt = getText(props, PROP_EXCERPT);
    const tags = getMultiSelect(props, PROP_TAGS);
    const date = getDate(props, PROP_DATE);

    // Validate required fields
    if (!title) {
      console.warn(`   ⚠  SKIP page ${page.id}: missing title`);
      skippedCount++;
      continue;
    }
    if (!date) {
      console.warn(`   ⚠  SKIP "${title}": missing date property`);
      skippedCount++;
      continue;
    }
    if (!slug) {
      slug = slugify(title);
      console.log(`   ℹ  "${title}" — no slug set, generated: "${slug}"`);
    }

    console.log(`   📄 "${title}" → ${slug}.mdx`);

    // Convert Notion blocks to markdown
    let mdBody: string;
    try {
      const mdBlocks = await n2m.pageToMarkdown(page.id);
      const result = n2m.toMarkdownString(mdBlocks);
      // notion-to-md v3 returns { parent: string } when separateChildPage is false
      mdBody =
        typeof result === "object" && result !== null && "parent" in result
          ? (result as { parent: string }).parent
          : String(result);
    } catch (err) {
      console.error(
        `   ❌ ERROR converting "${title}":`,
        err instanceof Error ? err.message : err,
      );
      skippedCount++;
      continue;
    }

    if (!mdBody.trim()) {
      console.warn(`   ⚠  SKIP "${title}": empty body after conversion`);
      skippedCount++;
      continue;
    }

    // Build MDX file content
    const mdxContent = buildMdx(title, date, excerpt || title, tags, mdBody);
    const filePath = join(BLOG_DIR, `${slug}.mdx`);
    const newHash = hashContent(mdxContent);

    // Compare with existing file (hash-based change detection)
    if (existsSync(filePath)) {
      const existing = await readFile(filePath, "utf-8");
      if (hashContent(existing) === newHash) {
        console.log(`      ⏭  unchanged`);
        unchangedCount++;
        continue;
      }
      console.log(`      ✏  updated`);
      updatedCount++;
    } else {
      console.log(`      ✨ new`);
      newCount++;
    }

    await writeFile(filePath, mdxContent, "utf-8");
  }

  // 3. Print summary
  console.log(`\n---`);
  console.log(`   ✨ New:       ${newCount}`);
  console.log(`   ✏  Updated:   ${updatedCount}`);
  console.log(`   ⏭  Unchanged: ${unchangedCount}`);
  console.log(`   ⚠  Skipped:   ${skippedCount}`);
  console.log(`   📁 Output:    ${BLOG_DIR}`);
}

main().catch((err) => {
  console.error("\n❌ FATAL:", err instanceof Error ? err.message : err);
  process.exit(1);
});