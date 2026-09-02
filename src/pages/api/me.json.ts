import type { APIRoute } from 'astro';

export const GET: APIRoute = () =>
  new Response(
    JSON.stringify(
      {
        name: 'Shubham',
        handle: 'prsdx',
        role: 'B.Tech + M.Tech student, Information Technology',
        institution: 'IIITM Gwalior',
        location: 'Gwalior, India',
        graduating: 2027,
        // cpi: 9.01,  // uncomment when you want to expose this
        skills: [
          'TypeScript',
          'Python',
          'React',
          'Next.js',
          'Astro',
          'FastAPI',
          'PostgreSQL',
          'RAG',
          'LangChain',
          'ChromaDB',
          'OpenAI API',
          'Node.js',
          'Git',
        ],
        competitive_programming: {
          platform: 'Codeforces',
          handle: 'prsdx',
          rating: 1847,
          title: 'Expert',
          url: 'https://codeforces.com/profile/prsdx',
          // Note: rating changes — treat as approximate
        },
        links: {
          github: 'https://github.com/prsdx',
          x: 'https://x.com/prsd_x',
          codeforces: 'https://codeforces.com/profile/prsdx',
          portfolio: import.meta.env.SITE,
          // email: 'your@email.com',   // add when ready
          // linkedin: 'https://linkedin.com/in/...',  // add when ready
        },
        projects: ['merix', 'platewise', 'yourtomo'],
        open_to: ['Summer 2027 internships (backend / AI)', 'open-source collaboration', 'research-adjacent projects'],
      },
      null,
      2
    ),
    { headers: { 'Content-Type': 'application/json' } }
  );
