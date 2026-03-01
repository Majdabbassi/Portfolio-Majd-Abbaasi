import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FadeInDirective } from '../../directives/fade-in.directive';

@Component({
    selector: 'app-contact',
    standalone: true,
    imports: [CommonModule, FadeInDirective],
    templateUrl: './contact.html',
    styleUrl: './contact.css',
})
export class ContactComponent {
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
}
