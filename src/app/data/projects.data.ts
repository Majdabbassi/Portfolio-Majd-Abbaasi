// ============================================================
//  YOUR PROJECTS — every text on the cards and project pages.
//  The order of this list = the order on the shelf and the
//  "Next on the shelf" chain. Replace every [BRACKET] text.
// ============================================================

export interface ProjectTheme {
  accent: string;      // main colour (buttons, numbers, toy)
  soft: string;        // lighter text on dark (chips)
  ink: string;         // text colour ON the accent (button labels)
  line: string;        // borders
  panel: string;       // background of the toy panel
}

export interface Project {
  slug: string;        // URL: /projects/<slug> — also picks the toy component
  name: string;
  eyebrow: string;
  cardLine: string;    // one line on the home card
  cardStack: string;   // short stack on the home card
  intro: string;       // big paragraph under the title
  stack: string[];
  demoUrl?: string;
  demoLabel?: string;
  githubUrl: string;
  problem: { title: string; text: string };
  steps: { title: string; text: string }[];
  hard: { title: string; text: string };
  theme: ProjectTheme;
}

export const PROJECTS: Project[] = [
  {
    slug: 'friendmap',
    name: 'FriendMap',
    eyebrow: 'Real-time · Privacy',
    cardLine: 'Live location sharing with four privacy modes and instant revocation.',
    cardStack: 'NestJS · Vue 3 · Redis · Socket.IO',
    intro: 'Live location sharing between friends — where you decide, at every moment, exactly who can see you. And when you change your mind, it takes effect instantly.',
    stack: ['NestJS', 'Prisma · PostgreSQL', 'Redis', 'Socket.IO', 'Vue 3 · Leaflet', 'Kubernetes'],
    githubUrl: 'https://github.com/Majdabbassi',
    problem: {
      title: 'Sharing your location is easy. Un-sharing it, fast, is the hard part.',
      text: "[2–3 SENTENCES IN YOUR WORDS: WHY YOU BUILT IT, WHO IT'S FOR, WHAT MOST LOCATION APPS GET WRONG ABOUT PRIVACY.]",
    },
    steps: [
      { title: 'Share live', text: 'Positions stream over WebSockets, with online presence and direct messages alongside.' },
      { title: 'Choose who sees you', text: 'Ghost, Everyone, Selected or Except-selected — and a change revokes access straight away.' },
      { title: 'Meet up', text: 'Plan a trip, pick a meet-in-the-middle or fixed spot, and see who has arrived — live.' },
    ],
    hard: {
      title: 'Revoking access before the next position goes out.',
      text: '[WHAT BROKE, WHAT YOU TRIED, WHAT YOU SHIPPED — ONE SMALL DIAGRAM OR CODE SNIPPET HERE.]',
    },
    theme: { accent: '#2BB673', soft: '#9FDDBB', ink: '#0E1F16', line: '#2F4A3A', panel: '#1A1F1B' },
  },
  {
    slug: 'albumy',
    name: 'Albumy',
    eyebrow: 'Events · Live gallery',
    cardLine: 'Scan one QR code, drop your photos, watch the album fill live.',
    cardStack: 'Spring Boot · Angular · Redis · WebSocket',
    intro: 'One QR code per event. Every guest drops their photos and videos into one shared album — no sign-up — and everyone watches it fill up live.',
    stack: ['Spring Boot', 'Angular', 'Redis', 'WebSocket', 'Capacitor · Android', 'Docker'],
    demoUrl: 'https://majdabbassi.github.io/Albumy/',
    githubUrl: 'https://github.com/Majdabbassi/Albumy',
    problem: {
      title: 'After every wedding, the photos end up on fifty phones and nowhere else.',
      text: 'Weddings, parties and conferences produce hundreds of photos scattered across group chats — low-res, half lost, and everyone asks the organizer for "all the photos". There was no quick way for a crowd to pool everything into one high-quality album.',
    },
    steps: [
      { title: 'Scan and pick a name', text: 'Guests scan the QR code or open the link and choose a pseudo. No account, nothing else to fill in.' },
      { title: 'Drop photos and videos', text: 'Large files go up in chunks, retry on bad networks, survive a refresh and pause when offline.' },
      { title: 'Everyone sees it live', text: 'A background worker makes the image sizes and video versions; the gallery updates over WebSockets. The organizer can download it all as a ZIP.' },
    ],
    hard: {
      title: 'Uploads that survive wedding-hall Wi-Fi.',
      text: 'Files are split into 5 MB chunks, and on resume the server says which chunks it already has — only the missing ones are sent again. [ADD YOUR STORY: WHAT WENT WRONG FIRST, AND A SMALL DIAGRAM OF THE CHUNK FLOW.]',
    },
    theme: { accent: '#E8618C', soft: '#F4B8CB', ink: '#2A0F19', line: '#4A2A38', panel: '#1F171A' },
  },
  {
    slug: 'mall-os',
    name: 'Mall OS',
    eyebrow: 'B2B SaaS · Multi-tenant',
    cardLine: 'Trace shop units on a floor plan, colour them by lease status.',
    cardStack: 'Spring Boot · Angular 18 · PrimeNG',
    intro: 'Run a shopping mall from its floor plan. Trace every shop unit, link it to a store and its lease, bill the rent, and see at a glance which units are empty or about to be.',
    stack: ['Spring Boot 3 · Java 21', 'MySQL', 'JWT', 'Angular 18 · PrimeNG', 'Docker'],
    demoUrl: 'https://mall-os-self.vercel.app',
    githubUrl: 'https://github.com/Majdabbassi',
    problem: {
      title: 'A mall is a map of contracts. Most tools only give you a spreadsheet.',
      text: '[2–3 SENTENCES IN YOUR WORDS: WHO MANAGES A MALL, HOW THEY TRACK UNITS, LEASES AND RENT TODAY, AND WHY THAT BREAKS.]',
    },
    steps: [
      { title: 'Trace the floor plan', text: 'Upload a floor image, draw polygons for units, corridors and common areas, and link each unit to a store.' },
      { title: 'Bill the rent', text: 'One invoice per store per month, generated every morning, pro-rated for leases that start or end mid-month, with late fees and a "who owes what" list.' },
      { title: 'Know who did what', text: 'Each mall is isolated, assistants get fine-grained permissions, and every change lands in an audit trail.' },
    ],
    hard: {
      title: 'Billing that can run twice and never charge twice.',
      text: 'Generating invoices again never duplicates them, an invoice keeps the tenant name it was issued with, and the audit entry is written in the same transaction as the change — a failed operation leaves no trace. [ADD YOUR STORY + A SMALL SNIPPET OR DIAGRAM.]',
    },
    theme: { accent: '#4F8DF5', soft: '#B7CEF9', ink: '#0B1730', line: '#2A3A55', panel: '#171C26' },
  },
  {
    slug: 'swiftdeliver',
    name: 'SwiftDeliver',
    eyebrow: 'Marketplace · Live tracking',
    cardLine: 'Delivery companies bid, drivers ride, everyone follows the order live.',
    cardStack: 'Spring Boot 4 · Angular 20 · STOMP · Grafana',
    intro: 'A delivery marketplace with five kinds of user. Vendors sell, delivery companies bid for the jobs, drivers ride — and everyone follows the order live, each seeing only their own slice of the data.',
    stack: ['Spring Boot 4 · Java 21', 'MySQL', 'STOMP · WebSocket', 'Angular 20', 'Prometheus · Grafana', 'Docker'],
    demoUrl: 'https://majdabbassi.github.io/delivery-platform/',
    githubUrl: 'https://github.com/Majdabbassi',
    problem: {
      title: 'One order, five people, and each one should only see their part.',
      text: '[2–3 SENTENCES IN YOUR WORDS: HOW SMALL SHOPS AND DELIVERY COMPANIES WORK TOGETHER TODAY, AND WHAT A SHARED PLATFORM CHANGES.]',
    },
    steps: [
      { title: 'Order and bid', text: 'Open orders go to a pool. Delivery companies and drivers bid, and the vendor accepts one.' },
      { title: 'Ride and track', text: "The order moves from pending to delivered while the driver's positions stream live to everyone involved." },
      { title: 'Watch it run', text: 'Prometheus metrics, a ready-made Grafana dashboard and health checks show how the API is doing.' },
    ],
    hard: {
      title: 'Five roles on one database, with no leaks between them.',
      text: 'Super Admin, Vendor Owner, Delivery Owner, Driver and Customer each get their own menus and permissions, and each sees only their own data. [ADD YOUR STORY: HOW YOU ENFORCED IT IN THE API + A SMALL DIAGRAM.]',
    },
    theme: { accent: '#FF7A2F', soft: '#FFC3A1', ink: '#2A1206', line: '#55331E', panel: '#1F1915' },
  },
  {
    slug: 'insighthub',
    name: 'InsightHub',
    eyebrow: 'Data · AI',
    cardLine: 'Upload a CSV — it works out what each column actually means.',
    cardStack: 'Spring Boot · Angular · FastAPI · Pandas',
    intro: "Upload a CSV and it works out what's really in it: what each column means, where the outliers are, how clean the data is — then you ask an AI assistant about it in plain English.",
    stack: ['Spring Boot 4', 'Angular 21', 'FastAPI · Python', 'Pandas', 'Docker'],
    githubUrl: 'https://github.com/Majdabbassi',
    problem: {
      title: 'Most analytics demos stop at column types and a bar chart.',
      text: 'An "int" column can be a price, an ID or a year — and treating them the same gives wrong charts and broken cleaning. InsightHub tries to reason about what the data means before it touches it. [ADD ONE LINE ON WHY YOU BUILT IT.]',
    },
    steps: [
      { title: 'Understand', text: 'Every column is classified by role, outliers and correlations are found, and the dataset gets a quality score.' },
      { title: 'Clean, safely', text: "Fixes depend on the data's shape — median or mean, cap or flag — and every run makes a new version. The original is never touched." },
      { title: 'See and ask', text: 'Dashboards pick their own charts from the column roles, and an AI assistant answers questions about the data.' },
    ],
    hard: {
      title: 'Teaching it the difference between a price and an ID.',
      text: 'Roles come from the content, not pandas dtypes: a column only counts as a date or number if 95% of its values parse. [ADD YOUR STORY: A COLUMN THAT FOOLED IT, AND HOW YOU FIXED IT.]',
    },
    theme: { accent: '#8B6CF6', soft: '#D3C7FB', ink: '#120E1F', line: '#3A3060', panel: '#1A1726' },
  },
  {
    slug: 'bookpro',
    name: 'BookPro',
    eyebrow: 'Booking · In production',
    cardLine: 'Live booking for hairdressers and co. — plus a POS and a wholesale market.',
    cardStack: 'Spring Boot · Angular · Android · Docker',
    intro: 'Started as a salon-booking app, grew into a marketplace: clients book hairdressers and other pros on a live calendar, pros run their day from a POS, and wholesalers sell to them — on the web and on Android.',
    stack: ['Spring Boot', 'Angular', 'STOMP · WebSocket', 'Android', 'Docker · VPS'],
    demoUrl: 'https://bookpro.educanet.pro',
    demoLabel: 'Live app',
    githubUrl: 'https://github.com/Majdabbassi',
    problem: {
      title: 'Salons still run on phone calls and a paper notebook.',
      text: '[2–3 SENTENCES IN YOUR WORDS: HOW THE SALONS YOU KNOW BOOK CLIENTS TODAY, AND WHY YOU DECIDED TO BUILD THIS.]',
    },
    steps: [
      { title: 'Clients book', text: 'Search pros by profession and city, book on live availability, join a waitlist, rate the visit.' },
      { title: 'Pros run the day', text: 'Services and schedules, walk-ins in the POS, a cash register, stats, and assistants who add a chair and share the revenue.' },
      { title: 'Wholesalers sell', text: 'Suppliers run their own store inside the platform, with sponsored slots, a sales ledger and reports.' },
    ],
    hard: {
      title: 'Five roles, one app, and every screen in sync.',
      text: 'Client, professional, assistant, wholesaler and admin share one Angular app and one Spring Boot API, kept consistent in real time over STOMP — and it runs in production on a VPS. [ADD YOUR STORY + A SMALL ARCHITECTURE DIAGRAM.]',
    },
    theme: { accent: '#19B5A8', soft: '#A6E6DF', ink: '#06201D', line: '#1E4A42', panel: '#141F1D' },
  },
  {
    slug: 'car-rental',
    name: 'Car Rental Manager',
    eyebrow: 'Back office · Concurrency',
    cardLine: 'Fleet, contracts on a calendar, and per-employee access the API enforces.',
    cardStack: 'Spring Boot 3 · Angular 18 · JWT',
    intro: 'The back office of a car-rental agency: fleet, clients, contracts on a calendar, seasonal pricing, printable PDFs — and per-employee access rights the API enforces, not just the menu.',
    stack: ['Spring Boot 3 · Java 21', 'MySQL', 'JWT', 'Angular 18 · Material', 'Docker'],
    demoUrl: 'https://carrental-platform.vercel.app',
    githubUrl: 'https://github.com/Majdabbassi',
    problem: {
      title: 'Two employees, one car, the same weekend.',
      text: '[2–3 SENTENCES IN YOUR WORDS: HOW SMALL RENTAL AGENCIES MANAGE THEIR FLEET TODAY, AND WHAT GOES WRONG.]',
    },
    steps: [
      { title: 'Quote it', text: 'Pick a client and dates; only free cars are offered, and the price is explained line by line — seasons and long-stay discounts included.' },
      { title: 'Sign it', text: 'One click prints the rental agreement or the invoice as a PDF, and the rental lands on the month calendar.' },
      { title: 'Get reminded', text: 'Every morning: insurance and registration about to expire, services due, cars late or due back today.' },
    ],
    hard: {
      title: '8 simultaneous requests, one car, exactly one winner.',
      text: "The car's row is locked while the overlap check and the save happen, and a test fires 8 bookings at once to prove only one gets through. A car returned on the 10th can still go out again on the 10th. [ADD YOUR STORY + THE LOCKING SNIPPET.]",
    },
    theme: { accent: '#F2C94C', soft: '#F7DD8A', ink: '#241C05', line: '#554A1E', panel: '#1E1B12' },
  },
  {
    slug: 'sportclub',
    name: 'SportClub',
    eyebrow: 'Web + mobile · One API',
    cardLine: "Teams, attendance, payments and a parents' app — one API, two clients.",
    cardStack: 'Spring Boot · Angular · React Native',
    intro: 'Everything a sports club runs on: members and parents, coaches and teams, sessions with attendance, payments and a shop. One API, two clients — a web console for coaches and a mobile app for parents.',
    stack: ['Spring Boot 3 · Java 21', 'Angular 16', 'React Native · Expo', 'STOMP · Firebase push', 'Konnect payments'],
    demoUrl: 'https://sportclub-platform-f6ry.vercel.app',
    githubUrl: 'https://github.com/Majdabbassi',
    problem: {
      title: "Coaches coach. Parents just want to know what's happening.",
      text: '[2–3 SENTENCES IN YOUR WORDS: HOW CLUBS TRACK SESSIONS, PAYMENTS AND PARENTS TODAY — WHATSAPP GROUPS, PAPER, CASH — AND WHY THAT HURTS.]',
    },
    steps: [
      { title: 'Admins set up the club', text: 'Members, coaches, activities, teams, sessions, payments, the shop and announcements.' },
      { title: 'Coaches run their teams', text: 'Attendance, performance notes, injuries and messages to parents — only for their own teams.' },
      { title: 'Parents follow on mobile', text: 'Planning, registrations, online or cash payments, performance, the shop and chat — for their own kids.' },
    ],
    hard: {
      title: 'Two clients, one set of rules.',
      text: 'The web console refuses parent accounts, and the API enforces the same rules whichever client calls it — a coach only ever sees their teams, a parent only their children. [ADD YOUR STORY + A SMALL DIAGRAM.]',
    },
    theme: { accent: '#EF5350', soft: '#F6B9B8', ink: '#2A0A0A', line: '#552424', panel: '#1F1717' },
  },
  {
    slug: 'reachflow',
    name: 'ReachFlow',
    eyebrow: 'Automation · n8n',
    cardLine: 'Find prospects, run campaigns, automate the follow-ups with n8n.',
    cardStack: 'Spring Boot · Angular · n8n',
    intro: 'Built to help a friend find an apprenticeship in Germany: it finds local businesses, collects their contacts, and runs the email campaign — with the CV attached, one by one, never twice.',
    stack: ['Spring Boot', 'Angular 20 · Material', 'n8n', 'Docker'],
    demoUrl: 'https://github.com/Majdabbassi/ReachFlow',
    demoLabel: 'Run the demo',
    githubUrl: 'https://github.com/Majdabbassi/ReachFlow',
    problem: {
      title: 'Finding an Ausbildung means emailing hundreds of companies by hand.',
      text: 'A friend needed an apprenticeship in Germany: search businesses on Google Maps, dig out their emails, send a CV to each one, and keep track of who answered. ReachFlow turned that into a few clicks. [ADD HOW IT WENT FOR YOUR FRIEND.]',
    },
    steps: [
      { title: 'Find', text: 'Pick professions and cities; an n8n workflow finds the companies and their contacts, with live progress.' },
      { title: 'Organise', text: 'Leads land in a database, sorted into categories, each with its own attachments.' },
      { title: 'Reach out', text: 'Launch a campaign; emails go out one by one with the PDF attached, counters update as they go, and every send is audited.' },
    ],
    hard: {
      title: 'Stop, resume, and never email anyone twice.',
      text: 'A campaign can be stopped at any moment and launched again — it resumes with the people not yet emailed. And a demo mode swaps the scraper and Gmail for local stand-ins, so anyone can try it in two minutes. [ADD YOUR STORY + A SMALL DIAGRAM.]',
    },
    theme: { accent: '#38BDF8', soft: '#A5DDF7', ink: '#04202E', line: '#1E4255', panel: '#151C21' },
  },
];

export const findProject = (slug: string | null) => PROJECTS.find((p) => p.slug === slug);
