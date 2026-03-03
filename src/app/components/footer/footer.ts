import { Component, inject } from '@angular/core';
import { I18nService } from '../../core/i18n.service';

@Component({
    selector: 'app-footer',
    standalone: true,
    templateUrl: './footer.html',
    styleUrl: './footer.css',
})
export class FooterComponent {
    readonly i18n = inject(I18nService);
    currentYear = new Date().getFullYear();

    scrollToTop(): void {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}
