import { Component, HostListener } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FadeInDirective } from '../../directives/fade-in.directive';

@Component({
  selector: 'app-caferesto',
  standalone: true,
  imports: [FadeInDirective, RouterLink],
  templateUrl: './caferesto.html',
  styleUrl: './caferesto.css',
})
export class CaferestoComponent {
  lightboxImage: string | null = null;
  lightboxAlt = '';

  openLightbox(src: string, alt: string): void {
    this.lightboxImage = src;
    this.lightboxAlt = alt;
    document.body.style.overflow = 'hidden';
  }

  closeLightbox(): void {
    this.lightboxImage = null;
    this.lightboxAlt = '';
    document.body.style.overflow = '';
  }

  @HostListener('document:keydown.escape')
  onEscKey(): void {
    if (this.lightboxImage) this.closeLightbox();
  }
}
