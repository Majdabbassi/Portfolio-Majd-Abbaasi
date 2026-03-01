import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FadeInDirective } from '../../directives/fade-in.directive';
import { ProjectDetail, PROJECTS } from '../../data/projects.data';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-project-detail',
  standalone: true,
  imports: [FadeInDirective, RouterLink],
  templateUrl: './project-detail.html',
  styleUrl: './project-detail.css',
})
export class ProjectDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private viewportScroller = inject(ViewportScroller);

  project!: ProjectDetail;
  nextProject: ProjectDetail | null = null;
  prevProject: ProjectDetail | null = null;

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      const index = PROJECTS.findIndex((p) => p.id === id);

      if (index === -1) {
        this.router.navigate(['/']);
        return;
      }

      this.project = PROJECTS[index];
      this.nextProject = PROJECTS[index + 1] ?? PROJECTS[0];
      this.prevProject = index > 0 ? PROJECTS[index - 1] : PROJECTS[PROJECTS.length - 1];
      this.viewportScroller.scrollToPosition([0, 0]);
    });
  }

  getStatusLabel(status: string): string {
    switch (status) {
      case 'production':
        return 'Production';
      case 'case-study':
        return 'Case Study';
      case 'experimental':
        return 'Experimental';
      default:
        return 'Project';
    }
  }
}
