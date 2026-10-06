// ============================================================
//  MINI-MAJD — what the mascot says. Edit freely (EN + FR).
// ============================================================
import { L } from '../i18n/i18n';

export const MASCOT = {
  name: { en: 'mini-Majd', fr: 'mini-Majd' } as L,

  greetHome: { en: "Hi! I'm mini-Majd. Want a 30-second tour?", fr: 'Salut ! Moi c’est mini-Majd. Une visite de 30 secondes ?' } as L,
  greetProject: { en: 'Want me to show you around this one?', fr: 'Je vous fais visiter celui-ci ?' } as L,

  // Random lines, any page
  lines: [
    { en: 'Psst — the CV is in the top bar.', fr: 'Psst — le CV est dans la barre du haut.' },
    { en: 'Most of these run with a single “docker compose up”.', fr: 'La plupart tournent avec un simple « docker compose up ».' },
    { en: 'Try FR in the top bar. I’m bilingual too.', fr: 'Essayez EN en haut. Je suis bilingue aussi.' },
    { en: 'I’m the small version. The real one answers emails.', fr: 'Je suis la petite version. Le vrai répond aux e-mails.' },
    { en: 'Every card on the shelf is playable. Really.', fr: 'Chaque carte de l’étagère se joue. Vraiment.' },
  ] as L[],

  // Guided tour of the home page: CSS selector + what I say there
  tourHome: [
    { sel: '#top h1', text: { en: 'This is Majd. Full-stack, production-minded, based in Sousse.', fr: 'Voici Majd. Full-stack, orienté production, basé à Sousse.' } },
    { sel: '#shelf .card', text: { en: 'Each card is a project you can play with. Click one after the tour!', fr: 'Chaque carte est un projet jouable. Cliquez-en une après la visite !' } },
    { sel: '#shelf .more', text: { en: 'Real products in production live here too.', fr: 'Ici, des produits réels en production.' } },
    { sel: '#lab', text: { en: 'The lab: where things get broken on purpose, so they don’t break in production.', fr: 'Le labo : on casse exprès ici, pour ne pas casser en production.' } },
    { sel: '#about .skills', text: { en: 'The everyday toolbox, by domain.', fr: 'La boîte à outils du quotidien, par domaine.' } },
    { sel: '#about .timelines', text: { en: 'Work on one side, studies on the other — Polytechnique de Sousse included.', fr: 'Le travail d’un côté, les études de l’autre — Polytechnique de Sousse comprise.' } },
    { sel: '#contact', text: { en: 'And this is how you reach the real me. See you!', fr: 'Et voici comment joindre le vrai moi. À bientôt !' } },
  ] as { sel: string; text: L }[],

  // Guided tour of a project page
  tourProject: [
    { sel: '.toy', text: { en: 'Play with this first — it is the core idea of the project.', fr: 'Jouez d’abord avec ceci — c’est l’idée centrale du projet.' } },
    { sel: '.facts', text: { en: 'Role, team, timeline, scale. The quick facts.', fr: 'Rôle, équipe, durée, échelle. L’essentiel.' } },
    { sel: '#screens', text: { en: 'The real app. Click a screenshot to zoom.', fr: 'La vraie app. Cliquez sur une capture pour zoomer.' } },
    { sel: '#logins', text: { en: 'Demo accounts — click to copy, then try the live demo.', fr: 'Comptes démo — cliquez pour copier, puis testez la démo.' } },
    { sel: '.challenges', text: { en: 'The hard parts, and how they were solved.', fr: 'Les parties difficiles, et comment elles ont été résolues.' } },
    { sel: '#deployment', text: { en: 'How it ships: the release flow and where it runs.', fr: 'Comment c’est livré : le flux de release et où ça tourne.' } },
    { sel: '.next', text: { en: 'Next project is right here. Enjoy!', fr: 'Le projet suivant est juste là. Bonne visite !' } },
  ] as { sel: string; text: L }[],

  ui: {
    en: { tour: 'Quick tour', say: 'Say something', hide: 'Hide me', yes: 'Yes, show me', later: 'Later', next: 'Next', done: 'Done', skip: 'Skip', back: 'Bring mini-Majd back', open: 'mini-Majd — open menu' },
    fr: { tour: 'Visite rapide', say: 'Dis un truc', hide: 'Cache-toi', yes: 'Oui, montre-moi', later: 'Plus tard', next: 'Suivant', done: 'Fini', skip: 'Passer', back: 'Faire revenir mini-Majd', open: 'mini-Majd — ouvrir le menu' },
  },
};
