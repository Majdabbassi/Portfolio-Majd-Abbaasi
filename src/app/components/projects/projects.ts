import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { FadeInDirective } from '../../directives/fade-in.directive';

interface Project {
    id: string;
    title: string;
    impact: string;
    techStack: string[];
    status: 'production' | 'completed' | 'in-development';
    companyNote?: string;
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

    constructor(private readonly router: Router) {}

    projects: Project[] = [
        // ── Featured Systems ──────────────────────────────
        {
            id: 'caferesto',
            title: 'CafeResto',
            impact: 'Full-stack restaurant management platform with Docker-based deployment — menu, orders, reservations, and multi-role operations.',
            techStack: ['Spring Boot', 'Angular', 'Docker', 'PostgreSQL', 'Nginx'],
            status: 'production',
        },
        {
            id: 'document-marketplace',
            title: 'DocMarket',
            impact: 'Digital document marketplace with real-time WebSocket messaging, wallet system, and online card payments — deployed in production.',
            techStack: ['Spring Boot', 'Angular', 'Flutter', 'WebSocket', 'PostgreSQL'],
            status: 'production',
            companyNote: 'Developed as part of professional role',
        },
        // ── Engineering Projects ──────────────────────────
        {
            id: 'chellysport',
            title: 'ChellySport',
            impact: 'Multi-sport club management system — member registration, session scheduling, and facility reservations across multiple sports.',
            techStack: ['Spring Boot', 'Angular', 'Flutter', 'MySQL', 'JWT'],
            status: 'completed',
        },
        // ── In Development ────────────────────────────────
        {
            id: 'car-rental',
            title: 'AutoRent',
            impact: 'Vehicle rental management with fleet tracking, booking lifecycle, and conflict-free reservation engine.',
            techStack: ['Spring Boot', 'Angular', 'PostgreSQL', 'JWT'],
            status: 'in-development',
        },
        {
            id: 'delivery-tracking',
            title: 'SwiftDeliver',
            impact: 'Delivery company management with real-time personnel tracking, order lifecycle, and fleet coordination.',
            techStack: ['Spring Boot', 'Angular', 'PostgreSQL', 'PostGIS'],
            status: 'in-development',
        },
    ];

    get featuredProjects(): Project[] {
        return this.projects.filter(p => p.status === 'production');
    }

    get engineeringProjects(): Project[] {
        return this.projects.filter(p => p.status === 'completed');
    }

    get developmentProjects(): Project[] {
        return this.projects.filter(p => p.status === 'in-development');
    }

    getStatusLabel(status: string): string {
        switch (status) {
            case 'production': return 'Production';
            case 'completed': return 'Completed';
            case 'in-development': return 'In Development';
            default: return 'Project';
        }
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
