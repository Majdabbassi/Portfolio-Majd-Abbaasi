import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-hero',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './hero.html',
    styleUrl: './hero.css',
})
export class HeroComponent implements OnDestroy {
    private typingTimer: ReturnType<typeof setTimeout> | null = null;

    socialLinks = [
        { label: 'GitHub', icon: 'github', href: 'https://github.com/Majdabbassi', id: 'hero-github' },
        { label: 'LinkedIn', icon: 'linkedin', href: 'https://www.linkedin.com/in/majd-abbassi', id: 'hero-linkedin' },
        { label: 'Email', icon: 'email', href: 'mailto:majdabbassi11@gmail.com', id: 'hero-email' },
    ];

    ngOnDestroy(): void {
        if (this.typingTimer) clearTimeout(this.typingTimer);
    }

    scrollToProjects(): void {
        document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
    }

    scrollToContact(): void {
        document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
    }
}
