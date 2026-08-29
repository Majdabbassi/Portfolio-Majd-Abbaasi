import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FadeInDirective } from '../../directives/fade-in.directive';
import { I18nService } from '../../core/i18n.service';

type ProjectStatus = 'production' | 'completed' | 'in-development';

interface ProjectDetail {
  id: string;
  title: string;
  summary: string;
  status: ProjectStatus;
  role: string;
  roleContext: string;
  techStack: string[];
  metrics: {
    team: string;
    duration: string;
    scale: string;
    keyOutcomes: string[];
  };
  context: {
    problem: string;
    constraints: string[];
    goals: string[];
  };
  architecture: {
    diagramPlaceholder: string;
    bullets: string[];
    highlights: { title: string; description: string }[];
  };
  decisions: {
    title: string;
    reasoning: string;
    tradeoffs: string;
  }[];
  deployment: {
    isDeployed: boolean;
    liveUrl?: string;
    flow?: string;
    environment?: string;
    details: string[];
    considerations?: string[];
  };
  challenges: {
    challenge: string;
    solution: string;
    outcome: string;
  }[];
  impact: {
    improvements: string[];
    learnings: string[];
  };
}

@Component({
  selector: 'app-albumy',
  standalone: true,
  imports: [FadeInDirective, RouterLink],
  templateUrl: './albumy.html',
  styleUrl: './albumy.css',
})
export class AlbumyComponent implements OnInit {
  readonly i18n = inject(I18nService);
  ngOnInit(): void {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }

