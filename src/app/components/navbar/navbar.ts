import { Component, HostListener, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AppLang, I18nService } from '../../core/i18n.service';
import { ThemeService } from '../../core/theme.service';

@Component({
    selector: 'app-navbar',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './navbar.html',
    styleUrl: './navbar.css',
})
export class NavbarComponent {
    private router = inject(Router);
    readonly i18n = inject(I18nService);
    readonly theme = inject(ThemeService);

    isScrolled = signal(false);
    isMobileMenuOpen = signal(false);

    navLinks = [
        { labelKey: 'nav.about', href: '#about', fragment: 'about' },
        { labelKey: 'nav.projects', href: '#projects', fragment: 'projects' },
        { labelKey: 'nav.contact', href: '#contact', fragment: 'contact' },
    ];

    toggleLanguage(): void {
        this.i18n.toggleLang();
    }

    toggleTheme(): void {
        this.theme.toggleTheme();
    }

    setLanguage(lang: AppLang): void {
        this.i18n.setLang(lang);
    }

    currentLang(): 'en' | 'fr' {
        return this.i18n.lang();
    }

    isDarkMode(): boolean {
        return this.theme.theme() === 'dark';
    }

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
