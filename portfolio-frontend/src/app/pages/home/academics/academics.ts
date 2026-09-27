import {
  ChangeDetectorRef,
  Component,
  inject
} from '@angular/core';

import { Api } from '../../../core/services/api';
import { AcademicDetail } from '../../../models/academic.model';

@Component({
  selector: 'app-academics',
  imports: [],
  templateUrl: './academics.html',
  styleUrl: './academics.css'
})
export class Academics {

  private api = inject(Api);
  private cdr = inject(ChangeDetectorRef);

  academics: AcademicDetail[] = [];

  constructor() {
    this.loadAcademics();
  }

  loadAcademics(): void {

    this.api.getAcademics().subscribe({

      next: (data) => {

        this.academics = data;

        this.cdr.markForCheck();
      },

      error: (error) => {

        console.error(
          'Failed to load academics:',
          error
        );

        this.cdr.markForCheck();
      }

    });
  }
}