  private readonly projectEn: ProjectDetail = {
    id: 'albumy',
    title: 'Albumy — Event Photo-Sharing Platform',
    summary:
      'Full-stack event photo-sharing platform: organizers create events and open galleries where guests upload photos using a unique per-event display name with no account required. Role-based admin and organizer flows, single-use expiring invites, QR event access, a public read-only full-album link, and streamed ZIP downloads complete the pipeline.',
    status: 'completed',
    role: 'Full-Stack Developer',
    roleContext: 'Full-Stack Developer (Auth & Media Pipeline)',
    techStack: ['Spring Boot', 'Angular', 'PostgreSQL', 'JWT', 'QR Code', 'ZIP Streaming'],
    metrics: {
      team: 'Solo Full-Stack Developer',
      duration: 'Full-stack development cycle',
      scale: 'Guests upload without accounts; galleries export as ZIP',
      keyOutcomes: [
        'Role-based ADMIN/ORGANIZER auth with single-use, 7-day expiring invites',
        'No-account guest uploads with per-event unique display names enforced at the DB level',
        'QR event access and a public read-only full-album token',
        'Streamed ZIP export that keeps memory flat for large galleries',
      ],
    },
    context: {
      problem:
        'Organizers of private events needed a way to collect and share photos with guests without forcing everyone to create accounts, while still controlling who can publish, moderate, and export the gallery.',
      constraints: [
        'Guests must upload without registration, identified only by a display name that is unique per event',
        'Gallery management (view, delete, ZIP export) must stay behind organizer/admin roles',
        'Access must be gated — single-use invites, event codes, and a public full-album token',
      ],
      goals: [
        'Ship an end-to-end auth pipeline: admin issues invites, organizers register, JWT secures the API',
        'Enforce per-event display-name uniqueness at the database level, not just in the UI',
        'Provide QR event access and a streamed ZIP export for any gallery size',
      ],
    },
    architecture: {
      diagramPlaceholder: 'Albumy System Architecture',
      bullets: [
        'Angular 20 frontend (standalone components) renders organizer dashboards and the guest upload flow, with QR codes via angularx-qrcode.',
        'Spring Boot backend splits responsibilities across Auth, Event, File, FullAlbum, and Guest controllers and services.',
        'Spring Security enforces JWT (24h) with BCrypt-hashed credentials and role-based guards for ADMIN/ORGANIZER.',
        'PostgreSQL stores events, users, guest display names, and invite tokens; a unique constraint backstops per-event name collisions.',
        'Photos persist to a local disk uploads directory; ZIP exports stream from disk to the response.',
      ],
      highlights: [
        {
          title: 'DB-Enforced Name Uniqueness',
          description: 'Per-event guest display names are constrained in PostgreSQL, so duplicate identities are rejected before any upload is accepted.',
        },
        {
          title: 'No-Account Guest Flow',
          description: 'Guests enter a 6-character event code and pick a unique name to upload — they only ever see their own photos.',
        },
        {
          title: 'Gated Read & Write',
          description: 'Read access via QR/event code or a full-album UUID token; writes stay behind JWT-protected organizer/admin roles.',
        },
      ],
    },
    decisions: [
      {
        title: 'Per-Event Unique Names Without Accounts',
        reasoning: 'Removing registration removes the biggest barrier to guest participation while keeping attribution reliable within the event.',
        tradeoffs: 'Uniqueness must be enforced per event at the database level and validated by the backend before acceptance — the frontend alone cannot be trusted.',
      },
      {
        title: 'Single-Use Expiring Invite Tokens',
        reasoning: 'The ADMIN generates them; one-time redemption plus a 7-day expiry keep organizer signup controlled and auditable.',
        tradeoffs: 'Tokens add an issuance step for admins and must be checked for expiry and reuse on every redemption attempt.',
      },
      {
        title: 'Streamed ZIP Export',
        reasoning: 'Galleries can hold many photos; building one ZIP in memory risks memory exhaustion on large events.',
        tradeoffs: 'Streaming keeps memory flat but requires careful buffer and response handling to surface progress and errors cleanly.',
      },
    ],
    deployment: {
      isDeployed: false,
      details: [],
      considerations: [
        'Containerized PostgreSQL via docker-compose for reproducible database provisioning',
        'JWT-secured REST API with role-based Spring Security authorization',
        'Dedicated uploads directory with disk-based storage and a media backup strategy',
        'Server-side streamed ZIP export to avoid loading large galleries into memory',
      ],
    },
    challenges: [
      {
        challenge: 'Letting guests upload without accounts while keeping every guest identifiable within the event.',
        solution: 'Guests pick a display name that the backend validates for uniqueness inside the event before any upload is accepted, backed by a DB-level constraint.',
        outcome: 'Anyone can contribute with a link and a name, while attribution stays reliable and duplicate identities are prevented.',
      },
      {
        challenge: 'Exporting an entire gallery as a ZIP without exhausting server memory on large events.',
        solution: 'The ZIP is assembled and streamed directly to the response, with the frontend triggering the download as a file.',
        outcome: 'Gallery downloads stay memory-safe regardless of event size.',
      },
      {
        challenge: 'Keeping the public read path (guests and the full-album link) consistent with the protected write path (organizers and admins).',
        solution: 'Separate scoped flows: event-code guest access, a UUID full-album read token, and JWT-protected organizer/admin endpoints.',
        outcome: 'Read-only public sharing and privileged management coexist without overlapping authorization paths.',
      },
    ],
    impact: {
      improvements: [
        'Delivered a complete auth and media pipeline: admin invites, organizer registration, and role-based JWT access',
        'Removed the account barrier for guests with per-event unique display names enforced at the database level',
        'Made large galleries exportable through streamed ZIP downloads with QR-based event access',
      ],
      learnings: [
        'Sensitive registration flows benefit from single-use, expiring tokens issued by a trusted role',
        'User-visible identifiers (display names) need to be constrained at the storage layer, not only in the UI',
        'Streaming is the difference between "works" and "works at scale" for media-heavy exports',
      ],
    },
  };

