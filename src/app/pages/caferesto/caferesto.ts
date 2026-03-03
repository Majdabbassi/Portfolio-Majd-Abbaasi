import { Component, HostListener, OnInit, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FadeInDirective } from '../../directives/fade-in.directive';
import { I18nService } from '../../core/i18n.service';

@Component({
  selector: 'app-caferesto',
  standalone: true,
  imports: [FadeInDirective, RouterLink],
  templateUrl: './caferesto.html',
  styleUrl: './caferesto.css',
})
export class CaferestoComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  readonly i18n = inject(I18nService);

  lightboxImage: string | null = null;
  lightboxAlt = '';
  focusMode = false;

  ngOnInit(): void {
    const fromQuery = this.route.snapshot.queryParamMap.get('focus') === '1';
    const fromSession = sessionStorage.getItem('portfolioProjectFocus') === '1';

    this.focusMode = fromQuery || fromSession;

    if (this.focusMode) {
      sessionStorage.removeItem('portfolioProjectFocus');
    }
  }

  tr(en: string, fr: string): string {
    return this.i18n.lang() === 'fr' ? fr : en;
  }

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
