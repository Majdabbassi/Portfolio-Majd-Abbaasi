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

/** The badge on the home card: live demo, in production, runs locally, or my favourite. */
export type ShelfBadge = 'live' | 'prod' | 'local' | 'fav';

export interface Project {
  slug: string;             // URL: /projects/<slug> — also picks the toy component
  name: string;
  icon: string;
  eyebrow: L;
  cardLine: L;              // the text on the home card
  cardStack: string;        // short stack on the home card
  hue: number;              // home colour: every card shares lightness + chroma, only this hue changes
  badge: ShelfBadge;
  phrase: L;                // hero headline: "I build the software behind <phrase>"
  detail: L<ProjectDetail>; // the full case study
  theme: ProjectTheme;
  toy: boolean;             // has an interactive toy on its project page (see toys/toy-host.ts)
  mascot: L[];              // what mini-Majd says on this page
}

export const PROJECTS: Project[] = [
  {
    slug: 'friendmap', name: 'FriendMap', icon: '/assets/icon-friendmap.png', toy: true,
    eyebrow: { en: 'Real-time · Privacy', fr: 'Temps réel · Confidentialité' },
    cardLine: {
      en: 'Live location sharing with four privacy modes. Switch to Ghost and every viewer is dropped — the server decides, not the app.',
      fr: 'Partage de position en direct avec quatre modes de confidentialité. Passez en Fantôme et chaque observateur est coupé — c’est le serveur qui décide, pas l’app.',
    },
    cardStack: 'NestJS · Vue 3 · Redis · Socket.IO',
    hue: 135, badge: 'live',
    phrase: { en: 'a friends’ meetup.', fr: 'une sortie entre amis.' },
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
    cardLine: {
      en: 'Guests scan one QR code and drop photos — no account. A worker processes them and the album fills live for everyone.',
      fr: 'Les invités scannent un QR code et déposent leurs photos — sans compte. Un worker les traite et l’album se remplit en direct pour tous.',
    },
    cardStack: 'Spring Boot · Angular · Redis · WebSocket',
    hue: 345, badge: 'live',
    phrase: { en: 'a wedding album.', fr: 'un album de mariage.' },
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
    cardLine: {
      en: 'Trace shop units on a floor plan, bill rent every month, and see at a glance which leases end soon.',
      fr: 'Tracez les boutiques sur un plan, facturez le loyer chaque mois et voyez d’un coup d’œil les baux qui se terminent bientôt.',
    },
    cardStack: 'Spring Boot 4 · Angular · Konva',
    hue: 255, badge: 'live',
    phrase: { en: 'a shopping mall.', fr: 'un centre commercial.' },
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
    cardLine: {
      en: 'Delivery companies bid or get auto-assigned, drivers report their position, and the customer follows the order live.',
      fr: 'Les sociétés de livraison enchérissent ou sont assignées automatiquement, les livreurs envoient leur position et le client suit la commande en direct.',
    },
    cardStack: 'Spring Boot 4 · Angular 20 · STOMP · Grafana',
    hue: 45, badge: 'live',
    phrase: { en: 'a delivery fleet.', fr: 'une flotte de livreurs.' },
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
    cardLine: {
      en: 'Upload a CSV and it works out what each column means, scores the data quality and lets a local AI answer questions.',
      fr: 'Importez un CSV : il comprend ce que veut dire chaque colonne, note la qualité des données et laisse une IA locale répondre à vos questions.',
    },
    cardStack: 'Spring Boot · Angular · FastAPI · DuckDB',
    hue: 315, badge: 'local',
    phrase: { en: 'a messy CSV.', fr: 'un CSV en vrac.' },
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
    cardLine: {
      en: 'Live booking for hairdressers and co. Every assistant is one more chair — capacity grows, double bookings can’t happen.',
      fr: 'Réservation en direct pour coiffeurs & co. Chaque assistant est une chaise de plus — la capacité grandit, les doubles réservations sont impossibles.',
    },
    cardStack: 'Spring Boot · Angular · Android · Docker',
    hue: 165, badge: 'prod',
    phrase: { en: 'a hair salon.', fr: 'un salon de coiffure.' },
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
    cardLine: {
      en: 'Fleet, contracts on a calendar, payments and reports. Two people booking the same car at once: exactly one wins.',
      fr: 'Flotte, contrats au calendrier, paiements et rapports. Deux personnes réservent la même voiture en même temps : une seule gagne.',
    },
    cardStack: 'Spring Boot 3 · Angular 18 · JWT',
    hue: 100, badge: 'live',
    phrase: { en: 'a car rental.', fr: 'une agence de location.' },
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
    cardLine: {
      en: 'Teams, attendance, payments and a parents’ app. One API for two clients, and every family sees only its own children.',
      fr: 'Équipes, présences, paiements et une app parents. Une API pour deux clients, et chaque famille ne voit que ses propres enfants.',
    },
    cardStack: 'Spring Boot · Angular · React Native',
    hue: 15, badge: 'live',
    phrase: { en: 'a sports club.', fr: 'un club de sport.' },
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
    cardLine: {
      en: 'Built to help a friend find an Ausbildung: find companies, run the campaign, stop and resume — nobody gets two emails.',
      fr: 'Construit pour aider un ami à trouver une Ausbildung : trouver des entreprises, lancer la campagne, l’arrêter et la reprendre — personne ne reçoit deux e-mails.',
    },
    cardStack: 'Spring Boot · Angular · n8n',
    hue: 225, badge: 'local',
    phrase: { en: 'a job hunt.', fr: 'une recherche d’emploi.' },
    detail: N8N,
    theme: { accent: '#38BDF8', soft: '#A5DDF7', ink: '#04202E', line: '#1E4255', panel: '#151C21' },
    mascot: [
      { en: 'Launch, then hit Stop halfway. Then launch again.', fr: 'Lancez, puis Stop à mi-chemin. Puis relancez.' },
      { en: 'Built to help a friend find an Ausbildung.', fr: 'Construit pour aider un ami à trouver une Ausbildung.' },
    ],
  },
];