  private readonly projectFr: ProjectDetail = {
    id: 'albumy',
    title: 'Albumy — Plateforme de Partage de Photos d\'Événements',
    summary:
      'Plateforme full-stack de partage de photos d\'événements : les organisateurs créent des événements et ouvrent des galeries où les invités uploadent des photos avec un nom d\'affichage unique par événement, sans compte requis. Flux administrateur et organisateur basés sur les rôles, invitations à usage unique avec expiration, accès par QR code, lien public en lecture seule vers l\'album complet et exports ZIP streamés complètent le pipeline.',
    status: 'completed',
    role: 'Développeur Full-Stack',
    roleContext: 'Développeur Full-Stack (Auth & Pipeline Média)',
    techStack: ['Spring Boot', 'Angular', 'PostgreSQL', 'JWT', 'QR Code', 'ZIP Streaming'],
    metrics: {
      team: 'Développeur Full-Stack solo',
      duration: 'Cycle de développement full-stack',
      scale: 'Uploads invités sans compte ; galeries exportées en ZIP',
      keyOutcomes: [
        'Auth ADMIN/ORGANIZER basée sur les rôles avec invitations à usage unique valides 7 jours',
        'Uploads invités sans compte avec noms d\'affichage uniques par événement imposés au niveau DB',
        'Accès événement par QR code et token public en lecture seule pour l\'album complet',
        'Export ZIP streamé qui garde la mémoire stable pour les grandes galeries',
      ],
    },
    context: {
      problem:
        'Les organisateurs d\'événements privés avaient besoin de collecter et partager des photos avec les invités sans forcer chacun à créer un compte, tout en contrôlant qui peut publier, modérer et exporter la galerie.',
      constraints: [
        'Les invités contribuent sans inscription, identifiés par un nom d\'affichage unique par événement',
        'La gestion de la galerie (visualisation, suppression, export ZIP) reste réservée aux rôles organisateur/admin',
        'L\'accès est contrôlé — invitations à usage unique, codes événement, token public d\'album complet',
      ],
      goals: [
        'Livrer un pipeline d\'auth complet : l\'admin génère les invitations, les organisateurs s\'inscrivent, le JWT sécurise l\'API',
        'Imposer l\'unicité des noms d\'affichage par événement au niveau de la base de données',
        'Proposer un accès par QR code et un export ZIP streamé quelle que soit la taille de la galerie',
      ],
    },
    architecture: {
      diagramPlaceholder: 'Architecture Système Albumy',
      bullets: [
        'Frontend Angular 20 (composants standalone) affiche les dashboards organisateur et le flux d\'upload invité, avec QR codes via angularx-qrcode.',
        'Backend Spring Boot répartit les responsabilités entre contrôleurs et services Auth, Event, File, FullAlbum et Guest.',
        'Spring Security enforced le JWT (24h) avec mots de passe hachés BCrypt et gardes par rôle pour ADMIN/ORGANIZER.',
        'PostgreSQL stocke événements, utilisateurs, noms d\'affichage invités et jetons d\'invitation ; une contrainte unique sécurise les collisions par événement.',
        'Les photos sont stockées sur le disque local ; les exports ZIP streament du disque vers la réponse.',
      ],
      highlights: [
        {
          title: 'Unicité des Noms au Niveau DB',
          description: 'Les noms d\'affichage invités par événement sont contraints dans PostgreSQL : les doublons sont rejetés avant tout upload.',
        },
        {
          title: 'Flux Invité Sans Compte',
          description: 'Les invités saisissent un code événement à 6 caractères et choisissent un nom unique pour uploader — ils ne voient que leurs propres photos.',
        },
        {
          title: 'Lecture et Écriture Contrôlées',
          description: 'Lecture via QR/code événement ou token UUID d\'album complet ; écriture réservée aux rôles organisateur/admin protégés par JWT.',
        },
      ],
    },
    decisions: [
      {
        title: 'Noms Uniques par Événement Sans Comptes',
        reasoning: 'Supprimer l\'inscription élimine le plus grand frein à la participation des invités tout en gardant une attribution fiable dans l\'événement.',
        tradeoffs: 'L\'unicité doit être imposée par événement au niveau base de données et validée par le backend avant acceptation — le frontend seul ne suffit pas.',
      },
      {
        title: 'Jetons d\'Invitation à Usage Unique et à Expiration',
        reasoning: 'L\'ADMIN les génère ; l\'échange unique associé à une expiration de 7 jours garde l\'inscription des organisateurs contrôlée et auditée.',
        tradeoffs: 'Les jetons ajoutent une étape d\'émission pour les admins et doivent être vérifiés (expiration, réutilisation) à chaque tentative d\'échange.',
      },
      {
        title: 'Export ZIP Streamé',
        reasoning: 'Les galeries peuvent contenir beaucoup de photos ; construire un ZIP entier en mémoire risque l\'épuisement mémoire sur les grands événements.',
        tradeoffs: 'Le streaming garde la mémoire stable mais exige une gestion fine des buffers et de la réponse pour exposer progression et erreurs.',
      },
    ],
    deployment: {
      isDeployed: false,
      details: [],
      considerations: [
        'PostgreSQL containerisé via docker-compose pour un approvisionnement base de données reproductible',
        'API REST sécurisée par JWT avec autorisation Spring Security basée sur les rôles',
        'Répertoire d\'uploads dédié avec stockage disque et stratégie de sauvegarde des médias',
        'Export ZIP streamé côté serveur pour éviter de charger les grandes galeries en mémoire',
      ],
    },
    challenges: [
      {
        challenge: 'Permettre aux invités d\'uploader sans compte tout en gardant chacun identifiable dans l\'événement.',
        solution: 'Les invités choisissent un nom d\'affichage validé par le backend pour l\'unicité dans l\'événement avant tout upload, soutenu par une contrainte au niveau DB.',
        outcome: 'Chacun peut contribuer avec un lien et un nom, l\'attribution reste fiable et les doublons sont empêchés.',
      },
      {
        challenge: 'Exporter toute une galerie en ZIP sans épuiser la mémoire du serveur sur les grands événements.',
        solution: 'Le ZIP est assemblé et streamé directement vers la réponse, le frontend déclenchant le téléchargement comme fichier.',
        outcome: 'Les téléchargements de galerie restent sûrs en mémoire quelle que soit la taille de l\'événement.',
      },
      {
        challenge: 'Garder cohérents le chemin de lecture publique (invités, lien album complet) et le chemin d\'écriture protégé (organisateurs, admins).',
        solution: 'Flux séparés et scopés : accès invité par code événement, token UUID de lecture pour l\'album complet, endpoints organisateur/admin protégés par JWT.',
        outcome: 'Le partage public en lecture seule et la gestion privilégiée coexistent sans chevauchement des chemins d\'autorisation.',
      },
    ],
    impact: {
      improvements: [
        'Livraison complète du pipeline auth et média : invitations admin, inscription organisateur, accès JWT par rôle',
        'Suppression de la barrière du compte pour les invités avec noms d\'affichage uniques imposés au niveau base de données',
        'Export des grandes galeries via ZIP streamé avec accès événement par QR code',
      ],
      learnings: [
        'Les flux d\'inscription sensibles gagnent à utiliser des jetons à usage unique avec expiration, émis par un rôle de confiance',
        'Les identifiants visibles (noms d\'affichage) doivent être contraints au niveau stockage, pas seulement dans l\'UI',
        'Le streaming fait la différence entre « ça marche » et « ça passe à l\'échelle » pour les exports riches en médias',
      ],
    },
  };

  get project(): ProjectDetail {
    return this.i18n.lang() === 'fr' ? this.projectFr : this.projectEn;
  }

  getStatusLabel(status: string): string {
    switch (status) {
      case 'production':
        return this.i18n.t('status.production');
      case 'completed':
        return this.i18n.t('status.completed');
      case 'in-development':
        return this.i18n.t('status.in-development');
      default:
        return this.i18n.t('detail.project');
    }
  }
}