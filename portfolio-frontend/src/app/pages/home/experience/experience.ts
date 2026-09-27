import {
  ChangeDetectorRef,
  Component,
  inject
} from '@angular/core';

import { Api } from '../../../core/services/api';
import { Experience as ExperienceModel } from '../../../models/experience.model';

@Component({
  selector: 'app-experience',
  imports: [],
  templateUrl: './experience.html',
  styleUrl: './experience.css'
})
export class Experience {

  private api = inject(Api);
  private cdr = inject(ChangeDetectorRef);

  experiences: ExperienceModel[] = [];

  constructor() {
    this.loadExperience();
  }

  loadExperience(): void {

    this.api.getExperience().subscribe({

      next: (data) => {

        this.experiences = data;

        this.cdr.markForCheck();
      },

      error: (error) => {

        console.error(
          'Failed to load experience:',
          error
        );

        this.cdr.markForCheck();
      }

    });
  }
}