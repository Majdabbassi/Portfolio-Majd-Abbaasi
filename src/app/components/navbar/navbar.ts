import { Component, HostListener, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
    selector: 'app-navbar',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './navbar.html',
    styleUrl: './navbar.css',
})
export class NavbarComponent {
    private router = inject(Router);

    isScrolled = signal(false);
    isMobileMenuOpen = signal(false);

    navLinks = [
        { label: 'Projects', href: '#projects', fragment: 'projects' },
        { label: 'Infrastructure', href: '#infrastructure', fragment: 'infrastructure' },
        { label: 'Philosophy', href: '#philosophy', fragment: 'philosophy' },
        { label: 'About', href: '#about', fragment: 'about' },
        { label: 'Contact', href: '#contact', fragment: 'contact' },
    ];

    @HostListener('window:scroll')
    onScroll(): void {
        this.isScrolled.set(window.scrollY > 40);
    }

    toggleMobileMenu(): void {
        this.isMobileMenuOpen.update((v) => !v);
    }

    closeMobileMenu(): void {
        this.isMobileMenuOpen.set(false);
    }

    navigateTo(link: { href: string; fragment: string }): void {
        this.closeMobileMenu();

        // If already on the home page, just scroll
        if (this.router.url === '/' || this.router.url.startsWith('/#')) {
            const el = document.querySelector(link.href);
            if (el) el.scrollIntoView({ behavior: 'smooth' });
        } else {
            // Navigate home then scroll after a short delay
            this.router.navigate(['/'], { fragment: link.fragment }).then(() => {
                setTimeout(() => {
                    const el = document.querySelector(link.href);
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                }, 450);
            });
        }
    }

    goHome(): void {
        this.closeMobileMenu();
        if (this.router.url === '/' || this.router.url.startsWith('/#')) {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            this.router.navigate(['/']).then(() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        }
    }
}
