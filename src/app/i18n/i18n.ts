import { DOCUMENT, Injectable, computed, inject, signal } from '@angular/core';

export type Lang = 'en' | 'fr';
/** A text in both languages. */
export type L<T = string> = { en: T; fr: T };

const KEY = 'portfolio_lang';

@Injectable({ providedIn: 'root' })
export class I18n {
  private doc = inject(DOCUMENT);
  readonly lang = signal<Lang>(this.initial());
  readonly isFr = computed(() => this.lang() === 'fr');

  constructor() { this.apply(); }

  set(lang: Lang) {
    this.lang.set(lang);
    try { localStorage.setItem(KEY, lang); } catch { /* private mode */ }
    this.apply();
  }

  toggle() { this.set(this.lang() === 'en' ? 'fr' : 'en'); }

  /** Pick the current language from a bilingual value. */
  tr<T>(v: L<T>): T { return v[this.lang()]; }

  /** UI label by key (see UI below). */
  t(key: keyof typeof UI.en): string { return UI[this.lang()][key]; }

  private initial(): Lang {
    try {
      const s = localStorage.getItem(KEY);
      if (s === 'en' || s === 'fr') return s;
    } catch { /* ignore */ }
    return typeof navigator !== 'undefined' && navigator.language?.startsWith('fr') ? 'fr' : 'en';
  }

  private apply() { this.doc.documentElement.lang = this.lang(); }
}

/** Short interface labels. Long texts live in the data/ files. */
export const UI = {
  en: {
    work: 'Work', about: 'About', contact: 'Contact', cv: 'CV', projects: 'Projects', lab: 'Lab',
    playProjects: 'Play with my projects', downloadCv: 'Download CV',
    play: 'Play →', open: 'Open →', moreTitle: 'More projects', moreText: 'Real products without a toy (yet) — open them for the full case study.',
    back: '← back to the shelf', liveDemo: 'Live demo', github: 'GitHub', privateRepo: 'Code on request', apk: 'Android APK',
    role: 'Role', team: 'Team', timeline: 'Timeline', scale: 'Scale',
    screens: 'The real thing', tryIt: 'Try it yourself', user: 'User', password: 'Password', copy: 'Copy', copied: 'Copied',
    problem: 'The problem', goals: 'Goals', built: 'How it is built', decisions: 'Key decisions', tradeoff: 'Trade-off',
    hard: 'The hard parts', challenge: 'Challenge', solution: 'Solution', outcome: 'Outcome',
    result: 'What it changed', learned: 'What I learned',
    next: 'Next on the shelf', endTitle: "That's the whole shelf", endCta: "Let's build the next one together",
    noToy: 'No toy for this one yet', noToyText: 'This project is a real product with real users. Here is what it does:',
    experience: 'The road so far', close: 'Close', previous: 'Previous', nextShot: 'Next',
    status_production: 'In production', status_completed: 'Completed', 'status_in-development': 'In development', status_flagship: 'My favourite',
    switchLang: 'FR', switchLangLabel: 'Passer en français', themeLight: 'Switch to light theme', themeDark: 'Switch to dark theme',
    deployment: 'Deployment', deployFlow: 'Release flow', environment: 'Environment', infra: 'Infrastructure details',
    considerations: 'Production considerations', notDeployed: "This project was built as a case study. Here's what a production deployment would require:",
    live: 'Live', mobile: 'Mobile app', workTl: 'Work', studiesTl: 'Studies', keyOutcomes: 'Key outcomes', constraints: 'Constraints', highlights: 'Highlights', toTop: 'Back to top ↑', platform: 'Platform', store: 'Store', build: 'Build',
  },
  fr: {
    work: 'Projets', about: 'À propos', contact: 'Contact', cv: 'CV', projects: 'Projets', lab: 'Labo',
    playProjects: 'Jouer avec mes projets', downloadCv: 'Télécharger le CV',
    play: 'Jouer →', open: 'Ouvrir →', moreTitle: 'Autres projets', moreText: 'De vrais produits sans jouet (pour l’instant) — ouvrez-les pour l’étude de cas complète.',
    back: '← retour à l’étagère', liveDemo: 'Démo en ligne', github: 'GitHub', privateRepo: 'Code sur demande', apk: 'APK Android',
    role: 'Rôle', team: 'Équipe', timeline: 'Durée', scale: 'Échelle',
    screens: 'Le vrai produit', tryIt: 'Essayez vous-même', user: 'Identifiant', password: 'Mot de passe', copy: 'Copier', copied: 'Copié',
    problem: 'Le problème', goals: 'Objectifs', built: 'Comment c’est construit', decisions: 'Décisions clés', tradeoff: 'Compromis',
    hard: 'Les parties difficiles', challenge: 'Défi', solution: 'Solution', outcome: 'Résultat',
    result: 'Ce que ça a changé', learned: 'Ce que j’ai appris',
    next: 'Suivant sur l’étagère', endTitle: 'C’est toute l’étagère', endCta: 'Construisons le prochain ensemble',
    noToy: 'Pas encore de jouet pour celui-ci', noToyText: 'Ce projet est un vrai produit avec de vrais utilisateurs. Voici ce qu’il fait :',
    experience: 'Le chemin jusqu’ici', close: 'Fermer', previous: 'Précédent', nextShot: 'Suivant',
    status_production: 'En production', status_completed: 'Terminé', 'status_in-development': 'En développement', status_flagship: 'Mon préféré',
    switchLang: 'EN', switchLangLabel: 'Switch to English', themeLight: 'Passer au thème clair', themeDark: 'Passer au thème sombre',
    deployment: 'Déploiement', deployFlow: 'Flux de release', environment: 'Environnement', infra: "Détails d'infrastructure",
    considerations: 'Considérations de production', notDeployed: 'Ce projet a été conçu comme une étude de cas. Voici ce qu’un déploiement en production nécessiterait :',
    live: 'En ligne', mobile: 'Application mobile', workTl: 'Expérience', studiesTl: 'Études', keyOutcomes: 'Résultats clés', constraints: 'Contraintes', highlights: 'Points forts', toTop: 'Haut de page ↑', platform: 'Plateforme', store: 'Store', build: 'Build',
  },
} as const;