/** Real products without a toy on their project page (they have a card toy on the home shelf). */
export const MORE_PROJECTS: Project[] = [
  {
    slug: 'caferesto', name: 'CaféResto', icon: '/assets/icon-caferesto.png', toy: false,
    eyebrow: { en: 'Multi-tenant · Real-time', fr: 'Multi-tenant · Temps réel' },
    cardLine: {
      en: 'Scan the table’s QR and order: the ticket lands in the kitchen in real time and the stock follows by itself.',
      fr: 'Scannez le QR de la table et commandez : le ticket arrive en cuisine en temps réel et le stock suit tout seul.',
    },
    cardStack: 'Spring Boot · React · Expo · PostgreSQL',
    hue: 70, badge: 'fav',
    phrase: { en: 'a busy café.', fr: 'un café bondé.' },
    detail: CAFERESTO,
    theme: { accent: '#C9A27E', soft: '#E6D2BE', ink: '#1E150C', line: '#4A3B2C', panel: '#1F1A15' },
    mascot: [{ en: 'My favourite. 13 Docker services, all monitored.', fr: 'Mon préféré. 13 services Docker, tous supervisés.' }],
  },
  {
    slug: 'massarat', name: 'Massarat+', icon: '/assets/icon-docmarket.png', toy: false,
    eyebrow: { en: 'Marketplace · In production', fr: 'Marketplace · En production' },
    cardLine: {
      en: 'Teachers sell study documents to parents. Pay by card, D17 or wallet — the file stays encrypted until you’ve bought it.',
      fr: 'Des enseignants vendent des documents d’étude aux parents. Paiement par carte, D17 ou wallet — le fichier reste chiffré tant qu’il n’est pas acheté.',
    },
    cardStack: 'Spring Boot · Angular · Expo · STOMP',
    hue: 285, badge: 'prod',
    phrase: { en: 'a tutors’ market.', fr: 'un marché de cours.' },
    detail: MASSARAT,
    theme: { accent: '#5B93F2', soft: '#BBD1F9', ink: '#0B1730', line: '#2A3A55', panel: '#171C26' },
    mascot: [{ en: 'Live at massarat-plus.com.', fr: 'En ligne sur massarat-plus.com.' }],
  },
  {
    slug: 'mediplus', name: 'Medi+', icon: '/assets/icon-mediplus.png', toy: false,
    eyebrow: { en: 'Health · Web + mobile', fr: 'Santé · Web + mobile' },
    cardLine: {
      en: 'Medication reminders that ring like an alarm clock — and tell the family when a dose is missed.',
      fr: 'Des rappels de médicaments qui sonnent comme un réveil — et préviennent la famille quand une prise est oubliée.',
    },
    cardStack: 'Spring Boot · Angular · React Native · Quartz',
    hue: 195, badge: 'prod',
    phrase: { en: 'a family’s meds.', fr: 'le pilulier d’une famille.' },
    detail: MEDIPLUS,
    theme: { accent: '#22B8CF', soft: '#A8E3EC', ink: '#04202A', line: '#1E4650', panel: '#141E21' },
    mascot: [{ en: 'A full-screen alarm — and the family hears about a missed dose.', fr: 'Une alarme plein écran — et la famille est prévenue d’une prise oubliée.' }],
  },
];

export const ALL_PROJECTS = [...PROJECTS, ...MORE_PROJECTS];
export const findProject = (slug: string | null) => ALL_PROJECTS.find((p) => p.slug === slug);
