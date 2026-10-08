import { Component, DestroyRef, ElementRef, afterNextRender, computed, inject, signal } from '@angular/core';
import { SITE } from '../../../data/site.data';
import { I18n, L } from '../../../i18n/i18n';
import { RevealDirective } from '../../../shared/reveal.directive';

type RState = 'up' | 'starting' | 'down';
interface Rep { id: string; ver: 'v1' | 'v2'; st: RState }
interface Line { t: L; cls?: 'ok' | 'bad' | 'warn' }
type Scenario = 'kill' | 'db' | 'proxy';

const N = 32;          // points in the sparkline
const PER_REPLICA = 100; // req/s one replica can take
const l = (en: string, fr: string): L => ({ en, fr });

const T = {
  browser: l('browser', 'navigateur'), proxy: l('reverse proxy', 'proxy inverse'), db: l('database', 'base'),
  reset: l('Reset', 'Réinitialiser'), working: l('Running…', 'En cours…'),
  st: { up: l('healthy', 'sain'), starting: l('starting…', 'démarre…'), down: l('down', 'arrêté') } as Record<RState, L>,
  rps: l('req/s', 'req/s'), p95: l('p95 latency', 'latence p95'), err: l('errors', 'erreurs'), up: l('replicas up', 'réplicas actifs'),
  ok: l('healthy', 'tout va bien'), alert: l('alert firing', 'alerte active'),
  deploy: l('Deploy v2', 'Déployer v2'), bad: l('Deploy a broken build', 'Déployer un build cassé'),
  spike: l('Send a traffic spike', 'Envoyer un pic de trafic'), calm: l('Back to normal', 'Retour à la normale'),
  load: l('Traffic ×3', 'Trafic ×3'), scale: l('Scale to 3 replicas', 'Passer à 3 réplicas'),
  breakIt: l('Break it', 'Casser'),
  scen: { kill: l('Kill a container', 'Tuer un conteneur'), db: l('Database down', 'Base indisponible'), proxy: l('Bad proxy config', 'Mauvaise config proxy') } as Record<Scenario, L>,
  intro: [
    [l('$ docker compose ps', '$ docker compose ps'), l('app-a, app-b · v1 · healthy', 'app-a, app-b · v1 · sains'), l('press “Deploy v2”', 'appuyez sur « Déployer v2 »')],
    [l('$ curl prometheus:9090/api/v1/query', '$ curl prometheus:9090/api/v1/query'), l('p95 38 ms · 0 errors · 80 req/s', 'p95 38 ms · 0 erreur · 80 req/s'), l('press “Send a traffic spike”', 'appuyez sur « Envoyer un pic de trafic »')],
    [l('$ docker compose ps', '$ docker compose ps'), l('1 replica of app · 100 req/s max', '1 réplica de app · 100 req/s max'), l('press “Traffic ×3”, then scale out', 'appuyez sur « Trafic ×3 », puis montez en charge')],
    [l('$ docker compose ps', '$ docker compose ps'), l('2 replicas · db · nginx · all healthy', '2 réplicas · db · nginx · tout est sain'), l('pick a failure, then “Break it”', 'choisissez une panne, puis « Casser »')],
  ] as L[][],
};

