import { Component, input } from '@angular/core';
import { DiagramTier } from './project-detail';

/** A layered architecture drawing made from the project's own data: tiers of boxes joined by arrows. */
@Component({
  selector: 'app-arch-diagram',
  standalone: true,
  template: `
    <div class="diagram" role="img" [attr.aria-label]="label()">
      @for (tier of tiers(); track $index) {
        @if (!$first) {
          <div class="arrow" aria-hidden="true">↓</div>
        }
        <div class="tier">
          @if (tier.label) {
            <span class="tier-label">{{ tier.label }}</span>
          }
          <div class="nodes">
            @for (node of tier.nodes; track node.name) {
              <div class="node">
                <strong>{{ node.name }}</strong>
                @if (node.sub) {
                  <span>{{ node.sub }}</span>
                }
              </div>
            }
          </div>
        </div>
      }
      @if (note()) {
        <p class="note">{{ note() }}</p>
      }
    </div>
  `,
  styles: [
    `
      .diagram { display: flex; flex-direction: column; align-items: stretch; gap: 0.35rem; padding: 0.5rem 0.25rem; }
      .tier { display: flex; flex-direction: column; gap: 0.35rem; }
      .tier-label { font-size: 0.62rem; letter-spacing: 0.12em; text-transform: uppercase; color: var(--color-muted); }
      .nodes { display: flex; flex-wrap: wrap; gap: 0.5rem; }
      .node { flex: 1 1 8.5rem; display: flex; flex-direction: column; gap: 0.15rem; padding: 0.55rem 0.7rem;
        background: var(--color-surface); border: 1px solid var(--color-border-2); border-radius: 8px; }
      .node strong { font-size: 0.8rem; font-weight: 600; color: var(--color-text); }
      .node span { font-size: 0.68rem; color: var(--color-text-2); line-height: 1.35; }
      .arrow { text-align: center; color: var(--color-accent); font-size: 1rem; line-height: 1; }
      .note { margin: 0.6rem 0 0; font-size: 0.7rem; font-style: italic; color: var(--color-text-2); text-align: center; }
    `,
  ],
})
export class ArchDiagramComponent {
  readonly tiers = input.required<DiagramTier[]>();
  readonly note = input<string>();
  readonly label = input<string>('Architecture');
}
