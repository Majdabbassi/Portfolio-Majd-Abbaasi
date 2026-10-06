import { ProjectDetail } from '../../shared/project-detail';

const shots = (c: string[]) => [
  { src: '/assets/screens/data-analytics/analysis.png', caption: c[0] },
  { src: '/assets/screens/data-analytics/dashboard.png', caption: c[1] },
  { src: '/assets/screens/data-analytics/insights.png', caption: c[2] },
  { src: '/assets/screens/data-analytics/cleaning.png', caption: c[3] },
  { src: '/assets/screens/data-analytics/relationships.png', caption: c[4] },
];

export const DATA_ANALYTICS: { en: ProjectDetail; fr: ProjectDetail } = {
  en: {
    id: 'data-analytics',
    title: 'InsightHub — Data Analytics with an AI Assistant That Runs Safe SQL',
    summary:
      'Upload a CSV and the platform works out what each column means, scores the data quality, finds outliers and trends, suggests cleaning, builds a dashboard, detects links between files, and lets you ask questions in plain English that run as read-only SQL over your own data.',
    status: 'completed',
    role: 'Full Stack Engineer',
    roleContext: 'Backend, data service and Angular front end',
    techStack: ['Spring Boot 4', 'Java 21', 'FastAPI', 'Pandas', 'DuckDB', 'MySQL', 'Angular 21', 'Ollama', 'Docker'],
    metrics: {
      team: 'Solo',
      duration: 'Built and hardened in 2026',
      scale: 'Three services · local LLM · no data leaves your machine',
      keyOutcomes: [
        'Semantic column roles (identifier, temporal, categorical, continuous…) drive charting and cleaning',
        'A data quality score, distribution-aware cleaning and trend and period comparisons',
        'An AI assistant whose generated SQL cannot touch anything but your datasets',
      ],
    },
    context: {
      problem:
        'Most CSV tools show column types and a bar chart. Real analysis needs to know that an ID must not be “cleaned”, that a skewed column should be filled with the median, and that two files share a key.',
      constraints: [
        'Analysis must be reproducible and never alter the original file',
        'The AI assistant must be useful without sending data to an external service',
        'Model-written SQL cannot be trusted: it must be unable to read anything except the user’s data',
      ],
      goals: [
        'Classify columns by meaning, with a confidence and the reasoning',
        'Turn cleaning into a traceable new dataset version',
        'Answer questions over the data with the analysis already computed',
      ],
    },
    architecture: {
      diagramPlaceholder: 'InsightHub architecture',
      bullets: [
        'Angular talks to a Spring Boot API through an nginx proxy; the API owns auth (JWT), projects, datasets and per-user isolation.',
        'A FastAPI and Pandas service does the analysis: roles, outliers (IQR), correlations, quality score, cleaning, trends and comparisons.',
        'The assistant calls a local Ollama model, which proposes a SELECT. DuckDB runs it over the uploaded files with file and network access switched off and its configuration locked.',
        'Relationship detection compares identifier columns across datasets and lets you confirm or reject the suggested keys.',
      ],
      highlights: [
        { title: 'Meaning, not types', description: 'Each column gets a role that decides how it is charted and cleaned.' },
        { title: 'Sandboxed SQL', description: 'The engine itself refuses file access, so no query wording can escape.' },
      ],
      tiers: [
        { label: 'Web', nodes: [{ name: 'Angular 21', sub: 'dashboards · relationship diagram · chat' }] },
        { label: 'API', nodes: [{ name: 'Spring Boot 4', sub: 'JWT · projects · datasets · isolation' }] },
        { label: 'Services', nodes: [
          { name: 'FastAPI + Pandas', sub: 'analysis · cleaning · insights' },
          { name: 'DuckDB', sub: 'sandboxed read-only SQL' },
          { name: 'Ollama', sub: 'local LLM' },
        ] },
        { label: 'Data', nodes: [{ name: 'MySQL', sub: 'users · projects · analyses · relationships' }] },
      ],
      note: 'The assistant never sees or sends data outside your machine',
    },
    decisions: [
      {
        title: 'Lock the SQL engine, do not only filter the SQL',
        reasoning: 'Keyword and table-name checks can be slipped past. After the datasets are registered, DuckDB runs with external access disabled and the configuration locked, so the boundary is the engine.',
        tradeoffs: 'The text checks remain only for clear error messages.',
      },
      {
        title: 'A local model by default',
        reasoning: 'Data never leaves the machine and there is no API key to manage.',
        tradeoffs: 'A small model follows instructions less well; a larger one is a one-line setting.',
      },
    ],
    deployment: {
      isDeployed: false,
      details: [],
      considerations: [
        'The stack runs with docker compose up (MySQL, API, analytics service, web, Ollama), all ports on 127.0.0.1',
        'It is not hosted publicly: it needs a local LLM, so the demo is run locally with the bundled sample data',
        'Scripts register a demo user and upload the sample CSVs in one command',
      ],
    },
    challenges: [
      {
        challenge: 'The AI assistant’s SQL could be made to read files inside the container.',
        solution: 'Found by attacking the endpoint: a comment between FROM and a table function slipped past the regex checks. The fix disables external access in the engine and locks the configuration, with a regression test that fails when the lock is removed.',
        outcome: 'Legitimate queries still work; every file-read attempt is refused by the engine.',
      },
    ],
    impact: {
      improvements: [
        'A real boundary around model-generated SQL instead of string filtering',
        'Cross-user isolation checked: another account gets 403 on every project route',
      ],
      learnings: [
        'Never rely on parsing untrusted SQL: restrict the engine',
        'A local LLM changes the privacy story, and the safety work',
      ],
    },
    showcase: {
      repo: 'https://github.com/Majdabbassi/InsightHub',
      note: 'Runs locally with Docker; sample CSVs (customers, orders, order items) are included to follow the walkthrough.',
      screens: shots([
        'Data quality analysis',
        'Auto-curated dashboard',
        'Insights: top and bottom performers',
        'Distribution-aware cleaning',
        'Relationship diagram across datasets',
      ]),
    },
  },
  fr: {
    id: 'data-analytics',
    title: 'InsightHub — Analyse de données avec un assistant IA qui exécute du SQL sûr',
    summary:
      'Téléversez un CSV : la plateforme comprend ce que signifie chaque colonne, note la qualité des données, trouve valeurs aberrantes et tendances, propose un nettoyage, construit un tableau de bord, détecte les liens entre fichiers et vous laisse poser des questions en français ou en anglais qui s’exécutent en SQL lecture seule sur vos propres données.',
    status: 'completed',
    role: 'Ingénieur Full Stack',
    roleContext: 'Backend, service de données et front Angular',
    techStack: ['Spring Boot 4', 'Java 21', 'FastAPI', 'Pandas', 'DuckDB', 'MySQL', 'Angular 21', 'Ollama', 'Docker'],
    metrics: {
      team: 'En solo',
      duration: 'Construit et durci en 2026',
      scale: 'Trois services · LLM local · aucune donnée ne quitte votre machine',
      keyOutcomes: [
        'Des rôles sémantiques de colonnes (identifiant, temporel, catégoriel, continu…) pilotent graphiques et nettoyage',
        'Un score de qualité, un nettoyage selon la distribution, tendances et comparaisons de périodes',
        'Un assistant IA dont le SQL généré ne peut toucher que vos jeux de données',
      ],
    },
    context: {
      problem:
        'La plupart des outils CSV montrent des types de colonnes et un histogramme. Une vraie analyse sait qu’un identifiant ne se « nettoie » pas, qu’une colonne asymétrique se remplit par la médiane et que deux fichiers partagent une clé.',
      constraints: [
        'L’analyse doit être reproductible et ne jamais modifier le fichier d’origine',
        'L’assistant doit être utile sans envoyer de données à un service externe',
        'Un SQL écrit par un modèle n’est pas fiable : il doit être incapable de lire autre chose que les données de l’utilisateur',
      ],
      goals: [
        'Classer les colonnes par sens, avec une confiance et le raisonnement',
        'Faire du nettoyage une nouvelle version traçable du jeu de données',
        'Répondre aux questions avec l’analyse déjà calculée',
      ],
    },
    architecture: {
      diagramPlaceholder: 'Architecture InsightHub',
      bullets: [
        'Angular parle à une API Spring Boot via un proxy nginx ; l’API gère l’authentification (JWT), projets, jeux de données et isolation par utilisateur.',
        'Un service FastAPI et Pandas fait l’analyse : rôles, valeurs aberrantes (IQR), corrélations, score de qualité, nettoyage, tendances et comparaisons.',
        'L’assistant appelle un modèle Ollama local qui propose un SELECT. DuckDB l’exécute sur les fichiers téléversés, accès fichiers et réseau coupés et configuration verrouillée.',
        'La détection de relations compare les colonnes d’identifiants entre jeux de données et vous laisse confirmer ou rejeter les clés suggérées.',
      ],
      highlights: [
        { title: 'Le sens, pas les types', description: 'Chaque colonne reçoit un rôle qui décide comment elle est tracée et nettoyée.' },
        { title: 'SQL en bac à sable', description: 'Le moteur lui-même refuse l’accès aux fichiers : aucune formulation ne peut s’échapper.' },
      ],
      tiers: [
        { label: 'Web', nodes: [{ name: 'Angular 21', sub: 'tableaux de bord · diagramme de relations · chat' }] },
        { label: 'API', nodes: [{ name: 'Spring Boot 4', sub: 'JWT · projets · jeux de données · isolation' }] },
        { label: 'Services', nodes: [
          { name: 'FastAPI + Pandas', sub: 'analyse · nettoyage · insights' },
          { name: 'DuckDB', sub: 'SQL lecture seule en bac à sable' },
          { name: 'Ollama', sub: 'LLM local' },
        ] },
        { label: 'Données', nodes: [{ name: 'MySQL', sub: 'utilisateurs · projets · analyses · relations' }] },
      ],
      note: 'L’assistant ne voit ni n’envoie jamais de données hors de votre machine',
    },
    decisions: [
      {
        title: 'Verrouiller le moteur SQL, pas seulement filtrer le SQL',
        reasoning: 'Des contrôles de mots-clés et de noms de tables se contournent. Une fois les jeux de données enregistrés, DuckDB tourne avec l’accès externe désactivé et la configuration verrouillée : la frontière, c’est le moteur.',
        tradeoffs: 'Les contrôles textuels ne restent que pour de clairs messages d’erreur.',
      },
      {
        title: 'Un modèle local par défaut',
        reasoning: 'Les données ne quittent pas la machine et aucune clé d’API à gérer.',
        tradeoffs: 'Un petit modèle suit moins bien les instructions ; un plus grand est un réglage d’une ligne.',
      },
    ],
    deployment: {
      isDeployed: false,
      details: [],
      considerations: [
        'La pile tourne avec docker compose up (MySQL, API, service d’analyse, web, Ollama), tous les ports sur 127.0.0.1',
        'Elle n’est pas hébergée publiquement : il faut un LLM local, la démo se lance donc en local avec les données d’exemple fournies',
        'Des scripts créent un utilisateur de démo et téléversent les CSV d’exemple en une commande',
      ],
    },
    challenges: [
      {
        challenge: 'Le SQL de l’assistant IA pouvait être amené à lire des fichiers dans le conteneur.',
        solution: 'Trouvé en attaquant l’endpoint : un commentaire entre FROM et une fonction de table passait les contrôles par expressions régulières. Le correctif désactive l’accès externe dans le moteur et verrouille la configuration, avec un test de non-régression qui échoue si on retire le verrou.',
        outcome: 'Les requêtes légitimes marchent toujours ; toute tentative de lecture de fichier est refusée par le moteur.',
      },
    ],
    impact: {
      improvements: [
        'Une vraie frontière autour du SQL généré par un modèle plutôt que du filtrage de chaînes',
        'Isolation entre utilisateurs vérifiée : un autre compte reçoit 403 sur chaque route de projet',
      ],
      learnings: [
        'Ne jamais compter sur l’analyse d’un SQL non fiable : restreindre le moteur',
        'Un LLM local change l’histoire de la confidentialité, et le travail de sécurité',
      ],
    },
    showcase: {
      repo: 'https://github.com/Majdabbassi/InsightHub',
      note: 'Fonctionne en local avec Docker ; des CSV d’exemple (clients, commandes, lignes de commande) suivent le guide pas à pas.',
      screens: shots([
        'Analyse de la qualité des données',
        'Tableau de bord auto-composé',
        'Insights : meilleurs et moins bons performeurs',
        'Nettoyage selon la distribution',
        'Diagramme de relations entre jeux de données',
      ]),
    },
  },
};