/** The DevOps Lab: a small system (nginx → replicas → db) you can deploy, watch, scale and break. All simulated. */
@Component({
  selector: 'app-lab',
  imports: [RevealDirective],
  template: `
    <section class="container lab" id="lab">
      <div class="copy" appReveal>
        <div class="eyebrow">{{ i18n.tr(site.lab.eyebrow) }}</div>
        <h2>{{ i18n.tr(site.lab.title) }}</h2>
        <p class="sub">{{ i18n.tr(site.lab.subtitle) }}</p>
        <p class="txt">{{ i18n.tr(site.lab.text) }}</p>
        <p class="txt focus">{{ i18n.tr(site.lab.focus) }}</p>
        <div class="progress" aria-hidden="true">@for (it of site.lab.items; track $index; let i = $index) { <span [class.on]="i <= tab()"></span> }</div>
        <div class="learned">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M9 18h6M10 22h4M12 2a7 7 0 0 0-4 12.7V17h8v-2.3A7 7 0 0 0 12 2z" /></svg>
          <p>{{ i18n.tr(site.lab.footer) }}</p>
        </div>
      </div>

      <div class="console" appReveal #box>
        <div class="term-bar" aria-hidden="true"><i style="background: #E2685B"></i><i style="background: #E9B44C"></i><i style="background: #6BD49A"></i><span class="mono">~/lab — {{ i18n.tr(site.lab.handsOn) }}</span></div>
        <div class="tabs" role="tablist" [attr.aria-label]="i18n.tr(site.lab.title)">
          @for (it of site.lab.items; track $index; let i = $index) {
            <button type="button" role="tab" class="tab" [class.on]="tab() === i" [attr.aria-selected]="tab() === i" (click)="pick(i)"><b class="mono">0{{ i + 1 }}</b>{{ i18n.tr(it) }}</button>
          }
        </div>

        <div class="diagram">
          <span class="node">{{ i18n.tr(t.browser) }}</span><span class="wire"></span>
          <span class="node" [class]="'node ' + (proxyBad() ? 'down' : 'hot')">nginx<small>{{ i18n.tr(t.proxy) }}</small></span><span class="wire" [class.cut]="upCount() === 0"></span>
          <span class="box" data-label="docker compose">
            <span class="reps">
              @for (r of reps(); track r.id) {
                <span [class]="'node ' + repCls(r)">app-{{ r.id }}<small>{{ r.ver }} · {{ i18n.tr(t.st[r.st]) }}</small></span>
              }
            </span>
          </span>
          <span class="wire" [class.cut]="!dbUp()"></span>
          <span class="node" [class]="'node ' + (dbUp() ? 'ok' : 'down')">db<small>{{ dbUp() ? 'postgres' : i18n.tr(t.st.down) }}</small></span>
        </div>

        <div class="metrics" [class.alerting]="alerting()">
          <div class="tile"><small class="mono">{{ i18n.tr(t.rps) }}</small><strong>{{ traffic() }}</strong></div>
          <div class="tile"><small class="mono">{{ i18n.tr(t.p95) }}</small><strong>{{ latency() === null ? '—' : latency() + ' ms' }}</strong></div>
          <div class="tile" [class.bad]="errPct() > 5"><small class="mono">{{ i18n.tr(t.err) }}</small><strong>{{ errPct() }}%</strong></div>
          <div class="tile"><small class="mono">{{ i18n.tr(t.up) }}</small><strong>{{ upCount() }}/{{ reps().length }}</strong></div>
          <div class="spark">
            <svg viewBox="0 0 120 36" preserveAspectRatio="none" aria-hidden="true"><polyline [attr.points]="spark()" /></svg>
            <span class="chip mono" [class.bad]="alerting()"><i></i>{{ alerting() ? i18n.tr(t.alert) : i18n.tr(t.ok) }}</span>
          </div>
        </div>

        <ul class="log mono" aria-live="polite">
          @for (x of log(); track x.n) {
            <li [class]="x.l.cls ? 'lg-' + x.l.cls : ''">{{ i18n.tr(x.l.t) }}</li>
          }
        </ul>

        <div class="foot">
          <span class="mono hint">{{ i18n.tr(site.lab.foot[tab()]) }}</span>
          <div class="actions">
            @switch (tab()) {
              @case (0) {
                <button type="button" class="act" [disabled]="busy()" (click)="deploy(false)">{{ busy() ? i18n.tr(t.working) : i18n.tr(t.deploy) }}</button>
                <button type="button" class="act ghost" [disabled]="busy()" (click)="deploy(true)">{{ i18n.tr(t.bad) }}</button>
              }
              @case (1) {
                <button type="button" class="act" (click)="toggleSpike()">{{ traffic() > 150 ? i18n.tr(t.calm) : i18n.tr(t.spike) }}</button>
              }
              @case (2) {
                <button type="button" class="act ghost" [disabled]="busy() || traffic() > 150" (click)="setLoad()">{{ i18n.tr(t.load) }}</button>
                <button type="button" class="act" [disabled]="busy() || reps().length > 1" (click)="scaleOut()">{{ i18n.tr(t.scale) }}</button>
              }
              @default {
                <div class="seg" role="group">
                  @for (s of scenarios; track s) {
                    <button type="button" [class.on]="scenario() === s" [attr.aria-pressed]="scenario() === s" [disabled]="busy()" (click)="scenario.set(s)">{{ i18n.tr(t.scen[s]) }}</button>
                  }
                </div>
                <button type="button" class="act" [disabled]="busy()" (click)="breakIt()">{{ busy() ? i18n.tr(t.working) : i18n.tr(t.breakIt) }}</button>
              }
            }
            <button type="button" class="act ghost small" [disabled]="busy()" (click)="pick(tab())" [attr.aria-label]="i18n.tr(t.reset)" [attr.title]="i18n.tr(t.reset)">↺</button>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: `
    .lab { padding: 88px 0 96px; border-top: 1px solid var(--line); display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 420px), 1fr)); gap: 56px; align-items: center; }
    .copy { display: flex; flex-direction: column; gap: 16px; }
    .eyebrow { color: var(--lamp-text); }
    h2 { margin: 0; font-size: clamp(36px, 4.5vw, 54px); font-weight: 800; letter-spacing: -.025em; line-height: 1.04; }
    .sub { margin: 0; color: var(--lamp-text); font-weight: 600; font-size: 18px; }
    .txt { margin: 0; color: var(--text-2); font-size: 17px; line-height: 1.65; max-width: 520px; }
    .txt.focus { color: var(--text-3); font-size: 16px; }
    .learned { margin: 8px 0 0; padding: 18px 20px; border-radius: 16px; background: var(--surface); border: 1px solid var(--line-2); display: flex; gap: 14px; align-items: flex-start; }
    .learned svg { flex: none; color: var(--lamp-text); margin-top: 2px; }
    .learned p { margin: 0; color: var(--text-2); font-size: 16px; line-height: 1.55; font-style: italic; }
    .progress { display: flex; gap: 6px; margin-top: 6px; }
    .progress span { flex: 1; height: 6px; border-radius: 3px; background: var(--line-2); transition: background .4s ease; }
    .progress span.on { background: var(--lamp); }
    .console { background: var(--surface); border: 1px solid var(--line-2); border-radius: 22px; overflow: hidden; box-shadow: 0 28px 70px var(--shadow); min-width: 0; }
    .term-bar { display: flex; align-items: center; gap: 8px; padding: 14px 18px; border-bottom: 1px solid var(--line-2); }
    .term-bar i { width: 12px; height: 12px; border-radius: 50%; }
    .term-bar span { margin-left: 10px; font-size: 13px; color: var(--text-4); }
    .tabs { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); border-bottom: 1px solid var(--line-2); }
    .tab { min-height: 56px; padding: 8px 10px; border: 0; border-right: 1px solid var(--line-2); background: transparent; color: var(--text-3); font: 500 13px var(--font); cursor: pointer; text-align: left; display: flex; flex-direction: column; gap: 2px; transition: background .25s ease, color .25s ease; }
    .tab:last-child { border-right: 0; }
    .tab b { font-size: 11px; font-weight: 600; color: var(--text-4); }
    .tab:hover { color: var(--text); }
    .tab.on { background: var(--lamp-soft); color: var(--text); box-shadow: inset 0 -3px 0 var(--lamp); }
    .tab.on b { color: var(--lamp-text); }
    .diagram { display: flex; align-items: center; justify-content: center; flex-wrap: wrap; padding: 22px 14px 18px; min-height: 150px; }
    .node { display: flex; flex-direction: column; align-items: center; gap: 3px; padding: 10px 12px; border-radius: 12px; border: 1px solid var(--line-3); background: var(--surface-2); font: 500 12px var(--mono); color: var(--text-2); min-width: 84px; text-align: center; transition: border-color .4s ease, background .4s ease, color .4s ease; }
    .node small { font-size: 10px; color: var(--text-4); }
    .node.hot { border-color: var(--lamp); background: var(--lamp-soft); color: var(--text); }
    .node.ok { border-color: var(--ok-text); background: color-mix(in oklab, var(--ok-text) 14%, transparent); color: var(--text); }
    .node.warn { border-color: var(--lamp); border-style: dashed; background: var(--lamp-soft); color: var(--text); }
    .node.down { border-color: var(--bad); background: color-mix(in oklab, var(--bad) 16%, transparent); color: var(--bad); animation: shake .4s ease 2; }
    .node.wait { border-style: dashed; border-color: var(--lamp); animation: blink .8s steps(1) infinite; }
    .wire { width: 34px; height: 2px; background-image: linear-gradient(90deg, var(--lamp) 50%, transparent 50%); background-size: 10px 2px; animation: flow .6s linear infinite; }
    .wire.cut { background-image: linear-gradient(90deg, var(--bad) 50%, transparent 50%); animation: none; opacity: .6; }
    .box { position: relative; display: flex; align-items: center; padding: 22px 10px 10px; border-radius: 14px; border: 1px dashed var(--line-3); }
    .box::before { content: attr(data-label); position: absolute; top: 6px; left: 10px; font: 500 10px var(--mono); color: var(--text-4); }
    .reps { display: flex; flex-direction: column; gap: 6px; }
    .metrics { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)) minmax(0, 1.6fr); gap: 8px; padding: 12px 16px; border-top: 1px dashed var(--line-3); align-items: stretch; transition: background .4s ease; }
    .metrics.alerting { background: color-mix(in oklab, var(--bad) 7%, transparent); }
    .tile { display: flex; flex-direction: column; gap: 2px; padding: 8px 10px; border-radius: 10px; background: var(--surface-2); min-width: 0; }
    .tile small { font-size: 10px; color: var(--text-4); text-transform: uppercase; letter-spacing: .04em; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
    .tile strong { font-size: 17px; font-weight: 700; letter-spacing: -.01em; white-space: nowrap; }
    .tile.bad strong { color: var(--bad); }
    .spark { position: relative; border-radius: 10px; background: var(--surface-2); overflow: hidden; min-height: 52px; }
    .spark svg { position: absolute; inset: 6px 8px 20px; width: calc(100% - 16px); height: calc(100% - 26px); }
    .spark polyline { fill: none; stroke: var(--lamp); stroke-width: 1.6; vector-effect: non-scaling-stroke; stroke-linejoin: round; }
    .alerting .spark polyline { stroke: var(--bad); }
    .chip { position: absolute; left: 8px; bottom: 4px; display: inline-flex; align-items: center; gap: 6px; font-size: 10px; color: var(--ok-text); }
    .chip i { width: 7px; height: 7px; border-radius: 50%; background: currentColor; }
    .chip.bad { color: var(--bad); }
    .chip.bad i { animation: blink .8s steps(1) infinite; }
    .log { margin: 0; padding: 12px 18px 14px; border-top: 1px dashed var(--line-3); list-style: none; display: flex; flex-direction: column; gap: 5px; font-size: 12.5px; color: var(--text-2); min-height: 132px; justify-content: flex-end; }
    .log li { animation: log-in .3s ease both; white-space: pre-wrap; }
    .lg-ok { color: var(--ok-text); } .lg-bad { color: var(--bad); } .lg-warn { color: var(--lamp-text); }
    .foot { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 10px; padding: 12px 16px 16px; border-top: 1px solid var(--line-2); }
    .hint { font-size: 12px; color: var(--text-4); }
    .actions { display: flex; flex-wrap: wrap; align-items: center; gap: 8px; }
    .act { min-height: 44px; padding: 0 14px; border-radius: 12px; border: 1px solid var(--lamp); background: var(--lamp); color: var(--lamp-ink); font: 600 14px var(--font); cursor: pointer; transition: transform .15s ease, opacity .2s ease; }
    .act:hover:not(:disabled) { transform: translateY(-1px); }
    .act.ghost { background: transparent; color: var(--lamp-text); }
    .act.small { min-width: 44px; padding: 0; font-size: 18px; border-color: var(--line-3); color: var(--text-3); }
    .act:disabled { opacity: .5; cursor: default; }
    .seg { display: flex; border: 1px solid var(--line-3); border-radius: 12px; overflow: hidden; }
    .seg button { min-height: 42px; padding: 0 10px; border: 0; background: transparent; color: var(--text-2); font: 600 12.5px var(--font); cursor: pointer; transition: background .25s ease, color .25s ease; }
    .seg button.on { background: var(--lamp); color: var(--lamp-ink); }
    .seg button:disabled { cursor: default; }
    @keyframes log-in { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: none; } }
    @keyframes flow { to { background-position: 20px 0; } }
    @keyframes blink { 50% { opacity: .4; } }
    @keyframes shake { 0%, 100% { transform: none; } 25% { transform: translateX(-3px); } 75% { transform: translateX(3px); } }
    @media (prefers-reduced-motion: reduce) { .log li { animation: none; } }
    @media (max-width: 640px) {
      .lab { padding: 56px 0 64px; }
      .tabs { grid-template-columns: repeat(2, minmax(0, 1fr)); }
      .wire { width: 16px; }
      .node { min-width: 64px; padding: 8px 8px; }
      .metrics { grid-template-columns: repeat(2, minmax(0, 1fr)); }
      .spark { grid-column: 1 / -1; }
    }
  `,
})
export class Lab {
  i18n = inject(I18n);
  site = SITE;
  t = T;
  private destroy = inject(DestroyRef);
  private host = inject(ElementRef<HTMLElement>);

  tab = signal(0);
  reps = signal<Rep[]>([]);
  traffic = signal(80);
  dbUp = signal(true);
  proxyBad = signal(false);
  busy = signal(false);
  scenario = signal<Scenario>('kill');
  scenarios: Scenario[] = ['kill', 'db', 'proxy'];
  log = signal<{ n: number; l: Line }[]>([]);
  private hist = signal<number[]>(Array(N).fill(40));
  private timers: ReturnType<typeof setTimeout>[] = [];
  private lines = 0;
  private wasAlert = false;
  private visible = true;

  // ---------- the numbers (derived from the state of the system) ----------
  upCount = computed(() => this.reps().filter((r) => r.st === 'up').length);
  errPct = computed(() => {
    if (!this.dbUp() || this.upCount() === 0) return 100;
    const r = this.traffic() / (this.upCount() * PER_REPLICA);
    return r > 1 ? Math.min(60, Math.round((r - 1) * 40)) : 0;
  });
  latency = computed(() => {
    if (!this.dbUp() || this.upCount() === 0) return null;
    const r = Math.min(this.traffic() / (this.upCount() * PER_REPLICA), 1.8);
    return Math.round(38 + 90 * r * r * r);
  });
  alerting = computed(() => this.errPct() > 5 || (this.latency() ?? 999) > 250);
  spark = computed(() => this.hist().map((v, i) => ((i / (N - 1)) * 120).toFixed(1) + ',' + (34 - (Math.min(v, 600) / 600) * 32).toFixed(1)).join(' '));

  constructor() {
    this.pick(0);
    afterNextRender(() => {
      const tick = setInterval(() => this.sample(), 700);
      const io = new IntersectionObserver(([e]) => (this.visible = e.isIntersecting), { threshold: 0.05 });
      io.observe(this.host.nativeElement);
      this.destroy.onDestroy(() => { clearInterval(tick); io.disconnect(); });
    });
    this.destroy.onDestroy(() => this.clear());
  }

  repCls(r: Rep) { return r.st === 'down' ? 'down' : r.st === 'starting' ? 'wait' : !this.dbUp() ? 'warn' : 'ok'; }

  /** Switching tab (or ↺) puts the system back to that tab's starting point. */
  pick(i: number) {
    this.clear();
    this.tab.set(i);
    this.busy.set(false);
    this.dbUp.set(true);
    this.proxyBad.set(false);
    this.traffic.set(80);
    this.reps.set(i === 2 ? [{ id: 'a', ver: 'v1', st: 'up' }] : [{ id: 'a', ver: 'v1', st: 'up' }, { id: 'b', ver: 'v1', st: 'up' }]);
    this.wasAlert = false;
    this.hist.set(Array(N).fill(this.latency() ?? 40));
    this.lines = 0;
    this.log.set(T.intro[i].map((t, k) => ({ n: this.lines++, l: { t, cls: k === 1 ? 'ok' : undefined } })));
  }

  // ---------- 01 · deploy ----------
  deploy(broken: boolean) {
    this.busy.set(true);
    const set = (id: string, patch: Partial<Rep>) => this.reps.update((rs) => rs.map((r) => (r.id === id ? { ...r, ...patch } : r)));
    this.say(l('$ git push → CI: build · test · image v2', '$ git push → CI : build · tests · image v2'));
    this.later(900, () => { this.say(l('rolling update: one replica at a time', 'mise à jour progressive : un réplica à la fois')); set('a', { ver: 'v2', st: 'starting' }); });
    if (!broken) {
      this.later(2200, () => { set('a', { st: 'up' }); this.say(l('app-a v2 passed its health check → gets traffic', 'app-a v2 a passé son health check → reçoit du trafic'), 'ok'); set('b', { ver: 'v2', st: 'starting' }); });
      this.later(3500, () => { set('b', { st: 'up' }); this.say(l('app-b v2 healthy · zero downtime · 0 errors', 'app-b v2 sain · zéro coupure · 0 erreur'), 'ok'); this.busy.set(false); });
    } else {
      this.later(2200, () => { set('a', { st: 'down' }); this.say(l('app-a v2 health check FAILED (migration error)', 'health check d’app-a v2 ÉCHEC (erreur de migration)'), 'bad'); });
      this.later(3200, () => { this.say(l('rollback → v1 · app-b was never touched', 'rollback → v1 · app-b n’a jamais été touché'), 'warn'); set('a', { ver: 'v1', st: 'starting' }); });
      this.later(4300, () => { set('a', { st: 'up' }); this.say(l('app-a v1 healthy · users saw 0 errors', 'app-a v1 sain · les utilisateurs n’ont vu aucune erreur'), 'ok'); this.busy.set(false); });
    }
  }

  // ---------- 02 · monitor ----------
  toggleSpike() {
    const up = this.traffic() <= 150;
    this.traffic.set(up ? 340 : 80);
    this.say(up ? l('$ k6 run spike.js → 340 req/s', '$ k6 run spike.js → 340 req/s') : l('traffic back to 80 req/s', 'le trafic revient à 80 req/s'), up ? 'warn' : 'ok');
  }

  // ---------- 03 · scale ----------
  setLoad() {
    this.traffic.set(260);
    this.say(l('traffic ×3 → 260 req/s on a single replica (max 100)', 'trafic ×3 → 260 req/s sur un seul réplica (max 100)'), 'warn');
  }
  scaleOut() {
    this.busy.set(true);
    this.say(l('$ docker compose up -d --scale app=3', '$ docker compose up -d --scale app=3'));
    this.reps.update((rs) => [...rs, { id: 'b', ver: 'v1', st: 'starting' }, { id: 'c', ver: 'v1', st: 'starting' }]);
    this.later(1500, () => {
      this.reps.update((rs) => rs.map((r) => ({ ...r, st: 'up' as RState })));
      this.say(l('nginx round-robin over 3 replicas → latency drops, errors gone', 'nginx répartit sur 3 réplicas → la latence baisse, plus d’erreurs'), 'ok');
      this.busy.set(false);
    });
  }

  // ---------- 04 · break it ----------
  breakIt() {
    this.busy.set(true);
    const set = (id: string, st: RState) => this.reps.update((rs) => rs.map((r) => (r.id === id ? { ...r, st } : r)));
    switch (this.scenario()) {
      case 'kill':
        this.say(l('$ docker kill app-a', '$ docker kill app-a'));
        this.later(500, () => { set('a', 'down'); this.say(l('app-a exited (137) · nginx drops it from the pool', 'app-a arrêté (137) · nginx le retire du pool'), 'bad'); });
        this.later(1700, () => this.say(l('app-b still serves everything · 0 errors', 'app-b sert tout le trafic · 0 erreur'), 'ok'));
        this.later(2600, () => { set('a', 'starting'); this.say(l('restart: unless-stopped → app-a restarting…', 'restart: unless-stopped → app-a redémarre…'), 'warn'); });
        this.later(3800, () => { set('a', 'up'); this.say(l('app-a healthy again · back in the pool', 'app-a de nouveau sain · de retour dans le pool'), 'ok'); this.busy.set(false); });
        break;
      case 'db':
        this.say(l('$ docker stop db', '$ docker stop db'));
        this.later(500, () => { this.dbUp.set(false); this.say(l('db unreachable → health checks fail → nginx answers 503', 'db injoignable → health checks en échec → nginx répond 503'), 'bad'); });
        this.later(2800, () => this.say(l('restart policy: db restarting…', 'restart policy : db redémarre…'), 'warn'));
        this.later(4000, () => { this.dbUp.set(true); this.say(l('db back · app reconnects with retry + backoff · no restart needed', 'db revenue · l’app se reconnecte (retry + backoff) · sans redémarrage'), 'ok'); this.busy.set(false); });
        break;
      default:
        this.say(l('$ vim nginx.conf   (typo in proxy_pass)', '$ vim nginx.conf   (faute dans proxy_pass)'));
        this.later(700, () => { this.proxyBad.set(true); this.say(l('$ nginx -t → configuration test FAILED', '$ nginx -t → test de configuration ÉCHEC'), 'bad'); });
        this.later(1900, () => this.say(l('reload aborted · the old config keeps serving · 0 errors', 'reload annulé · l’ancienne config continue de servir · 0 erreur'), 'ok'));
        this.later(2800, () => { this.proxyBad.set(false); this.say(l('config fixed · nginx -t ok · reload', 'config corrigée · nginx -t ok · reload'), 'ok'); this.busy.set(false); });
    }
  }

  // ---------- plumbing ----------
  /** Once per tick: record the latency for the sparkline, and log when the alert starts or stops. */
  private sample() {
    if (!this.visible || document.hidden) return;
    const v = (this.latency() ?? 600) + Math.round((Math.random() - 0.5) * 8);
    this.hist.update((h) => [...h.slice(1), Math.max(0, Math.min(600, v))]);
    const a = this.alerting();
    if (a !== this.wasAlert) {
      this.wasAlert = a;
      this.say(a
        ? (this.errPct() > 5 ? l('ALERT HighErrorRate · 5xx > 5 % → Alertmanager → notified', 'ALERTE HighErrorRate · 5xx > 5 % → Alertmanager → notifié')
          : l('ALERT HighLatency · p95 > 250 ms → Alertmanager → notified', 'ALERTE HighLatency · p95 > 250 ms → Alertmanager → notifié'))
        : l('RESOLVED · back within thresholds', 'RÉSOLU · retour sous les seuils'), a ? 'bad' : 'ok');
    }
  }

  private say(t: L, cls?: 'ok' | 'bad' | 'warn') {
    this.log.update((xs) => [...xs.slice(-5), { n: this.lines++, l: { t, cls } }]);
  }
  private later(ms: number, fn: () => void) { this.timers.push(setTimeout(fn, ms)); }
  private clear() { this.timers.forEach(clearTimeout); this.timers = []; }
}
