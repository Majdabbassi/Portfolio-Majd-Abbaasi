import { ProjectDetail } from '../project-detail';

// Facts from the owner's analysis of the code (2026-10-07, _plans/projects/massarat.md).
// No usage numbers on purpose: none are confirmed yet.
export const MASSARAT: { en: ProjectDetail; fr: ProjectDetail } = {
  en: {
    id: 'massarat-plus',
    title: 'Massarat+ — Educational Content Marketplace',
    summary:
      'A Tunisian marketplace, live in production, where verified teachers sell study documents to parents and students. Buyers pay by card, e-wallet, D17 mobile money or a prepaid wallet; files stay encrypted on the server and are only decrypted for people who bought them.',
    status: 'production',
    role: 'Full Stack Engineer',
    roleContext: 'Primary engineer: encryption and payment systems',
    techStack: ['Spring Boot 3.5 · Java 17', 'Angular 19 / 20', 'Expo 54 · React Native 0.81', 'MySQL', 'STOMP WebSocket', 'AES (at rest)'],
    metrics: {
      team: 'Primary full-stack engineer, with one DevOps engineer',
      duration: 'Aug 2025 → today, at Educanet',
      scale: 'One API for three clients (parent shop, admin + teacher app, mobile) · ~35 entities',
      keyOutcomes: [
        'Live at massarat-plus.com, with a staff back-office and a mobile app',
        'Three payment rails plus a prepaid wallet, including D17 top-ups approved by staff',
        'Documents encrypted at rest and decrypted per purchase, shown in a protected viewer',
      ],
    },
    context: {
      problem:
        'Teachers had no simple, trusted way to sell their exercise sets, exams and summaries online, and many Tunisian families do not pay by bank card.',
      constraints: [
        'Teachers’ files are the product: they must never be served to someone who did not buy them',
        'Payments through local gateways (Konnect, GPG) and D17 mobile money, which has no merchant API',
        'Parents and teachers need to talk before and after a purchase',
        'A web shop, a staff back-office and a mobile app sharing the same rules',
      ],
      goals: [
        'Encrypt every document at rest and decrypt it only after a purchase check',
        'Offer card, e-wallet, D17 and a prepaid wallet, and credit teachers on every sale',
        'Verify teachers (ID, selfie, bank details, signed contract) before they can sell',
        'Real-time parent ↔ teacher chat inside the platform',
      ],
    },
    architecture: {
      diagramPlaceholder: 'Massarat+ Architecture',
      bullets: [
        'Spring Boot 3.5 API (Java 17) deployed as a WAR on Tomcat, MySQL with ~35 tables',
        'Documents AES-CBC encrypted on disk with a random IV per file; decrypted and streamed only after a purchase check',
        'Parent web shop in Angular 20 with an in-browser PDF viewer; admin and teacher app in Angular 19',
        'Expo 54 / React Native 0.81 mobile app that also builds for the web',
        'Payments: Konnect (card and e-wallet), GPG Checkout with signed callbacks, and an internal wallet',
        'Teacher earnings, payout requests and sponsorship placements approved by admins',
        'STOMP chat over SockJS with attachments and read status',
      ],
      highlights: [
        {
          title: 'Protected content',
          description: 'Files are never served raw: preview and download check the purchase, decrypt the file and stream it to the viewer.',
        },
        {
          title: 'Never trust the payment redirect',
          description: 'GPG callbacks are signature-checked and Konnect payments are re-read from Konnect by reference before an order is confirmed.',
        },
        {
          title: 'Accounts that hold money',
          description: 'Short-lived access tokens with refresh tokens, lockout after 5 failed logins and a security event log.',
        },
      ],
    },
    decisions: [
      {
        title: 'Local payment rails plus an internal wallet',
        reasoning: 'That is how Tunisian families actually pay, including people without a bank card. The wallet makes repeat purchases instant, with no per-sale gateway fee.',
        tradeoffs: 'Three gateways and a wallet to keep consistent, each with its own confirmation flow.',
      },
      {
        title: 'D17 by receipt and admin approval',
        reasoning: 'D17 mobile money has no merchant API; uploading the transfer receipt for staff approval still lets mobile-money users top up.',
        tradeoffs: 'A human step in the loop for D17 top-ups.',
      },
      {
        title: 'Encrypt at rest, decrypt per purchase',
        reasoning: 'Teachers’ work is what the platform sells, so it is protected even if someone reaches the file storage.',
        tradeoffs: 'Decryption on every preview and download, handled by streaming.',
      },
      {
        title: 'One API, and one mobile codebase that also targets the web',
        reasoning: 'The shop, the back-office and the app share every rule; Expo with react-native-web avoids writing a second app.',
        tradeoffs: 'Web output of the mobile app follows mobile UI patterns.',
      },
    ],
    deployment: {
      isDeployed: true,
      liveUrl: 'https://massarat-plus.com',
      flow: 'Maven build → WAR → Tomcat → production',
      environment: 'Linux servers with MySQL and server-side file storage',
      details: [
        'Backend deployed as a WAR on Tomcat',
        'Parent shop and staff back-office served as static Angular builds',
        'Mobile app built with Expo',
        'Password reset e-mails through the company SMTP',
      ],
    },
    challenges: [
      {
        challenge: 'Confirming card payments safely across two gateways.',
        solution: 'Signature check on GPG callbacks; Konnect payments re-queried by their reference instead of trusting the browser redirect.',
        outcome: 'An order is confirmed only when the gateway itself says the payment happened.',
      },
      {
        challenge: 'Letting families without a card buy documents.',
        solution: 'A prepaid wallet with D17 top-ups by receipt, approved by staff, then instant purchases from the balance.',
        outcome: 'Mobile-money users can buy like everyone else.',
      },
    ],
    impact: {
      improvements: [
        'Teachers sell their documents and request payouts from one place',
        'Parents buy by card, e-wallet, D17 or wallet and read documents in a protected viewer',
        'Staff verify teachers, approve top-ups, sponsorships and payouts from a back-office',
        'Teacher ranking (0.7 × sales + 0.3 × documents) and sponsored placements help discovery',
      ],
      learnings: [
        'Payment work is mostly the edge cases: callbacks, re-checks and approvals',
        'When files are the product, access control belongs in the download path itself',
        'One API serving three clients keeps rules consistent but needs disciplined DTOs',
      ],
    },
  },
  fr: {
    id: 'massarat-plus',
    title: 'Massarat+ — Marketplace de contenu éducatif',
    summary:
      'Une marketplace tunisienne, en production, où des enseignants vérifiés vendent des documents d’étude aux parents et aux élèves. Paiement par carte, e-wallet, D17 ou wallet prépayé ; les fichiers restent chiffrés sur le serveur et ne sont déchiffrés que pour les acheteurs.',
    status: 'production',
    role: 'Ingénieur Full Stack',
    roleContext: 'Ingénieur principal : chiffrement et paiements',
    techStack: ['Spring Boot 3.5 · Java 17', 'Angular 19 / 20', 'Expo 54 · React Native 0.81', 'MySQL', 'STOMP WebSocket', 'AES (au repos)'],
    metrics: {
      team: 'Ingénieur full-stack principal, avec un ingénieur DevOps',
      duration: 'Août 2025 → aujourd’hui, chez Educanet',
      scale: 'Une API pour trois clients (boutique parents, app admin + enseignants, mobile) · ~35 entités',
      keyOutcomes: [
        'En ligne sur massarat-plus.com, avec un back-office et une application mobile',
        'Trois moyens de paiement plus un wallet prépayé, dont les recharges D17 validées par l’équipe',
        'Documents chiffrés au repos et déchiffrés à l’achat, affichés dans une visionneuse protégée',
      ],
    },
    context: {
      problem:
        'Les enseignants n’avaient pas de moyen simple et fiable de vendre leurs séries d’exercices, examens et résumés en ligne, et beaucoup de familles tunisiennes ne paient pas par carte.',
      constraints: [
        'Les fichiers des enseignants sont le produit : jamais servis à quelqu’un qui ne les a pas achetés',
        'Paiements via des passerelles locales (Konnect, GPG) et D17, qui n’a pas d’API marchand',
        'Parents et enseignants doivent pouvoir échanger avant et après un achat',
        'Une boutique web, un back-office et une app mobile qui partagent les mêmes règles',
      ],
      goals: [
        'Chiffrer chaque document au repos et ne le déchiffrer qu’après vérification de l’achat',
        'Proposer carte, e-wallet, D17 et wallet prépayé, et créditer l’enseignant à chaque vente',
        'Vérifier les enseignants (pièce d’identité, selfie, RIB, contrat signé) avant la vente',
        'Un chat parent ↔ enseignant en temps réel dans la plateforme',
      ],
    },
    architecture: {
      diagramPlaceholder: 'Architecture de Massarat+',
      bullets: [
        'API Spring Boot 3.5 (Java 17) déployée en WAR sur Tomcat, MySQL avec ~35 tables',
        'Documents chiffrés en AES-CBC sur disque avec un IV aléatoire par fichier ; déchiffrés et diffusés seulement après vérification de l’achat',
        'Boutique parents en Angular 20 avec visionneuse PDF ; app admin et enseignants en Angular 19',
        'Application mobile Expo 54 / React Native 0.81, compilable aussi pour le web',
        'Paiements : Konnect (carte et e-wallet), GPG Checkout avec callbacks signés, et wallet interne',
        'Gains enseignants, demandes de virement et sponsoring validés par les admins',
        'Chat STOMP sur SockJS avec pièces jointes et statut de lecture',
      ],
      highlights: [
        {
          title: 'Contenu protégé',
          description: 'Les fichiers ne sont jamais servis bruts : l’aperçu et le téléchargement vérifient l’achat, déchiffrent le fichier et le diffusent dans la visionneuse.',
        },
        {
          title: 'Ne jamais croire la redirection de paiement',
          description: 'Les callbacks GPG sont vérifiés par signature et les paiements Konnect sont relus chez Konnect avant de confirmer une commande.',
        },
        {
          title: 'Des comptes qui contiennent de l’argent',
          description: 'Jetons d’accès courts avec refresh tokens, blocage après 5 échecs de connexion et journal des événements de sécurité.',
        },
      ],
    },
    decisions: [
      {
        title: 'Paiements locaux plus un wallet interne',
        reasoning: 'C’est ainsi que les familles tunisiennes paient, y compris sans carte bancaire. Le wallet rend les achats suivants instantanés, sans frais de passerelle à chaque vente.',
        tradeoffs: 'Trois passerelles et un wallet à garder cohérents, chacun avec son flux de confirmation.',
      },
      {
        title: 'D17 par reçu et validation admin',
        reasoning: 'D17 n’a pas d’API marchand ; envoyer le reçu du transfert pour validation permet quand même aux utilisateurs de mobile money de recharger.',
        tradeoffs: 'Une étape humaine pour les recharges D17.',
      },
      {
        title: 'Chiffrer au repos, déchiffrer à l’achat',
        reasoning: 'Le travail des enseignants est ce que la plateforme vend : il reste protégé même si quelqu’un atteint le stockage.',
        tradeoffs: 'Un déchiffrement à chaque aperçu et téléchargement, géré en streaming.',
      },
      {
        title: 'Une API, et un code mobile qui cible aussi le web',
        reasoning: 'La boutique, le back-office et l’app partagent toutes les règles ; Expo avec react-native-web évite une deuxième application.',
        tradeoffs: 'La version web de l’app suit les codes de l’interface mobile.',
      },
    ],
    deployment: {
      isDeployed: true,
      liveUrl: 'https://massarat-plus.com',
      flow: 'Build Maven → WAR → Tomcat → production',
      environment: 'Serveurs Linux avec MySQL et stockage de fichiers côté serveur',
      details: [
        'Backend déployé en WAR sur Tomcat',
        'Boutique parents et back-office servis en builds Angular statiques',
        'Application mobile construite avec Expo',
        'E-mails de réinitialisation via le SMTP de l’entreprise',
      ],
    },
    challenges: [
      {
        challenge: 'Confirmer les paiements par carte en toute sécurité sur deux passerelles.',
        solution: 'Vérification de signature sur les callbacks GPG ; paiements Konnect relus par leur référence au lieu de croire la redirection du navigateur.',
        outcome: 'Une commande n’est confirmée que lorsque la passerelle elle-même confirme le paiement.',
      },
      {
        challenge: 'Permettre aux familles sans carte d’acheter des documents.',
        solution: 'Un wallet prépayé rechargeable par D17 (reçu validé par l’équipe), puis des achats instantanés depuis le solde.',
        outcome: 'Les utilisateurs de mobile money achètent comme tout le monde.',
      },
    ],
    impact: {
      improvements: [
        'Les enseignants vendent leurs documents et demandent leurs virements au même endroit',
        'Les parents paient par carte, e-wallet, D17 ou wallet et lisent les documents dans une visionneuse protégée',
        'L’équipe vérifie les enseignants, valide recharges, sponsoring et virements depuis un back-office',
        'Classement des enseignants (0,7 × ventes + 0,3 × documents) et mises en avant sponsorisées',
      ],
      learnings: [
        'Les paiements, c’est surtout les cas limites : callbacks, revérifications et validations',
        'Quand les fichiers sont le produit, le contrôle d’accès se fait dans le téléchargement lui-même',
        'Une API pour trois clients garde les règles cohérentes mais demande des DTO rigoureux',
      ],
    },
  },
};
