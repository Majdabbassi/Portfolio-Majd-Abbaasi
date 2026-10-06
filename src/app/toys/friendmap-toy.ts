import { Component, computed, signal } from '@angular/core';

type Mode = 'ghost' | 'everyone' | 'selected' | 'except';

@Component({
  selector: 'app-friendmap-toy',
  template: `
    <div class="panel">
      <div class="map grid-bg">
        @for (f of friends(); track f.name) {
          <div class="pin" [style.left]="f.x" [style.top]="f.y" [class.hidden]="!f.visible">
            <div class="dot"><i class="ping"></i><i></i></div>
            <span class="mono">{{ f.name }}</span>
          </div>
        }
        <div class="me"><div class="me-dot"></div><span class="mono">you</span></div>
        <div class="mono status">{{ status() }}</div>
      </div>
      <div class="panel-foot">
        <div class="label">Who can see you? — try it</div>
        <div class="modes">
          @for (m of modes; track m.id) {
            <button type="button" class="toy-btn" [class.is-on]="mode() === m.id" [attr.aria-pressed]="mode() === m.id" (click)="mode.set(m.id)">{{ m.label }}</button>
          }
        </div>
        <p class="hint">These four modes are the same rules the server enforces on every location update.</p>
      </div>
    </div>
  `,
  styles: `
    .map { position: relative; height: 360px; background-color: #141A16; --grid: #26302A; background-size: 32px 32px; }
    .pin { position: absolute; display: flex; flex-direction: column; align-items: center; gap: 6px; transition: opacity .35s ease, transform .35s ease; }
    .pin.hidden { opacity: .12; transform: scale(.85); }
    .dot { position: relative; width: 18px; height: 18px; }
    .dot i { position: absolute; inset: 0; border-radius: 50%; background: var(--accent); }
    .dot i:last-child { border: 3px solid #141A16; }
    .pin span { font-size: 12px; padding: 3px 8px; border-radius: 6px; background: var(--accent-ink); color: #CFEFDC; }
    .me { position: absolute; left: 46%; top: 46%; display: flex; flex-direction: column; align-items: center; gap: 6px; animation: bob 2.4s ease-in-out infinite; }
    .me-dot { width: 26px; height: 26px; border-radius: 50%; background: var(--lamp); border: 4px solid #141A16; box-shadow: 0 0 0 2px var(--lamp); }
    .me span { font-size: 12px; padding: 3px 8px; border-radius: 6px; background: var(--lamp); color: var(--lamp-ink); font-weight: 600; }
    @keyframes bob { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-4px); } }
    .status { position: absolute; left: 16px; top: 16px; padding: 8px 12px; border-radius: 10px; background: rgba(14,31,22,.9); font-size: 13px; color: #CFEFDC; }
    .modes { display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; }
    @media (max-width: 480px) { .modes { grid-template-columns: repeat(2, 1fr); } }
  `,
})
export class FriendmapToy {
  mode = signal<Mode>('everyone');
  modes: { id: Mode; label: string }[] = [
    { id: 'ghost', label: 'Ghost' }, { id: 'everyone', label: 'Everyone' },
    { id: 'selected', label: 'Selected' }, { id: 'except', label: 'Except' },
  ];
  private people = [
    { name: 'Sana', x: '18%', y: '22%', chosen: true },
    { name: 'Youssef', x: '70%', y: '18%', chosen: false },
    { name: 'Lina', x: '76%', y: '64%', chosen: true },
    { name: 'Omar', x: '22%', y: '70%', chosen: false },
    { name: 'Amine', x: '52%', y: '78%', chosen: false },
  ];
  friends = computed(() => {
    const m = this.mode();
    return this.people.map((p) => ({
      ...p,
      visible: m === 'everyone' ? true : m === 'ghost' ? false : m === 'selected' ? p.chosen : !p.chosen,
    }));
  });
  status = computed(() => {
    if (this.mode() === 'ghost') return 'Ghost mode — nobody sees you';
    return `${this.friends().filter((f) => f.visible).length} of 5 friends can see you`;
  });
}
