// ============================================================
//  YOUR PROJECTS — cards, colours, order and mascot lines.
//  The full case-study texts (problem, decisions, challenges,
//  screenshots, demo logins…) live in data/details/<project>.ts
//  — they come straight from your previous portfolio, in EN + FR.
// ============================================================
import { L } from '../i18n/i18n';
import { ProjectDetail } from './project-detail';
import { FRIENDMAP } from './details/friendmap';
import { ALBUMY } from './details/albumy';
import { MALLOS } from './details/mallos';
import { DELIVERY_TRACKING } from './details/delivery-tracking';
import { DATA_ANALYTICS } from './details/data-analytics';
import { BOOKPRO } from './details/bookpro';
import { CAR_RENTAL } from './details/car-rental';
import { SPORTCLUB } from './details/sportclub';
import { N8N } from './details/n8n';
import { CAFERESTO } from './details/caferesto';
import { MASSARAT } from './details/document-marketplace';
import { MEDIPLUS } from './details/mediplus';

export interface ProjectTheme {
  accent: string;  // main colour (buttons, numbers, toy)
  soft: string;    // lighter text on dark (chips)
  ink: string;     // text colour ON the accent (button labels)
  line: string;    // borders
  panel: string;   // background of the toy panel
}

export interface Project {
  slug: string;             // URL: /projects/<slug> — also picks the toy component
  name: string;
  icon: string;
  eyebrow: L;
  cardLine: L;              // one line on the home card
  cardStack: string;        // short stack on the home card
  detail: L<ProjectDetail>; // the full case study
  theme: ProjectTheme;
  toy: boolean;             // has an interactive toy (see toys/toy-host.ts)
  mascot: L[];              // what mini-Majd says on this page
}

