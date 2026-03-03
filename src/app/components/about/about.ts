import { Component, inject } from '@angular/core';
import { FadeInDirective } from '../../directives/fade-in.directive';
import { I18nService } from '../../core/i18n.service';

type AboutPhase = {
    id: string;
    title: string;
    subtitle: string;
    points: string[];
};

@Component({
    selector: 'app-about',
    standalone: true,
    imports: [FadeInDirective],
    templateUrl: './about.html',
    styleUrl: './about.css',
})
export class AboutComponent {
    readonly i18n = inject(I18nService);

    private readonly phasesEn: AboutPhase[] = [
        {
            id: '01',
            title: 'Foundations',
            subtitle: 'Computer Science Studies — ISITCOM — Sept 2022 to June 2025',
            points: [
                'Built solid foundations in programming, logic, and structured problem solving.',
                'Learned to reason about systems behavior, not only syntax and implementation details.',
            ],
        },
        {
            id: '02',
            title: 'Responsibility',
            subtitle: 'First Internship — Educanet — Dec 2024 to June 2025',
            points: [
                'Worked on a real production system used by clients.',
                'Shifted from feature delivery to reliability-focused system thinking.',
            ],
        },
        {
            id: '03',
            title: 'Professional Growth',
            subtitle: 'Full-Stack Developer — Educanet — Jul 2025 to Present',
            points: [
                'Contributed to architectural decisions and improved internal code structure.',
                'Built in a more secure and performance-conscious environment.',
                'First production deployment exposure through WAR + Apache Tomcat workflow.',
            ],
        },
        {
            id: '04',
            title: 'Curiosity to Ownership',
            subtitle: 'Independent Deployment Laboratory',
            points: [
                'Repeatedly redeployed a controlled application to study production behavior.',
                'Tested reverse proxies, server configuration patterns, containerization, and Docker-based orchestration.',
                'Turned curiosity into a structured lifecycle mindset from architecture to operations.',
            ],
        },
    ];

    private readonly phasesFr: AboutPhase[] = [
        {
            id: '01',
            title: 'Fondations',
            subtitle: 'Études en informatique — sept 2022 à juin 2025',
            points: [
                'Construction de bases solides en programmation, logique et résolution structurée de problèmes.',
                'Compréhension du comportement des systèmes au-delà de la simple implémentation.',
            ],
        },

        {
            id: '02',
            title: 'Responsabilité',
            subtitle: 'Premier stage — Educanet — déc 2024 à juin 2025',
            points: [
                'Travail sur un système de production utilisé par de vrais clients.',
                'Passage d’une logique “faire marcher une fonctionnalité” à une logique de fiabilité système.',
            ],
        },
        {
            id: '03',
            title: 'Croissance professionnelle',
            subtitle: 'Développeur Full-Stack — Educanet — juil 2025 à présent',
            points: [
                'Contribution aux décisions d’architecture et amélioration de l’organisation du code en équipe.',
                'Travail dans un contexte plus structuré, plus sécurisé et orienté performance.',
                'Première exposition au déploiement en production via Apache Tomcat (WAR).',
            ],
        },
        {
            id: '04',
            title: 'Curiosité vers ownership',
            subtitle: 'Laboratoire de déploiement personnel',
            points: [
                'Redéploiement répété d’une application pour comprendre le comportement en production.',
                'Expérimentation des reverse proxies, configurations serveur, conteneurisation et orchestration Docker.',
                'Transformation de la curiosité en vision cycle de vie complète : architecture, déploiement et exploitation.',
            ],
        },
    ];

    phases(): AboutPhase[] {
        return this.i18n.lang() === 'fr' ? this.phasesFr : this.phasesEn;
    }
}
