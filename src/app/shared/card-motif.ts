import { Component, computed, input } from '@angular/core';

/** The little looping animation at the top of each home-page card. */
@Component({
  selector: 'app-card-motif',
  template: `
    <div class="motif" [style.--a]="accent()">
      @switch (slug()) {
        @case ('friendmap') {
          <div class="fill grid-bg">
            @for (d of [0, 1, 2]; track d) {
              <span class="wander" [class]="'p' + d" [style.animation-delay]="-d * 2 + 's'">
                @if (d < 2) { <i class="ping dot"></i> }
                <i class="dot" [class.off]="d === 2"></i>
              </span>
            }
            <span class="mono tag">2 friends live</span>
          </div>
        }
        @case ('albumy') {
          <div class="fill cols-4">
            @for (i of eight; track i) {
              <span class="photo" [style.animation-delay]="i * 0.4 + 's'" [style.background]="shades()[i % 3]"></span>
            }
          </div>
        }
        @case ('mall-os') {
          <div class="fill plan">
            <span class="unit" style="grid-column: span 2"></span>
            <span class="unit" style="animation-delay: -1s"></span>
            <span class="unit" style="grid-column: span 2; animation-delay: -3s"></span>
            <span class="corridor"></span>
            <span class="unit" style="animation-delay: -2s"></span>
            <span class="unit" style="grid-column: span 3; animation-delay: -4s"></span>
            <span class="unit" style="animation-delay: -5s"></span>
          </div>
        }
        @case ('swiftdeliver') {
          <div class="fill grid-bg route">
            <svg viewBox="0 0 350 190" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
              <path d="M20 140 C 90 140, 90 40, 170 60 S 260 130, 330 40" fill="none" stroke="var(--a)" stroke-width="3" stroke-dasharray="6 8" />
              <circle cx="330" cy="40" r="8" fill="none" stroke="var(--a)" stroke-width="3" />
            </svg>
            <div class="track"><span class="rider"></span></div>
          </div>
        }
        @case ('insighthub') {
          <div class="fill csv mono">
            @for (c of csv; track c.name; let i = $index) {
              <div class="col">
                <b>{{ c.name }}</b><span>{{ c.a }}</span><span>{{ c.b }}</span>
                <em class="role" [style.animation-delay]="i * 0.6 + 's'">→ {{ c.role }}</em>
              </div>
            }
          </div>
        }
        @case ('bookpro') {
          <div class="fill slots">
            @for (s of slots; track $index) {
              <span [class.slot]="s >= 0" [style.animation-delay]="s + 's'"></span>
            }
          </div>
        }
        @case ('car-rental') {
          <div class="fill rows">
            @for (r of rentals; track r.car) {
              <div class="row">
                <span class="mono">{{ r.car }}</span>
                <div class="lane" [style.padding-left]="r.offset"><i class="bar" [style.width]="r.width" [style.animation-delay]="r.delay"></i></div>
              </div>
            }
          </div>
        }
        @case ('sportclub') {
          <div class="fill rows">
            @for (r of roster; track $index) {
              <div class="row"><i class="box" [class.check]="r.on" [style.animation-delay]="r.delay"></i><i class="name" [style.width]="r.w"></i></div>
            }
          </div>
        }
        @case ('reachflow') {
          <div class="fill mail">
            @for (i of [0, 1, 2]; track i) {
              <svg class="env" [style.animation-delay]="i + 's'" width="34" height="24" viewBox="0 0 34 24" fill="none" stroke="var(--a)" stroke-width="2" aria-hidden="true">
                <rect x="1" y="1" width="32" height="22" rx="3" /><path d="M1 3 L17 14 L33 3" />
              </svg>
            }
            <span class="mono inbox">inbox</span>
          </div>
        }
      }
    </div>
  `,
  styles: `
    .motif { position: relative; height: 190px; background: var(--surface-2); overflow: hidden; }
    .fill { position: absolute; inset: 0; }
    .tag { position: absolute; right: 14px; bottom: 12px; font-size: 12px; color: var(--a); }
    /* friendmap */
    .wander { position: absolute; width: 14px; height: 14px; animation: wander 7s ease-in-out infinite; }
    .p0 { left: 30%; top: 40%; } .p1 { left: 62%; top: 30%; } .p2 { left: 48%; top: 62%; }
    .dot { position: absolute; inset: 0; border-radius: 50%; background: var(--a); border: 2px solid var(--bg); }
    .dot.ping { border: 0; }
    .dot.off { background: #5A4F44; }
    @keyframes wander { 0%,100% { transform: translate(0,0); } 25% { transform: translate(28px,-14px); } 50% { transform: translate(10px,22px); } 75% { transform: translate(-22px,6px); } }
    /* albumy */
    .cols-4 { display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; padding: 22px; }
    .photo { border-radius: 8px; animation: drop 5s ease infinite both; }
    @keyframes drop { 0% { opacity: 0; transform: translateY(-40px) rotate(-8deg); } 12%,85% { opacity: 1; transform: none; } 100% { opacity: 0; } }
    /* mall os */
    .plan { display: grid; grid-template-columns: repeat(5, 1fr); grid-template-rows: repeat(3, 1fr); gap: 6px; padding: 22px; }
    .unit { border-radius: 4px; animation: lease 6s linear infinite; }
    .corridor { grid-column: span 5; border-radius: 4px; background: var(--line); }
    @keyframes lease { 0%,30% { background: #2E7D5B; } 35%,65% { background: #C98A22; } 70%,100% { background: #A8423A; } }
    /* swiftdeliver */
    .route svg { position: absolute; inset: 0; width: 100%; height: 100%; }
    .track { position: absolute; left: 50%; top: 0; width: 350px; height: 190px; transform: translateX(-50%); }
    .rider { position: absolute; width: 16px; height: 16px; margin: -8px; border-radius: 50%; background: var(--a); border: 3px solid var(--bg);
      offset-path: path('M20 140 C 90 140, 90 40, 170 60 S 260 130, 330 40'); offset-rotate: 0deg; animation: ride 4s ease-in-out infinite alternate; }
    @keyframes ride { from { offset-distance: 0%; } to { offset-distance: 100%; } }
    /* insighthub */
    .csv { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; padding: 22px; font-size: 12px; color: var(--text-4); }
    .col { display: flex; flex-direction: column; gap: 6px; }
    .col b { color: var(--text-2); font-weight: 400; }
    .role { margin-top: 6px; padding: 4px 8px; border-radius: 6px; background: var(--a); color: #120E1F; font-style: normal; opacity: 0; animation: show 5s ease infinite; align-self: flex-start; }
    @keyframes show { 0%,100% { opacity: 0; } 8%,92% { opacity: 1; } }
    /* bookpro */
    .slots { display: grid; grid-template-columns: repeat(5, 1fr); grid-template-rows: repeat(4, 1fr); gap: 6px; padding: 22px; }
    .slots span { border-radius: 6px; background: var(--line); }
    .slots .slot { animation: book 5s ease infinite; }
    @keyframes book { 0%,15% { background: var(--line); } 25%,85% { background: var(--a); } 100% { background: var(--line); } }
    /* car rental + sportclub */
    .rows { display: flex; flex-direction: column; justify-content: space-between; padding: 26px 22px; }
    .row { display: flex; align-items: center; gap: 12px; }
    .row .mono { width: 46px; font-size: 11px; color: var(--text-4); }
    .lane { flex: 1; height: 16px; border-radius: 4px; background: var(--line); }
    .bar { display: block; height: 100%; border-radius: 4px; background: var(--a); transform-origin: left; animation: grow 4.5s ease-in-out infinite; }
    @keyframes grow { 0% { transform: scaleX(0); } 40%,90% { transform: scaleX(1); } 100% { transform: scaleX(0); } }
    .box { width: 18px; height: 18px; border-radius: 6px; border: 2px solid #5A4F44; flex: none; }
    .box.check { animation: tick 4s ease infinite; }
    @keyframes tick { 0%,20% { background: transparent; border-color: #5A4F44; } 30%,90% { background: var(--a); border-color: var(--a); } 100% { background: transparent; } }
    .name { height: 10px; border-radius: 5px; background: var(--line-2); }
    /* reachflow */
    .mail { display: flex; flex-direction: column; justify-content: center; gap: 18px; padding-left: 20px; }
    .env { animation: fly 3s linear infinite both; }
    @keyframes fly { 0% { transform: translateX(-30px); opacity: 0; } 15%,80% { opacity: 1; } 100% { transform: translateX(250px); opacity: 0; } }
    .inbox { position: absolute; right: 18px; top: 50%; transform: translateY(-50%); padding: 10px 12px; border: 1px dashed var(--a); border-radius: 10px; font-size: 12px; color: var(--a); }
  `,
})
export class CardMotif {
  slug = input.required<string>();
  accent = input.required<string>();

