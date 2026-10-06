import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { FadeInDirective } from '../../directives/fade-in.directive';
import { I18nService } from '../../core/i18n.service';

interface Project {
    id: string;
    title: { en: string; fr: string };
    impact: { en: string; fr: string };
    techStack: string[];
    status: 'production' | 'completed' | 'in-development' | 'flagship';
    category: 'devops' | 'fullstack' | 'ai' | 'mobile';
    icon: string;
    accentColor: string;
    highlights: { en: string; fr: string }[];
    liveUrl?: string;
    apkUrl?: string;
}

@Component({
    selector: 'app-projects',
    standalone: true,
    imports: [FadeInDirective, RouterLink],
    templateUrl: './projects.html',
    styleUrl: './projects.css',
})
export class ProjectsComponent {
    focusedProjectId: string | null = null;
    constructor(private readonly router: Router, readonly i18n: I18nService) {}

    projects: Project[] = [
        {
            id: 'caferesto',
            title: { en: 'CafeResto', fr: 'CafeResto' },
            impact: {
                en: 'Multi-tenant restaurant platform engineered for real-time operations, automated stock logic, and production-grade infrastructure.',
                fr: 'Plateforme restaurant multi-tenant conçue pour les opérations en temps réel, la gestion automatisée du stock et une infrastructure de production.',
            },
            techStack: ['Spring Boot', 'React', 'Docker', 'PostgreSQL', 'Nginx', 'Prometheus', 'Grafana'],
            status: 'flagship',
            category: 'devops',
            icon: '/assets/icon-caferesto.png',
            accentColor: '#a68b6c',
            highlights: [
                { en: 'Multi-tenant isolation & real-time WebSocket sync', fr: 'Isolation multi-tenant et sync WebSocket temps réel' },
                { en: '13-service Docker topology with monitoring', fr: 'Topologie Docker 13 services avec monitoring' },
            ],
        },
        {
            id: 'bookpro',
            title: { en: 'BookPro', fr: 'BookPro' },
            impact: {
                en: 'Production salon & professional booking platform — web + Android APK — with bookings, waitlists, real-time updates, and full observability.',
                fr: 'Plateforme de réservation salon & professionnels en production — web + APK Android — avec réservations, files d’attente, temps réel et observabilité complète.',
            },
            techStack: [
                'Spring Boot',
                'Angular',
                'Angular Material',
                'MySQL',
                'WebSocket',
                'Firebase',
                'Docker',
                'Nginx',
                'Capacitor',
            ],
            status: 'production',
            category: 'devops',
            icon: '/assets/icon-bookpro.png',
            accentColor: '#10b981',
            liveUrl: 'https://bookpro.educanet.pro',
            apkUrl: '#apk-placeholder',
            highlights: [
                { en: 'Live deployment with scheduled backups & CI pipeline', fr: 'Déploiement live avec backups planifiés et pipeline CI' },
                { en: '5 user roles: client to wholesale', fr: '5 rôles utilisateurs : du client au grossiste' },
            ],
        },
        {
            id: 'document-marketplace',
            title: { en: 'Massarat+', fr: 'Massarat+' },
            impact: {
                en: 'Educational content marketplace with AES-128 file encryption, transactional wallet, real-time messaging, and multi-gateway payments.',
                fr: 'Marketplace de contenu éducatif avec chiffrement AES-128, wallet transactionnel, messagerie temps réel et paiements multi-passerelles.',
            },
            techStack: ['Spring Boot', 'Angular', 'Expo (React Native)', 'WebSocket', 'AES-128'],
            status: 'production',
            category: 'fullstack',
            icon: '/assets/icon-docmarket.png',
            accentColor: '#3b82f6',
            liveUrl: 'https://massarat-plus.com',
            apkUrl: '#apk-placeholder',
            highlights: [
                { en: 'AES-128 encrypted content delivery', fr: 'Livraison de contenu chiffrée AES-128' },
                { en: 'Wallet orchestration across regional gateways', fr: 'Orchestration wallet multi-passerelles régionales' },
            ],
        },
        {
            id: 'mediplus',
            title: { en: 'MediPlus', fr: 'MediPlus' },
            impact: {
                en: 'Medication-reminder platform (Dhakerni) — role-based Angular backoffice for users, doctor verification, medicine catalog, billing and support, with Spring Boot driving reminders and adherence, plus React Native (Expo) apps for patients, doctors and helpers.',
                fr: 'Plateforme de rappels de médicaments (Dhakerni) — backoffice Angular basé sur les rôles pour utilisateurs, vérification des médecins, catalogue de médicaments, facturation et support, avec un backend Spring Boot pilotant rappels et adhérence, plus des apps React Native (Expo) pour patients, médecins et tuteurs.',
            },
            techStack: ['Spring Boot', 'Angular', 'Angular Material', 'React Native (Expo)', 'MySQL', 'Firebase FCM', 'JWT', 'Quartz'],
            status: 'production',
            category: 'fullstack',
            icon: '/assets/icon-mediplus.png',
            accentColor: '#06b6d4',
            apkUrl: '#apk-placeholder',
            highlights: [
                { en: 'Role-based backoffice: SUPER_ADMIN, ADMIN, AGENT_SUPPORT', fr: 'Backoffice basé sur les rôles : SUPER_ADMIN, ADMIN, AGENT_SUPPORT' },
                { en: 'Quartz reminder engine, adherence tracking & vocal messages + mobile apps for patient, doctor and helper', fr: 'Moteur de rappels Quartz, suivi d’adhérence & messages vocaux + apps mobiles patient, médecin et tuteur' },
                { en: 'Offline-first sync, exact alarms & FCM push', fr: 'Synchronisation hors ligne, alarmes exactes & push FCM' },
            ],
        },
        {
            id: 'car-rental',
            title: { en: 'Car Rental Manager', fr: 'Car Rental Manager' },
            impact: {
                en: 'Back office for a rental agency: access rights per employee, bookings that can never overlap (even under concurrent requests), seasonal pricing, printable contracts and daily alerts.',
                fr: 'Back-office d’agence de location : droits par employé, réservations qui ne se chevauchent jamais (même en concurrence), tarification saisonnière, contrats imprimables et alertes quotidiennes.',
            },
            techStack: ['Spring Boot', 'Angular', 'MySQL', 'JWT', 'OpenPDF', 'Docker'],
            status: 'completed',
            category: 'fullstack',
            icon: '/assets/icon-autorent.png',
            accentColor: '#8b5cf6',
            liveUrl: 'https://carrental-platform.vercel.app',
            highlights: [
                { en: 'Double-booking proof: 8 simultaneous requests, one wins', fr: 'Zéro double réservation : 8 requêtes simultanées, une seule passe' },
                { en: '22 mutation-checked tests, live demo', fr: '22 tests validés par mutation, démo en ligne' },
            ],
        },
        {
            id: 'mallos',
            title: { en: 'Mall OS', fr: 'Mall OS' },
            impact: {
                en: 'Multi-tenant mall management: floor-plan editor, tenants and leases, monthly rent invoicing with late fees, occupancy analytics and an audit trail.',
                fr: 'Gestion de centres commerciaux multi-tenant : éditeur de plan, locataires et baux, facturation mensuelle avec pénalités, analyses d’occupation et journal d’audit.',
            },
            techStack: ['Spring Boot', 'Angular', 'PrimeNG', 'MySQL', 'Konva', 'Docker'],
            status: 'completed',
            category: 'fullstack',
            icon: '/assets/icon-mallos.png',
            accentColor: '#8b5cf6',
            liveUrl: 'https://mall-os-self.vercel.app',
            highlights: [
                { en: 'Floor plan coloured by lease state', fr: 'Plan colorié selon l’état des baux' },
                { en: 'Isolation between malls, 38 tests, live demo', fr: 'Isolation entre centres, 38 tests, démo en ligne' },
            ],
        },
        {
            id: 'delivery-tracking',
            title: { en: 'SwiftDeliver', fr: 'SwiftDeliver' },
            impact: {
                en: 'Delivery marketplace for vendors, delivery companies, drivers and customers, with live GPS tracking over WebSocket, an order state machine and Grafana monitoring.',
                fr: 'Marketplace de livraison pour vendeurs, sociétés de livraison, chauffeurs et clients, avec suivi GPS en direct par WebSocket, machine à états des commandes et supervision Grafana.',
            },
            techStack: ['Spring Boot', 'Angular', 'MySQL', 'WebSocket', 'Prometheus', 'Grafana'],
            status: 'completed',
            category: 'devops',
            icon: '/assets/icon-swiftdeliver.png',
            accentColor: '#0ea5e9',
            liveUrl: 'https://majdabbassi.github.io/delivery-platform/',
            highlights: [
                { en: 'Live driver position visible only to the people on the order', fr: 'Position du chauffeur visible seulement par les personnes de la commande' },
                { en: 'Five roles, 73 tests, live demo', fr: 'Cinq rôles, 73 tests, démo en ligne' },
            ],
        },
        {
            id: 'sportclub',
            title: { en: 'SportClub Platform', fr: 'SportClub Platform' },
            impact: {
                en: 'Sports club management for admins, coaches and parents: sessions and attendance, injuries, payments, shop and chat, with a web console and a mobile parent app on one API.',
                fr: 'Gestion de club sportif pour admins, coachs et parents : séances et présences, blessures, paiements, boutique et chat, avec console web et application mobile pour parents sur une seule API.',
            },
            techStack: ['Spring Boot', 'Angular', 'React Native (Expo)', 'MySQL', 'WebSocket', 'Docker'],
            status: 'completed',
            category: 'fullstack',
            icon: '/assets/icon-chellysport.png',
            accentColor: '#10b981',
            liveUrl: 'https://sportclub-platform-f6ry.vercel.app',
            highlights: [
                { en: 'Per-family access control enforced by the API', fr: 'Contrôle d’accès par famille appliqué par l’API' },
                { en: 'Web console and mobile app, live demo', fr: 'Console web et application mobile, démo en ligne' },
            ],
        },
        {
            id: 'friendmap',
            title: { en: 'FriendMap', fr: 'FriendMap' },
            impact: {
                en: 'Real-time location sharing with four privacy modes and immediate revocation, plus private chat with photos, presence and meetup planning with a live trip map.',
                fr: 'Partage de position en temps réel avec quatre modes de confidentialité et révocation immédiate, plus chat privé avec photos, présence et organisation de rendez-vous avec carte en direct.',
            },
            techStack: ['NestJS', 'Vue 3', 'PostgreSQL', 'Redis', 'Socket.IO', 'Kubernetes'],
            status: 'completed',
            category: 'devops',
            icon: '/assets/icon-friendmap.svg',
            accentColor: '#ef4444',
            liveUrl: 'https://majdabbassi.github.io/FriendMap/',
            highlights: [
                { en: 'Visibility checked on every broadcast', fr: 'Visibilité vérifiée à chaque diffusion' },
                { en: '109 + 21 + 36 tests, live demo', fr: '109 + 21 + 36 tests, démo en ligne' },
            ],
        },
        {
            id: 'data-analytics',
            title: { en: 'InsightHub', fr: 'InsightHub' },
            impact: {
                en: 'Data analytics with an AI assistant: semantic column roles, quality score, outliers and trends, cleaning, relationship detection, and plain-language questions answered by sandboxed read-only SQL.',
                fr: 'Analyse de données avec assistant IA : rôles sémantiques de colonnes, score de qualité, valeurs aberrantes et tendances, nettoyage, détection de relations, et questions en langage naturel répondues par du SQL lecture seule en bac à sable.',
            },
            techStack: ['Spring Boot', 'Angular', 'FastAPI', 'DuckDB', 'Ollama', 'Docker'],
            status: 'completed',
            category: 'ai',
            icon: '/assets/icon-insighthub.png',
            accentColor: '#d97706',
            highlights: [
                { en: 'SQL engine locked against file access', fr: 'Moteur SQL verrouillé contre l’accès aux fichiers' },
                { en: 'Local LLM: no data leaves the machine', fr: 'LLM local : aucune donnée ne quitte la machine' },
            ],
        },
        {
            id: 'albumy',
            title: { en: 'Albumy', fr: 'Albumy' },
            impact: {
                en: 'Event photo sharing: one QR code, no guest accounts, resumable chunked uploads, a background media worker and live galleries over WebSocket.',
                fr: 'Partage de photos d’événement : un QR code, aucun compte invité, envois reprenables en morceaux, worker média en arrière-plan et galeries en direct par WebSocket.',
            },
            techStack: ['Spring Boot', 'Angular', 'MySQL', 'Redis', 'WebSocket', 'Capacitor'],
            status: 'completed',
            category: 'fullstack',
            icon: '/assets/icon-albumy.png',
            accentColor: '#3b82f6',
            liveUrl: 'https://majdabbassi.github.io/Albumy/',
            highlights: [
                { en: 'Uploads resume after a reload or lost network', fr: 'Les envois reprennent après un rechargement ou une coupure' },
                { en: 'Live gallery, Android wrapper, live demo', fr: 'Galerie en direct, enveloppe Android, démo en ligne' },
            ],
        },
        {
            id: 'n8n',
            title: { en: 'ReachFlow', fr: 'ReachFlow' },
            impact: {
                en: 'Lead discovery and outreach: an n8n and Apify workflow finds businesses and emails, then resumable Gmail campaigns with reply and bounce tracking. Demo mode runs fully offline.',
                fr: 'Découverte de prospects et prospection : un workflow n8n et Apify trouve entreprises et e-mails, puis des campagnes Gmail reprenables avec suivi des réponses et rebonds. Le mode démo fonctionne hors ligne.',
            },
            techStack: ['n8n', 'Apify', 'Spring Boot', 'Angular', 'MySQL', 'Docker Compose'],
            status: 'completed',
            category: 'devops',
            icon: '/assets/icon-n8n.png',
            accentColor: '#ea580c',
            highlights: [
                { en: 'Never emails the same person twice', fr: 'N’écrit jamais deux fois à la même personne' },
                { en: 'Demo mode: no accounts needed', fr: 'Mode démo : aucun compte requis' },
            ],
        },

    ];

