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
    status: 'production' | 'completed' | 'in-development';
    companyNote?: { en: string; fr: string };
    backgroundImage?: string;
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
        // ── Featured Systems ──────────────────────────────
        {
            id: 'caferesto',
            title: { en: 'CafeResto', fr: 'CafeResto' },
            impact: {
                en: 'Multi-tenant restaurant platform engineered for real-time operations, automated stock logic, and production-grade infrastructure.',
                fr: 'Plateforme restaurant multi-tenant conçue pour les opérations en temps réel, la gestion automatisée du stock et une infrastructure de production.',
            },
            techStack: ['Spring Boot', 'React', 'Docker', 'PostgreSQL', 'Nginx'],
            status: 'production',
            backgroundImage: '/assets/pentiyo.png',
        },
        {
            id: 'document-marketplace',
            title: { en: 'DocMarket', fr: 'DocMarket' },
            impact: {
                en: 'Digital marketplace system with transactional wallet logic, real-time messaging, and online payment integration.',
                fr: 'Marketplace numérique avec logique wallet transactionnelle, messagerie temps réel et intégration de paiement en ligne.',
            },
            techStack: ['Spring Boot', 'Angular', 'Flutter', 'WebSocket', 'PostgreSQL'],
            status: 'production',
            backgroundImage: '/favicon.ico',
            companyNote: {
                en: 'Developed as part of professional role',
                fr: 'Développé dans un contexte professionnel',
            },
        },
        // ── Engineering Projects ──────────────────────────
        {
            id: 'chellysport',
            title: { en: 'ChellySport', fr: 'ChellySport' },
            impact: {
                en: 'Multi-sport club management system covering registration workflows, scheduling logic, and facility coordination.',
                fr: 'Système de gestion de club multisport couvrant inscriptions, planification et coordination des installations.',
            },
            techStack: ['Spring Boot', 'Angular', 'Flutter', 'MySQL', 'JWT'],
            status: 'completed',
            backgroundImage: '/favicon.ico',
        },
        // ── In Development ────────────────────────────────
        {
            id: 'car-rental',
            title: { en: 'AutoRent', fr: 'AutoRent' },
            impact: {
                en: 'Vehicle rental system with booking lifecycle orchestration and conflict-free reservation engine.',
                fr: 'Système de location de véhicules avec orchestration du cycle de réservation et moteur sans conflits.',
            },
            techStack: ['Spring Boot', 'Angular', 'PostgreSQL', 'JWT'],
            status: 'in-development',
            backgroundImage: '/favicon.ico',
        },
        {
            id: 'delivery-tracking',
            title: { en: 'SwiftDeliver', fr: 'SwiftDeliver' },
            impact: {
                en: 'Delivery coordination platform with real-time personnel tracking and route-aware fleet management.',
                fr: 'Plateforme de coordination de livraison avec suivi du personnel en temps réel et gestion de flotte orientée itinéraire.',
            },
            techStack: ['Spring Boot', 'Angular', 'PostgreSQL', 'PostGIS'],
            status: 'in-development',
            backgroundImage: '/favicon.ico',
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
        return this.projects.filter(p => p.id !== 'caferesto');
    }

    get engineeringProjects(): Project[] {
        return this.projects.filter(p => p.status === 'completed');
    }

    get developmentProjects(): Project[] {
        return this.projects.filter(p => p.status === 'in-development');
    }

    getStatusLabel(status: string): string {
        switch (status) {
            case 'production': return this.i18n.t('status.production');
            case 'completed': return this.i18n.t('status.completed');
            case 'in-development': return this.i18n.t('status.in-development');
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
            void this.router.navigate(['/projects', projectId], {
                queryParams: { focus: '1' },
            });
        }, 150);
    }
}