export const PROJECTS: Project[] = [
  {
    slug: 'friendmap', name: 'FriendMap', icon: '/assets/icon-friendmap.svg', toy: true,
    eyebrow: { en: 'Real-time · Privacy', fr: 'Temps réel · Confidentialité' },
    cardLine: { en: 'Live location sharing with four privacy modes and instant revocation.', fr: 'Partage de position en direct avec quatre modes de confidentialité et révocation immédiate.' },
    cardStack: 'NestJS · Vue 3 · Redis · Socket.IO',
    detail: FRIENDMAP,
    theme: { accent: '#2BB673', soft: '#9FDDBB', ink: '#0E1F16', line: '#2F4A3A', panel: '#1A1F1B' },
    mascot: [
      { en: 'Try Ghost mode. Watch everyone lose you.', fr: 'Essayez le mode Fantôme. Tout le monde vous perd.' },
      { en: 'Four privacy modes. The server enforces every one.', fr: 'Quatre modes de confidentialité. Le serveur les applique tous.' },
    ],
  },
  {
    slug: 'albumy', name: 'Albumy', icon: '/assets/icon-albumy.png', toy: true,
    eyebrow: { en: 'Events · Live gallery', fr: 'Événements · Galerie en direct' },
    cardLine: { en: 'Scan one QR code, drop your photos, watch the album fill live.', fr: 'Un QR code, vos photos, et l’album se remplit en direct.' },
    cardStack: 'Spring Boot · Angular · Redis · WebSocket',
    detail: ALBUMY,
    theme: { accent: '#E8618C', soft: '#F4B8CB', ink: '#2A0F19', line: '#4A2A38', panel: '#1F171A' },
    mascot: [
      { en: 'Drop a photo from Karim’s phone. He won’t mind.', fr: 'Envoyez une photo depuis le téléphone de Karim. Il ne dira rien.' },
      { en: 'No guest accounts. Just a QR code.', fr: 'Aucun compte invité. Juste un QR code.' },
    ],
  },
  {
    slug: 'mall-os', name: 'Mall OS', icon: '/assets/icon-mallos.png', toy: true,
    eyebrow: { en: 'B2B SaaS · Multi-tenant', fr: 'SaaS B2B · Multi-tenant' },
    cardLine: { en: 'Trace shop units on a floor plan, colour them by lease status.', fr: 'Tracez les boutiques sur un plan, colorez-les selon leur bail.' },
    cardStack: 'Spring Boot · Angular 18 · PrimeNG',
    detail: MALLOS,
    theme: { accent: '#4F8DF5', soft: '#B7CEF9', ink: '#0B1730', line: '#2A3A55', panel: '#171C26' },
    mascot: [
      { en: 'Click a unit. Any unit.', fr: 'Cliquez sur une boutique. N’importe laquelle.' },
      { en: 'The demo logins are just below the screenshots.', fr: 'Les accès démo sont juste sous les captures.' },
    ],
  },
  {
    slug: 'swiftdeliver', name: 'SwiftDeliver', icon: '/assets/icon-swiftdeliver.png', toy: true,
    eyebrow: { en: 'Marketplace · Live tracking', fr: 'Marketplace · Suivi en direct' },
    cardLine: { en: 'Delivery companies bid, drivers ride, everyone follows the order live.', fr: 'Les livreurs enchérissent, roulent, et tout le monde suit la commande en direct.' },
    cardStack: 'Spring Boot 4 · Angular 20 · STOMP · Grafana',
    detail: DELIVERY_TRACKING,
    theme: { accent: '#FF7A2F', soft: '#FFC3A1', ink: '#2A1206', line: '#55331E', panel: '#1F1915' },
    mascot: [
      { en: 'Press “Next” until it’s delivered. Very satisfying.', fr: 'Appuyez sur « Suivant » jusqu’à la livraison. Très satisfaisant.' },
      { en: 'Five roles, one database, zero leaks.', fr: 'Cinq rôles, une base, zéro fuite.' },
    ],
  },
  {
    slug: 'insighthub', name: 'InsightHub', icon: '/assets/icon-insighthub.png', toy: true,
    eyebrow: { en: 'Data · AI', fr: 'Data · IA' },
    cardLine: { en: 'Upload a CSV — it works out what each column actually means.', fr: 'Importez un CSV — il comprend ce que chaque colonne veut dire.' },
    cardStack: 'Spring Boot · Angular · FastAPI · Pandas',
    detail: DATA_ANALYTICS,
    theme: { accent: '#8B6CF6', soft: '#D3C7FB', ink: '#120E1F', line: '#3A3060', panel: '#1A1726' },
    mascot: [
      { en: 'Hit “Analyse”. Spot the suspicious price.', fr: 'Cliquez sur « Analyser ». Repérez le prix suspect.' },
      { en: 'The AI only gets read-only SQL. In a sandbox.', fr: 'L’IA n’a droit qu’au SQL en lecture seule. En bac à sable.' },
    ],
  },
  {
    slug: 'bookpro', name: 'BookPro', icon: '/assets/icon-bookpro.png', toy: true,
    eyebrow: { en: 'Booking · In production', fr: 'Réservation · En production' },
    cardLine: { en: 'Live booking for hairdressers and co. — plus a POS and a wholesale market.', fr: 'Réservation en direct pour coiffeurs & co. — avec caisse et marché grossiste.' },
    cardStack: 'Spring Boot · Angular · Android · Docker',
    detail: BOOKPRO,
    theme: { accent: '#19B5A8', soft: '#A6E6DF', ink: '#06201D', line: '#1E4A42', panel: '#141F1D' },
    mascot: [
      { en: 'This one is live, with real users.', fr: 'Celui-ci est en ligne, avec de vrais utilisateurs.' },
      { en: 'Add the assistant’s chair. Capacity doubles.', fr: 'Ajoutez la chaise de l’assistant. La capacité double.' },
    ],
  },
  {
    slug: 'car-rental', name: 'Car Rental Manager', icon: '/assets/icon-autorent.png', toy: true,
    eyebrow: { en: 'Back office · Concurrency', fr: 'Back-office · Concurrence' },
    cardLine: { en: 'Fleet, contracts on a calendar, and bookings that can never overlap.', fr: 'Flotte, contrats au calendrier, et des réservations qui ne se chevauchent jamais.' },
    cardStack: 'Spring Boot 3 · Angular 18 · JWT',
    detail: CAR_RENTAL,
    theme: { accent: '#F2C94C', soft: '#F7DD8A', ink: '#241C05', line: '#554A1E', panel: '#1E1B12' },
    mascot: [
      { en: 'Try booking the Polo. I dare you.', fr: 'Essayez de réserver la Polo. Je vous défie.' },
      { en: '8 requests at once, exactly one winner.', fr: '8 requêtes en même temps, un seul gagnant.' },
    ],
  },
  {
    slug: 'sportclub', name: 'SportClub', icon: '/assets/icon-chellysport.png', toy: true,
    eyebrow: { en: 'Web + mobile · One API', fr: 'Web + mobile · Une API' },
    cardLine: { en: "Teams, attendance, payments and a parents' app — one API, two clients.", fr: 'Équipes, présences, paiements et une app parents — une API, deux clients.' },
    cardStack: 'Spring Boot · Angular · React Native',
    detail: SPORTCLUB,
    theme: { accent: '#EF5350', soft: '#F6B9B8', ink: '#2A0A0A', line: '#552424', panel: '#1F1717' },
    mascot: [
      { en: 'Mark someone absent, then save. Watch the phone.', fr: 'Marquez un absent, enregistrez. Regardez le téléphone.' },
      { en: 'The parents’ app is React Native.', fr: 'L’app des parents est en React Native.' },
    ],
  },
  {
    slug: 'reachflow', name: 'ReachFlow', icon: '/assets/icon-n8n.png', toy: true,
    eyebrow: { en: 'Automation · n8n', fr: 'Automatisation · n8n' },
    cardLine: { en: 'Find prospects, run campaigns, never email anyone twice.', fr: 'Trouver des prospects, lancer des campagnes, sans jamais écrire deux fois.' },
    cardStack: 'Spring Boot · Angular · n8n',
    detail: N8N,
    theme: { accent: '#38BDF8', soft: '#A5DDF7', ink: '#04202E', line: '#1E4255', panel: '#151C21' },
    mascot: [
      { en: 'Launch, then hit Stop halfway. Then launch again.', fr: 'Lancez, puis Stop à mi-chemin. Puis relancez.' },
      { en: 'Built to help a friend find an Ausbildung.', fr: 'Construit pour aider un ami à trouver une Ausbildung.' },
    ],
  },
];

