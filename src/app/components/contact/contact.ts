import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FadeInDirective } from '../../directives/fade-in.directive';
import { I18nService } from '../../core/i18n.service';

@Component({
    selector: 'app-contact',
    standalone: true,
    imports: [CommonModule, FadeInDirective],
    templateUrl: './contact.html',
    styleUrl: './contact.css',
})
export class ContactComponent {
    readonly i18n = inject(I18nService);

    socialLinks = [
        {
            id: 'contact-email',
            label: 'Email',
            value: 'majdabbassi11@gmail.com',
            href: 'mailto:majdabbassi11@gmail.com',
            icon: 'email',
        },
        {
            id: 'contact-github',
            label: 'GitHub',
            value: 'github.com/Majdabbassi',
            href: 'https://github.com/Majdabbassi',
            icon: 'github',
        },
        {
            id: 'contact-linkedin',
            label: 'LinkedIn',
            value: 'linkedin.com/in/majd-abbassi',
            href: 'https://www.linkedin.com/in/majd-abbassi',
            icon: 'linkedin',
        },
    ];

    getLabel(label: string): string {
        if (this.i18n.lang() === 'fr') {
            if (label === 'Email') return 'Email';
            if (label === 'GitHub') return 'GitHub';
            if (label === 'LinkedIn') return 'LinkedIn';
        }
        return label;
    }
}
