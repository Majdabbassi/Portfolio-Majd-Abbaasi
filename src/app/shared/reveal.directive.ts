import { Directive, ElementRef, OnDestroy, OnInit, inject } from '@angular/core';

/** Fades an element in when it scrolls into view. Usage: <section appReveal> */
@Directive({ selector: '[appReveal]', host: { class: 'reveal' } })
export class RevealDirective implements OnInit, OnDestroy {
  private el = inject(ElementRef<HTMLElement>);
  private io?: IntersectionObserver;

  ngOnInit() {
    const node = this.el.nativeElement as HTMLElement;
    if (typeof IntersectionObserver === 'undefined') { node.classList.add('is-visible'); return; }
    this.io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting) { node.classList.add('is-visible'); this.io?.disconnect(); }
      }
    }, { threshold: 0.12 });
    this.io.observe(node);
  }

  ngOnDestroy() { this.io?.disconnect(); }
}