  eight = [0, 1, 2, 3, 4, 5, 6, 7];
  shades = computed(() => [this.accent(), this.accent() + 'AA', this.accent() + '66']);
  csv = [
    { name: 'col_a', a: '2024-03-01', b: '2024-03-02', role: 'date' },
    { name: 'col_b', a: '12.500', b: '8.900', role: 'price' },
    { name: 'col_c', a: 'Sousse', b: 'Tunis', role: 'city' },
  ];
  // -1 = empty slot, otherwise the animation delay in seconds
  slots = [0, 0.5, -1, 1.5, -1, -1, 2, 0.8, -1, 2.5, 1.2, -1, 3, 0.3, -1, -1, 1.8, -1, 2.2, 3.4];
  rentals = [
    { car: 'CAR 1', offset: '0', width: '60%', delay: '0s' },
    { car: 'CAR 2', offset: '30%', width: '70%', delay: '.6s' },
    { car: 'CAR 3', offset: '0', width: '35%', delay: '1.2s' },
    { car: 'CAR 4', offset: '15%', width: '50%', delay: '1.8s' },
  ];
  roster = [
    { on: true, w: '55%', delay: '0s' },
    { on: true, w: '40%', delay: '.7s' },
    { on: false, w: '62%', delay: '0s' },
    { on: true, w: '48%', delay: '1.4s' },
  ];
}