    text(project: { en: string; fr: string }): string {
        return this.i18n.lang() === 'fr' ? project.fr : project.en;
    }

    get featuredProjects(): Project[] {
        return this.projects.filter(p => p.status === 'production');
    }

    get masterProject(): Project | undefined {
        return this.projects.find(p => p.id === 'caferesto');
    }

    get secondaryProjects(): Project[] {
        return this.projects.filter(p => p.id !== 'caferesto' && p.status === 'production');
    }

    get completedProjects(): Project[] {
        return this.projects.filter(p => p.status === 'completed');
    }

    get developmentProjects(): Project[] {
        return this.projects.filter(p => p.status === 'in-development');
    }

    categoryLabel(category: Project['category']): string {
        const map: Record<Project['category'], { en: string; fr: string }> = {
            devops: { en: 'Backend & DevOps', fr: 'Backend & DevOps' },
            fullstack: { en: 'Full-Stack', fr: 'Full-Stack' },
            ai: { en: 'AI & Data', fr: 'IA & Données' },
            mobile: { en: 'Mobile', fr: 'Mobile' },
        };
        return this.i18n.lang() === 'fr' ? map[category].fr : map[category].en;
    }

    getStatusLabel(status: string): string {
        switch (status) {
            case 'production': return this.i18n.t('status.production');
            case 'completed': return this.i18n.t('status.completed');
            case 'in-development': return this.i18n.t('status.in-development');
            case 'flagship': return this.i18n.t('status.flagship');
            default: return this.i18n.t('nav.projects');
        }
    }

    getProjectActionLabel(project: Project): string {
        return project.status === 'in-development'
            ? this.i18n.t('projects.viewArch')
            : this.i18n.t('projects.viewCase');
    }

    openExternal(event: MouseEvent, url: string): void {
        event.stopPropagation();
        event.preventDefault();
        window.open(url, '_blank', 'noopener');
    }

    openExternalKey(event: KeyboardEvent, url: string): void {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            event.stopPropagation();
            window.open(url, '_blank', 'noopener');
        }
    }

    onProjectFocus(event: MouseEvent, projectId: string): void {        if (
            event.button !== 0 ||
            event.ctrlKey ||
            event.metaKey ||
            event.shiftKey ||
            event.altKey
        ) {
            return;
        }

        event.preventDefault();

        if (this.focusedProjectId) {
            return;
        }

        this.focusedProjectId = projectId;
        sessionStorage.setItem('portfolioProjectFocus', '1');

        setTimeout(() => {
            void this.router.navigate(['/projects', projectId]);
        }, 150);
    }
}
