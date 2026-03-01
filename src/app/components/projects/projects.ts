import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FadeInDirective } from '../../directives/fade-in.directive';

interface Project {
    id: string;
    title: string;
    impact: string;
    techStack: string[];
    status: 'production' | 'case-study' | 'experimental';
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
    projects: Project[] = [
        {
            id: 'distributed-ecommerce',
            title: 'Distributed E-Commerce Platform',
            impact: 'Scalable backend system handling authenticated multi-role access with milligram-level inventory tracking.',
            techStack: ['Spring Boot', 'Angular', 'Docker', 'PostgreSQL', 'Redis'],
            status: 'production',
            backgroundImage: 'assets/majd.jpeg',
        },
        {
            id: 'monitoring-system',
            title: 'Monitoring-Driven API Architecture',
            impact: 'Containerized microservice ecosystem with full observability stack and automated alerting pipelines.',
            techStack: ['Prometheus', 'Grafana', 'Spring Boot', 'Docker', 'Actuator'],
            status: 'case-study',
            backgroundImage: 'favicon.ico',
        },
        {
            id: 'cicd-pipeline',
            title: 'Automated CI/CD Infrastructure',
            impact: 'Zero-downtime deployment pipeline integrating testing, security scanning, and container registry.',
            techStack: ['Jenkins', 'Docker', 'SonarQube', 'Nginx', 'Shell Scripting'],
            status: 'production',
            backgroundImage: 'assets/projects/cicd-bg.jpg',
        },
        {
            id: 'secure-auth-system',
            title: 'Secure Multi-Service Architecture',
            impact: 'Centralized identity management implementing RBAC, JWT revocation, and secure session handling.',
            techStack: ['Spring Security', 'JWT', 'Oauth2', 'Angular', 'Redis'],
            status: 'experimental',
            backgroundImage: 'assets/projects/auth-bg.jpg',
        },
        {
            id: 'real-time-analytics',
            title: 'Real-Time Data Analytics Engine',
            impact: 'High-throughput stream processing system analyzing user behavior patterns with sub-second latency.',
            techStack: ['Apache Kafka', 'Spring Boot', 'Elasticsearch', 'WebSockets'],
            status: 'case-study',
            backgroundImage: 'assets/projects/analytics-bg.jpg',
        },
        {
            id: 'cloud-infrastructure',
            title: 'Hybrid Cloud Infrastructure',
            impact: 'Multi-region deployment architecture ensuring high availability and disaster recovery compliance.',
            techStack: ['AWS', 'Terraform', 'Kubernetes', 'Ansible'],
            status: 'production',
            backgroundImage: 'assets/projects/cloud-bg.jpg',
        },
    ];

    getStatusLabel(status: string): string {
        switch (status) {
            case 'production': return 'Production Deployed';
            case 'case-study': return 'Case Study';
            case 'experimental': return 'Experimental';
            default: return 'Project';
        }
    }
}
