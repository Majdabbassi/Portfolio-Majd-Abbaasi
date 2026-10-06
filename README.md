# Majd Abbassi — Portfolio v2

"Every project is a toy." A warm, dark portfolio where each project page has a small interactive version of what the project does.

## Run it

```bash
npm install
npm start          # http://localhost:4200
npm run build      # production build in dist/majd-portfolio/browser
```

Needs Node 20.19+ or 22.12+. Deploys to Vercel as-is (`vercel.json` handles the routes; output directory: `dist/majd-portfolio/browser`).

## Where to edit things

| What | File |
| --- | --- |
| All project texts, links, colours, order | `src/app/data/projects.data.ts` |
| Home page texts, about, contact links | `src/app/data/site.data.ts` |
| Site-wide colours, fonts, buttons | `src/styles.css` (the `:root` variables) |
| Home page layout | `src/app/pages/home/` |
| Project page layout (shared by all 9) | `src/app/pages/project/` |
| The interactive toy of each project | `src/app/toys/<project>-toy.ts` |
| The looping animation on each home card | `src/app/shared/card-motif.ts` |

Search for `[` in the two data files to find every text still waiting for you.
Put your CV in `public/cv.pdf`.

## Adding a project

1. Add an entry to `PROJECTS` in `projects.data.ts` (pick a new `slug`).
2. Create `src/app/toys/<slug>-toy.ts` (copy a simple one like `insighthub-toy.ts`).
3. Add a `@case` for it in `src/app/toys/toy-host.ts` and in `src/app/shared/card-motif.ts`.
