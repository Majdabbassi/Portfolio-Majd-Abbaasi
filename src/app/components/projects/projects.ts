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
        // ── Production / DevOps-heavy Systems ────────────
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
                en: 'Production salon & professional booking platform with gig-worker dispatch, waitlists, analytics dashboards, and full observability.',
                fr: 'Plateforme de réservation salon & professionnels en production avec dispatch d’aides, files d’attente, dashboards analytics et observabilité complète.',
            },
            techStack: ['Spring Boot', 'Angular', 'MySQL', 'Docker', 'Prometheus', 'Grafana', 'cAdvisor', 'GitHub Actions'],
            status: 'production',
            category: 'devops',
            icon: '/assets/icon-bookpro.png',
            accentColor: '#10b981',
            highlights: [
                { en: 'Live deployment with scheduled backups & CI pipeline', fr: 'Déploiement live avec backups planifiés et pipeline CI' },
                { en: 'Multi-role: client, professional, aide, wholesale, admin', fr: 'Multi-rôles : client, professionnel, aide, grossiste, admin' },
            ],
        },
        {
            id: 'data-analytics',
            title: { en: 'InsightHub', fr: 'InsightHub' },
            impact: {
                en: 'AI-powered analytics platform combining Spring Boot, FastAPI data science, DuckDB queries, and an Ollama LLM assistant for natural-language data exploration.',
                fr: 'Plateforme d’analytics propulsée par l’IA combinant Spring Boot, data science FastAPI, requêtes DuckDB et assistant LLM Ollama pour l’exploration des données en langage naturel.',
            },
            techStack: ['Spring Boot', 'Angular', 'FastAPI', 'DuckDB', 'MySQL', 'Ollama', 'Docker Compose'],
            status: 'completed',
            category: 'ai',
            icon: '/assets/icon-insighthub.png',
            accentColor: '#d97706',
            highlights: [
                { en: 'Data cleaning, anomaly detection & trend insights service', fr: 'Service de nettoyage, détection d’anomalies et insights de tendances' },
                { en: 'Natural-language LLM assistant grounded on datasets', fr: 'Assistant LLM en langage naturel basé sur les jeux de données' },
            ],
        },
        {
            id: 'document-marketplace',
            title: { en: 'Massarat+', fr: 'Massarat+' },
            impact: {
                en: 'Educational content marketplace with AES-128 file encryption, transactional wallet, real-time messaging, and multi-gateway payments.',
                fr: 'Marketplace de contenu éducatif avec chiffrement AES-128, wallet transactionnel, messagerie temps réel et paiements multi-passerelles.',
            },
            techStack: ['Spring Boot', 'Angular', 'Expo (React Native)', 'WebSocket', 'AES-128', 'Firebase'],
            status: 'production',
            category: 'fullstack',
            icon: '/assets/icon-docmarket.png',
            accentColor: '#3b82f6',
            highlights: [
                { en: 'AES-128 encrypted content delivery', fr: 'Livraison de contenu chiffrée AES-128' },
                { en: 'Wallet orchestration across regional gateways', fr: 'Orchestration wallet multi-passerelles régionales' },
            ],
        },
        {
            id: 'n8n',
            title: { en: 'n8n Automation Core', fr: 'n8n Automation Core' },
            impact: {
                en: 'Workflow automation platform pairing n8n with a Spring Boot backend and Angular frontend — email collection, campaign orchestration, and lead pipelines in one stack.',
                fr: 'Plateforme d’automatisation de workflows associant n8n à un backend Spring Boot et un frontend Angular — collecte d’emails, orchestration de campagnes et pipelines de leads.',
            },
            techStack: ['n8n', 'Spring Boot', 'Angular', 'MySQL', 'Docker Compose', 'phpMyAdmin'],
            status: 'completed',
            category: 'devops',
            icon: '/assets/icon-n8n.png',
            accentColor: '#ea580c',
            highlights: [
                { en: 'n8n workflow engine + custom Spring Boot services', fr: 'Moteur de workflow n8n + services Spring Boot custom' },
                { en: 'Campaign, lead, and client orchestration', fr: 'Orchestration de campagnes, leads et clients' },
            ],
        },
        // ── Full-stack / Completed ───────────────────────
        {
            id: 'chellysport',
            title: { en: 'ChellySport', fr: 'ChellySport' },
            impact: {
                en: 'Multi-sport club management system covering registration workflows, scheduling logic, and facility coordination.',
                fr: 'Système de gestion de club multisport couvrant inscriptions, planification et coordination des installations.',
            },
            techStack: ['Spring Boot', 'Angular', 'React Native', 'MySQL', 'WebSocket', 'Konnect'],
            status: 'completed',
            category: 'fullstack',
            icon: '/assets/icon-chellysport.png',
            accentColor: '#10b981',
            highlights: [
                { en: 'Club boutique with Konnect payment flow', fr: 'Boutique du club avec flux de paiement Konnect' },
                { en: 'Real-time coach-to-member messaging', fr: 'Messagerie temps réel coach-membre' },
            ],
        },
        {
            id: 'albumy',
            title: { en: 'Albumy', fr: 'Albumy' },
            impact: {
                en: 'Event photo-sharing platform where organizers create events, guests upload with unique names, and galleries export as ZIP — invite-gated with QR access.',
                fr: 'Plateforme de partage de photos d’événements : les organisateurs créent des événements, les invités uploadent avec des noms uniques et les galeries s’exportent en ZIP — accès par invitation et QR code.',
            },
            techStack: ['Spring Boot', 'Angular', 'PostgreSQL', 'JWT', 'QR Code', 'ZIP streaming'],
            status: 'completed',
            category: 'fullstack',
            icon: '/assets/icon-albumy.png',
            accentColor: '#3b82f6',
            highlights: [
                { en: 'No-account guest upload with per-event unique names', fr: 'Upload invité sans compte, noms uniques par événement' },
                { en: 'Admin invite gating & server-side ZIP export', fr: 'Contrôle d’accès par invitation admin et export ZIP côté serveur' },
            ],
        },
        {
            id: 'mediplus',
            title: { en: 'MediPlus', fr: 'MediPlus' },
            impact: {
                en: 'Healthcare platform — a role-based backoffice for user management, doctor verification, medicine catalog, billing, and support, paired with a patient mobile app.',
                fr: 'Plateforme santé — backoffice basé sur les rôles pour la gestion des utilisateurs, la vérification des médecins, le catalogue de médicaments, la facturation et le support, associé à une application mobile patient.',
            },
            techStack: ['Spring Boot', 'Angular', 'Angular Material', 'React Native (Expo)', 'MySQL', 'Firebase', 'JWT'],
            status: 'completed',
            category: 'fullstack',
            icon: '/assets/icon-mediplus.png',
            accentColor: '#06b6d4',
            highlights: [
                { en: 'Role-based backoffice: SUPER_ADMIN, ADMIN, AGENT_SUPPORT', fr: 'Backoffice basé sur les rôles : SUPER_ADMIN, ADMIN, AGENT_SUPPORT' },
                { en: 'Doctor verification, medicine catalog & billing + patient mobile app', fr: 'Vérification des médecins, catalogue médicaments & facturation + app mobile patient' },
            ],
        },
        // ── In Development ───────────────────────────────
        {
            id: 'car-rental',
            title: { en: 'AutoRent', fr: 'AutoRent' },
            impact: {
                en: 'Vehicle rental system with booking lifecycle orchestration, telemetry, and conflict-free reservation engine.',
                fr: 'Système de location de véhicules avec orchestration du cycle de réservation, télémétrie et moteur sans conflits.',
            },
            techStack: ['Spring Boot', 'Angular', 'PostgreSQL', 'JWT', 'WebSocket', 'Push'],
            status: 'in-development',
            category: 'fullstack',
            icon: '/assets/icon-autorent.png',
            accentColor: '#8b5cf6',
            highlights: [
                { en: 'Booking lifecycle & contract orchestration', fr: 'Cycle de réservation et orchestration des contrats' },
                { en: 'Telemetry with push notifications', fr: 'Télémétrie avec notifications push' },
            ],
        },
        {
            id: 'delivery-tracking',
            title: { en: 'SwiftDeliver', fr: 'SwiftDeliver' },
            impact: {
                en: 'Delivery coordination platform with real-time personnel tracking and route-aware fleet management.',
                fr: 'Plateforme de coordination de livraison avec suivi du personnel en temps réel et gestion de flotte orientée itinéraire.',
            },
            techStack: ['Spring Boot', 'Angular', 'PostgreSQL', 'PostGIS', 'JWT'],
            status: 'in-development',
            category: 'devops',
            icon: '/assets/icon-swiftdeliver.png',
            accentColor: '#0ea5e9',
            highlights: [
                { en: 'Hierarchical multi-tenancy & state-machine orders', fr: 'Multi-tenant hiérarchique et commandes en machine à états' },
                { en: 'Geospatial fleet optimization', fr: 'Optimisation géospatiale de la flotte' },
            ],
        },
        {
            id: 'mallos',
            title: { en: 'Mall OS', fr: 'Mall OS' },
            impact: {
                en: 'B2B mall management MVP — role-based operations for super admins and mall managers, floor-map editing, and store/assistant management across tenants.',
                fr: 'MVP de gestion de centres commerciaux B2B — opérations basées sur les rôles pour super admins et managers, édition de plans d’étage, gestion des boutiques et assistants.',
            },
            techStack: ['Spring Boot', 'Angular', 'PrimeNG', 'MySQL', 'OpenAPI', 'Actuator'],
            status: 'in-development',
            category: 'fullstack',
            icon: '/assets/icon-mallos.png',
            accentColor: '#8b5cf6',
            highlights: [
                { en: 'Role-based super admin & mall manager dashboards', fr: 'Dashboards basés sur les rôles : super admin & manager' },
                { en: 'Floor-map trace editor for store layout', fr: 'Éditeur de tracé de plan d’étage pour l’agencement des boutiques' },
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

    onProjectFocus(event: MouseEvent, projectId: string): void {
        if (
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
