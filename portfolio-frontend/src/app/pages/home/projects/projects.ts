import {
  ChangeDetectorRef,
  Component,
  inject
} from '@angular/core';

import { RouterLink } from '@angular/router';

import { Api } from '../../../core/services/api';
import { Project } from '../../../models/project.model';

@Component({
  selector: 'app-projects',
  imports: [RouterLink],
  templateUrl: './projects.html',
  styleUrl: './projects.css'
})
export class Projects {

  private api = inject(Api);
  private cdr = inject(ChangeDetectorRef);

  projects: Project[] = [];

  constructor() {
    this.loadProjects();
  }

  loadProjects(): void {

    this.api.getFeaturedProjects().subscribe({

      next: (data) => {

        this.projects = data;

        this.cdr.markForCheck();
      },

      error: (error) => {

        console.error(
          'Failed to load projects:',
          error
        );

        this.cdr.markForCheck();
      }

    });
  }

  getTechStack(techStack: string): string[] {

    return techStack
      .split(',')
      .map(tech => tech.trim());
  }
}