import { Component, inject } from '@angular/core';
import { FadeInDirective } from '../../directives/fade-in.directive';
import { I18nService } from '../../core/i18n.service';

@Component({
    selector: 'app-about',
    standalone: true,
    imports: [FadeInDirective],
    templateUrl: './about.html',
    styleUrl: './about.css',
})
export class AboutComponent {
    readonly i18n = inject(I18nService);
    timeline = [
        {
            year: '2022',
            title: 'Started Computer Science',
            description: 'Began my journey into software engineering, focusing on systems thinking and backend architecture from day one.',
            icon: '🎓',
        },
        {
            year: '2025',
            title: 'Internship at Educanet',
            description: 'Gained hands-on experience with enterprise-grade systems, working on real-world backend services and database optimization.',
            icon: '💼',
        },
        {
            year: '2025',
            title: 'Built Multi-Sport Club Platform',
            description: 'Designed and delivered a full-stack platform with role-based access, real-time messaging, online payments, and Dockerized deployment.',
            icon: '🏗️',
        },
        {
            year: '2025',
            title: 'Hired Full-Time as Full Stack Developer',
            description: 'Joined a product team as a full-time engineer, leading backend architecture decisions and DevOps infrastructure setup.',
            icon: '🚀',
        },
        {
            year: '2028',
            title: 'Engineering Degree Completion',
            description: 'Completing a formal engineering degree while continuing to build production systems and grow as a senior engineer.',
            icon: '🎯',
        },
    ];
}
