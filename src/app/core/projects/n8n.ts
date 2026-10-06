import { ProjectDetail } from '../../shared/project-detail';

const shots = (c: string[]) => [
  { src: '/assets/screens/n8n/campaign.png', caption: c[0] },
  { src: '/assets/screens/n8n/lead-database.png', caption: c[1] },
  { src: '/assets/screens/n8n/email-audit.png', caption: c[2] },
  { src: '/assets/screens/n8n/lead-search-build.png', caption: c[3] },
  { src: '/assets/screens/n8n/ausbildung-finder.png', caption: c[4] },
];

export const N8N: { en: ProjectDetail; fr: ProjectDetail } = {
  en: {
    id: 'n8n',
    title: 'ReachFlow — Lead Discovery and Outreach Automation',
    summary:
      'A local tool that finds businesses on Google Maps through an n8n and Apify workflow, extracts their contact emails, and runs personalized Gmail campaigns with attachments, reply and bounce tracking. It started as a way to find apprenticeship (Ausbildung) opportunities in Germany.',
    status: 'completed',
    role: 'Full Stack Engineer',
    roleContext: 'Automation, backend and Angular front end',
    techStack: ['n8n', 'Apify', 'Spring Boot', 'Angular', 'MySQL', 'Gmail SMTP/IMAP', 'MailHog', 'Docker Compose'],
    metrics: {
      team: 'Solo',
      duration: 'Built, audited and documented in 2026',
      scale: 'Demo mode: runs fully offline in one command',
      keyOutcomes: [
        'A scrape that no longer blocks the request: the endpoint answers in 70 ms instead of minutes',
        'Campaigns that can be stopped and resumed without emailing anyone twice',
        'Stored mail passwords encrypted with AES-256-GCM; every port bound to localhost',
      ],
    },
    context: {
      problem:
        'Finding companies that take apprentices, getting their emails and writing to them one by one is slow manual work. It needs discovery, de-duplication, categorization and a mailer that is careful not to repeat itself.',
      constraints: [
        'It handles real email credentials, so it must be explicit about being a local tool and protect what it stores',
        'Scraping and sending depend on third-party accounts a reviewer does not have',
        'A reviewer should still see the whole product work in minutes',
      ],
      goals: [
        'Discovery to campaign in one product: search, leads, categories, clients, campaigns, audit',
        'A demo mode that replaces the scraper and the mailer with local stand-ins',
        'No double sends, even after a stop and relaunch',
      ],
    },
    architecture: {
      diagramPlaceholder: 'ReachFlow architecture',
      bullets: [
        'The Spring Boot backend calls an n8n webhook that runs the Apify Google Maps scrape and returns businesses with emails.',
        'Leads are de-duplicated, tied to categories and matched to clients; a client only emails leads of its categories.',
        'Campaigns send through Gmail SMTP with attachments, track replies and bounces over IMAP, and expose live progress.',
        'In demo mode a mock scraper answers the same webhook and MailHog catches every email, so nothing real is contacted.',
      ],
      highlights: [
        { title: 'Safe to try', description: 'Demo mode needs no account and sends nothing real.' },
        { title: 'Resumable sending', description: 'Relaunching a stopped campaign skips people already emailed.' },
      ],
      tiers: [
        { label: 'Web', nodes: [{ name: 'Angular app', sub: 'search · leads · campaigns · email audit' }] },
        { label: 'API', nodes: [{ name: 'Spring Boot', sub: 'leads · categories · campaigns · mailer' }] },
        { label: 'Automation', nodes: [
          { name: 'n8n + Apify', sub: 'Google Maps scrape · email extraction' },
          { name: 'Gmail / MailHog', sub: 'send · reply and bounce tracking' },
        ] },
        { label: 'Data', nodes: [{ name: 'MySQL', sub: 'leads · clients · campaigns · sent log' }] },
      ],
      note: 'Demo mode swaps the scraper and the mailer for local stand-ins',
    },
    decisions: [
      {
        title: 'A local tool with no login, stated clearly',
        reasoning: 'It holds mail credentials, so exposing it would be dangerous. It binds every port to localhost, allows only its own origins and encrypts stored passwords, and the README says it should not be put on a shared network.',
        tradeoffs: 'No multi-user support; authentication is the first thing to add if that changes.',
      },
      {
        title: 'Demo mode as a product feature',
        reasoning: 'Anyone can see the real flow end to end without Apify or Gmail accounts.',
        tradeoffs: 'The stand-ins must mimic the real webhook faithfully.',
      },
    ],
    deployment: {
      isDeployed: false,
      details: [],
      considerations: [
        'Run locally with docker compose; demo mode adds a mock scraper and a fake inbox (MailHog)',
        'It is not hosted publicly on purpose: it handles real email credentials and sends email',
        'CI builds and tests the backend and front end',
      ],
    },
    challenges: [
      {
        challenge: 'A search request blocked for the whole scrape.',
        solution: 'The async method was called on this, which skips the proxy and runs synchronously. Moving it behind the proxy made the endpoint answer in 70 ms.',
        outcome: 'Searches run in the background with live progress.',
      },
      {
        challenge: 'Scraped leads never got a category, so campaigns had nobody to email.',
        solution: 'The category choice was computed in the UI and dropped; I wired it through both search forms and the backend.',
        outcome: 'Searches now produce leads a client can actually email.',
      },
    ],
    impact: {
      improvements: [
        'From a tool that only worked with private accounts to one anyone can try offline',
        'Demo screenshots use generated businesses on reserved example domains, so no real person appears',
      ],
      learnings: [
        'Self-invocation silently disables Spring’s proxy features',
        'Be honest about what a tool is for: a clear local-only boundary beats a half-built login',
      ],
    },
    showcase: {
      repo: 'https://github.com/Majdabbassi/ReachFlow',
      note: 'Run it locally in demo mode (one docker compose command from the README): no accounts needed, emails land in a fake inbox.',
      screens: shots([
        'Campaign: 103 of 103 delivered',
        'Lead database',
        'Email audit',
        'Lead search',
        'Ausbildung finder',
      ]),
    },
  },
  fr: {
    id: 'n8n',
    title: 'ReachFlow — Découverte de prospects et automatisation de la prospection',
    summary:
      'Un outil local qui trouve des entreprises sur Google Maps via un workflow n8n et Apify, extrait leurs e-mails et lance des campagnes Gmail personnalisées avec pièces jointes, suivi des réponses et des rebonds. Né pour trouver des places d’apprentissage (Ausbildung) en Allemagne.',
    status: 'completed',
    role: 'Ingénieur Full Stack',
    roleContext: 'Automatisation, backend et front Angular',
    techStack: ['n8n', 'Apify', 'Spring Boot', 'Angular', 'MySQL', 'Gmail SMTP/IMAP', 'MailHog', 'Docker Compose'],
    metrics: {
      team: 'En solo',
      duration: 'Construit, audité et documenté en 2026',
      scale: 'Mode démo : fonctionne entièrement hors ligne en une commande',
      keyOutcomes: [
        'Un scrape qui ne bloque plus la requête : l’endpoint répond en 70 ms au lieu de plusieurs minutes',
        'Des campagnes arrêtables et reprenables sans écrire deux fois à la même personne',
        'Mots de passe de messagerie chiffrés en AES-256-GCM ; tous les ports liés à localhost',
      ],
    },
    context: {
      problem:
        'Trouver des entreprises qui prennent des apprentis, récupérer leurs e-mails et leur écrire une par une est un travail manuel lent. Il faut découverte, dédoublonnage, catégorisation et un envoi soigneux qui ne se répète pas.',
      constraints: [
        'Il manipule de vrais identifiants de messagerie : il doit être explicite sur son caractère local et protéger ce qu’il stocke',
        'Le scrape et l’envoi dépendent de comptes tiers que n’a pas un relecteur',
        'Un relecteur doit pouvoir voir tout le produit fonctionner en quelques minutes',
      ],
      goals: [
        'De la découverte à la campagne dans un seul produit : recherche, prospects, catégories, clients, campagnes, audit',
        'Un mode démo qui remplace le scraper et l’envoi par des substituts locaux',
        'Aucun double envoi, même après un arrêt et une relance',
      ],
    },
    architecture: {
      diagramPlaceholder: 'Architecture ReachFlow',
      bullets: [
        'Le backend Spring Boot appelle un webhook n8n qui exécute le scrape Apify de Google Maps et renvoie les entreprises avec leurs e-mails.',
        'Les prospects sont dédoublonnés, liés à des catégories et rattachés à des clients ; un client n’écrit qu’aux prospects de ses catégories.',
        'Les campagnes partent par Gmail SMTP avec pièces jointes, suivent réponses et rebonds en IMAP et exposent une progression en direct.',
        'En mode démo, un faux scraper répond au même webhook et MailHog capte chaque e-mail : rien de réel n’est contacté.',
      ],
      highlights: [
        { title: 'Sans risque à essayer', description: 'Le mode démo n’exige aucun compte et n’envoie rien de réel.' },
        { title: 'Envoi reprenable', description: 'Relancer une campagne arrêtée saute les personnes déjà contactées.' },
      ],
      tiers: [
        { label: 'Web', nodes: [{ name: 'Application Angular', sub: 'recherche · prospects · campagnes · audit e-mail' }] },
        { label: 'API', nodes: [{ name: 'Spring Boot', sub: 'prospects · catégories · campagnes · envoi' }] },
        { label: 'Automatisation', nodes: [
          { name: 'n8n + Apify', sub: 'scrape Google Maps · extraction d’e-mails' },
          { name: 'Gmail / MailHog', sub: 'envoi · suivi réponses et rebonds' },
        ] },
        { label: 'Données', nodes: [{ name: 'MySQL', sub: 'prospects · clients · campagnes · journal d’envoi' }] },
      ],
      note: 'Le mode démo remplace le scraper et l’envoi par des substituts locaux',
    },
    decisions: [
      {
        title: 'Un outil local sans connexion, dit clairement',
        reasoning: 'Il détient des identifiants de messagerie : l’exposer serait dangereux. Il lie chaque port à localhost, n’autorise que ses propres origines, chiffre les mots de passe stockés, et le README dit de ne pas le mettre sur un réseau partagé.',
        tradeoffs: 'Pas de multi-utilisateur ; l’authentification serait le premier ajout si cela change.',
      },
      {
        title: 'Le mode démo comme fonctionnalité du produit',
        reasoning: 'Chacun peut voir le vrai parcours de bout en bout sans compte Apify ni Gmail.',
        tradeoffs: 'Les substituts doivent imiter fidèlement le vrai webhook.',
      },
    ],
    deployment: {
      isDeployed: false,
      details: [],
      considerations: [
        'Se lance en local avec docker compose ; le mode démo ajoute un faux scraper et une fausse boîte de réception (MailHog)',
        'Il n’est volontairement pas hébergé publiquement : il manipule de vrais identifiants et envoie des e-mails',
        'La CI compile et teste le backend et le front',
      ],
    },
    challenges: [
      {
        challenge: 'Une requête de recherche bloquée pendant tout le scrape.',
        solution: 'La méthode asynchrone était appelée sur this, ce qui contourne le proxy et s’exécute en synchrone. La placer derrière le proxy a ramené la réponse à 70 ms.',
        outcome: 'Les recherches tournent en arrière-plan avec une progression en direct.',
      },
      {
        challenge: 'Les prospects trouvés n’avaient jamais de catégorie, donc les campagnes n’avaient personne à qui écrire.',
        solution: 'Le choix de catégorie était calculé dans l’interface puis abandonné ; je l’ai relié aux deux formulaires de recherche et au backend.',
        outcome: 'Les recherches produisent désormais des prospects à qui un client peut vraiment écrire.',
      },
    ],
    impact: {
      improvements: [
        'D’un outil qui ne marchait qu’avec des comptes privés à un outil que chacun essaie hors ligne',
        'Les captures utilisent des entreprises générées sur des domaines d’exemple réservés : aucune vraie personne n’apparaît',
      ],
      learnings: [
        'L’auto-invocation désactive en silence les fonctions de proxy de Spring',
        'Soyez honnête sur l’usage d’un outil : une frontière locale claire vaut mieux qu’une connexion à moitié faite',
      ],
    },
    showcase: {
      repo: 'https://github.com/Majdabbassi/ReachFlow',
      note: 'Lancez-le en local en mode démo (une commande docker compose du README) : aucun compte requis, les e-mails arrivent dans une fausse boîte.',
      screens: shots([
        'Campagne : 103 envois sur 103',
        'Base de prospects',
        'Audit des e-mails',
        'Recherche de prospects',
        'Ausbildung finder',
      ]),
    },
  },
};
