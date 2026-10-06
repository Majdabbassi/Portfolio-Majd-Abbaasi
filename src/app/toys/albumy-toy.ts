import { Component, signal } from '@angular/core';

interface Photo { id: number; by: string; color: string; }

@Component({
  selector: 'app-albumy-toy',
  template: `
    <div class="panel">
      <div class="panel-head">
        <div class="event">
          <div class="qr" aria-hidden="true"></div>
          <div><div class="panel-title">Demo Wedding</div><div class="mono sub">/e/DEMO01</div></div>
        </div>
        <span class="mono live"><i class="blink"></i>live · {{ photos().length }} photos</span>
      </div>
      <div class="gallery">
        @for (p of photos(); track p.id) {
          <div class="tile" [style.background]="p.color">
            <span class="mono">{{ p.by }}</span><i class="bar"></i>
          </div>
        }
      </div>
      <div class="panel-foot">
        <div class="label">You're a guest — drop a photo from a phone</div>
        <div class="guests">
          @for (g of guests; track g.who) {
            <button type="button" class="toy-btn" (click)="drop(g.who)">{{ g.label }}</button>
          }
        </div>
        <p class="hint">In the real app the photo uploads in 5 MB chunks and shows up on every screen at once.</p>
      </div>
    </div>
  `,
  styles: `
    .event { display: flex; align-items: center; gap: 12px; }
    .qr { width: 40px; height: 40px; border-radius: 6px; border: 4px solid var(--text); background-color: var(--text);
      background-image: linear-gradient(90deg, var(--bg) 50%, transparent 50%), linear-gradient(var(--bg) 50%, transparent 50%); background-size: 12px 12px; }
    .sub { font-size: 12px; color: var(--text-3); }
    .live { display: inline-flex; align-items: center; gap: 8px; font-size: 13px; color: var(--accent-soft); }
    .live i { width: 8px; height: 8px; border-radius: 50%; background: var(--accent); }
    .gallery { height: 300px; overflow: hidden; padding: 16px; display: grid; grid-template-columns: repeat(4, 1fr); grid-auto-rows: 84px; gap: 10px; align-content: start; }
    .tile { position: relative; border-radius: 10px; overflow: hidden; animation: drop .55s cubic-bezier(.2,.8,.3,1.2) both; }
    .tile span { position: absolute; left: 6px; bottom: 6px; font-size: 11px; padding: 2px 6px; border-radius: 5px; background: rgba(21,18,15,.75); color: var(--text); }
    .bar { position: absolute; left: 0; top: 0; height: 3px; background: var(--text); animation: chunk .6s ease-out both; }
    @keyframes drop { 0% { opacity: 0; transform: translateY(-36px) rotate(-6deg) scale(.9); } 60% { opacity: 1; transform: translateY(4px) rotate(1deg); } 100% { transform: none; } }
    @keyframes chunk { from { width: 0; } to { width: 100%; } }
    .guests { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; }
    @media (max-width: 480px) { .gallery { grid-template-columns: repeat(3, 1fr); } .guests { grid-template-columns: 1fr; } }
  `,
})
export class AlbumyToy {
  private palette = ['#E8618C', '#B8456B', '#F29BB5', '#D9487A', '#8E3355', '#F6C1D1'];
  private nextId = 4;
  guests = [
    { who: 'Sara', label: "Sara's phone" },
    { who: 'Karim', label: "Karim's phone" },
    { who: 'you', label: 'Your phone' },
  ];
  photos = signal<Photo[]>([
    { id: 1, by: 'Sara', color: '#E8618C' },
    { id: 2, by: 'Karim', color: '#B8456B' },
    { id: 3, by: 'Sara', color: '#F29BB5' },
  ]);

  drop(who: string) {
    this.photos.update((list) => {
      const color = this.palette[(this.nextId) % this.palette.length];
      return [{ id: this.nextId++, by: who, color }, ...list].slice(0, 12);
    });
  }
}
