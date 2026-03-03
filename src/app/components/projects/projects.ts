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
            impact: 'Multi-tenant restaurant platform engineered for real-time operations, automated stock logic, and production-grade infrastructure. Designed with strict tenant isolation, Dockerized deployment, and full monitoring stack.',
            techStack: ['Spring Boot', 'React', 'Docker', 'PostgreSQL', 'Nginx'],
            status: 'production',
        },
        {
            id: 'document-marketplace',
            title: 'DocMarket',
            impact: 'Digital marketplace system with transactional wallet logic, real-time WebSocket messaging, and online payment integration. Production-deployed system handling secure file delivery and user-based financial flows.',
            techStack: ['Spring Boot', 'Angular', 'Flutter', 'WebSocket', 'PostgreSQL'],
            status: 'production',
        },
        // ── Engineering Projects ──────────────────────────
        {
            id: 'chellysport',
            title: 'ChellySport',
            impact: 'Multi-sport club management system covering registration workflows, scheduling logic, and facility coordination. Full-stack implementation with mobile integration and role-based access control.',
            techStack: ['Spring Boot', 'Angular', 'Flutter', 'MySQL', 'JWT'],
            status: 'completed',
        },
        // ── In Development ────────────────────────────────
        {
            id: 'car-rental',
            title: 'AutoRent',
            impact: 'Vehicle rental system with booking lifecycle orchestration and conflict-free reservation engine. Focused on transactional integrity and availability logic.',
            techStack: ['Spring Boot', 'Angular', 'PostgreSQL', 'JWT'],
            status: 'in-development',
        },
        {
            id: 'delivery-tracking',
            title: 'SwiftDeliver',
            impact: 'Delivery coordination platform with real-time personnel tracking and route-aware fleet management. Integrated geospatial logic and operational lifecycle tracking.',
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
