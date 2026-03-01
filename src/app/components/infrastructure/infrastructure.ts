import { Component } from '@angular/core';
import { FadeInDirective } from '../../directives/fade-in.directive';

@Component({
  selector: 'app-infrastructure',
  standalone: true,
  imports: [FadeInDirective],
  templateUrl: './infrastructure.html',
  styleUrl: './infrastructure.css'
})
export class InfrastructureComponent {}