/** Real products shown in the smaller "More projects" row (no toy). */
export const MORE_PROJECTS: Project[] = [
  {
    slug: 'caferesto', name: 'CafeResto', icon: '/assets/icon-caferesto.png', toy: false,
    eyebrow: { en: 'Multi-tenant · Real-time', fr: 'Multi-tenant · Temps réel' },
    cardLine: {
      en: 'Multi-tenant restaurant platform engineered for real-time operations, automated stock logic, and production-grade infrastructure.',
      fr: 'Plateforme restaurant multi-tenant conçue pour les opérations en temps réel, la gestion automatisée du stock et une infrastructure de production.',
    },
    cardStack: 'Spring Boot · React · PostgreSQL · Grafana',
    detail: CAFERESTO,
    theme: { accent: '#C9A27E', soft: '#E6D2BE', ink: '#1E150C', line: '#4A3B2C', panel: '#1F1A15' },
    mascot: [{ en: 'My favourite. 13 Docker services, all monitored.', fr: 'Mon préféré. 13 services Docker, tous supervisés.' }],
  },
  {
    slug: 'massarat', name: 'Massarat+', icon: '/assets/icon-docmarket.png', toy: false,
    eyebrow: { en: 'Marketplace · In production', fr: 'Marketplace · En production' },
    cardLine: {
      en: 'Educational content marketplace with AES-128 file encryption, transactional wallet, real-time messaging, and multi-gateway payments.',
      fr: 'Marketplace de contenu éducatif avec chiffrement AES-128, wallet transactionnel, messagerie temps réel et paiements multi-passerelles.',
    },
    cardStack: 'Spring Boot · Angular · Expo · AES-128',
    detail: MASSARAT,
    theme: { accent: '#5B93F2', soft: '#BBD1F9', ink: '#0B1730', line: '#2A3A55', panel: '#171C26' },
    mascot: [{ en: 'Live at massarat-plus.com.', fr: 'En ligne sur massarat-plus.com.' }],
  },
  {
    slug: 'mediplus', name: 'MediPlus', icon: '/assets/icon-mediplus.png', toy: false,
    eyebrow: { en: 'Health · Web + mobile', fr: 'Santé · Web + mobile' },
    cardLine: {
      en: 'Medication-reminder platform (Dhakerni): role-based backoffice, reminder engine and adherence tracking, plus mobile apps for patients, doctors and helpers.',
      fr: 'Plateforme de rappels de médicaments (Dhakerni) : backoffice par rôles, moteur de rappels et suivi d’adhérence, plus des apps mobiles patients, médecins et tuteurs.',
    },
    cardStack: 'Spring Boot · Angular · Expo · Quartz',
    detail: MEDIPLUS,
    theme: { accent: '#22B8CF', soft: '#A8E3EC', ink: '#04202A', line: '#1E4650', panel: '#141E21' },
    mascot: [{ en: 'Reminders by push, SMS, email — and voice.', fr: 'Rappels par push, SMS, e-mail — et message vocal.' }],
  },
];

export const ALL_PROJECTS = [...PROJECTS, ...MORE_PROJECTS];
export const findProject = (slug: string | null) => ALL_PROJECTS.find((p) => p.slug === slug);
