import { defineCollection, z } from 'astro:content';

const baseSchema = z.object({
  title: z.string(),
  date: z.coerce.date(),
  excerpt: z.string(),
  tags: z.array(z.string()).default([]),
  draft: z.boolean().default(false),
});

const blog = defineCollection({
  type: 'content',
  schema: baseSchema,
});

const projects = defineCollection({
  type: 'content',
  schema: baseSchema,
});

export const collections = { blog, projects };
