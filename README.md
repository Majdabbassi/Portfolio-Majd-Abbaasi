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

Every text exists in English (`en`) and French (`fr`). The EN/FR switch is in the top bar.

| What | File |
| --- | --- |
| Shelf order, card texts, colours, icons, mascot lines per project | `src/app/data/projects.data.ts` |
| Full case studies (problem, decisions, challenges, screenshots, demo logins) | `src/app/data/details/<project>.ts` |
| Home page texts, about, experience timeline, contact links, CV files | `src/app/data/site.data.ts` |
| What mini-Majd says, and the guided tours | `src/app/mascot/mascot.data.ts` |
| Short interface labels (buttons, section titles) | `src/app/i18n/i18n.ts` |
| Site-wide colours, fonts, buttons | `src/styles.css` (the `:root` variables) |
| Home page layout | `src/app/pages/home/` |
| Project page layout (shared by all projects) | `src/app/pages/project/` |
| The interactive toy of each project | `src/app/toys/<project>-toy.ts` |
| The looping animation on each home card | `src/app/shared/card-motif.ts` |
| Images, screenshots, CVs, photo | `public/assets/` |

Search for `[` in `site.data.ts` to find the texts still waiting for you.

## Adding a project

1. Add a case study in `src/app/data/details/`, then an entry to `PROJECTS` (with a toy) or `MORE_PROJECTS` (without) in `projects.data.ts`.
2. Create `src/app/toys/<slug>-toy.ts` (copy a simple one like `insighthub-toy.ts`).
3. Add a `@case` for it in `src/app/toys/toy-host.ts` and in `src/app/shared/card-motif.ts`.
