import {
  ChangeDetectorRef,
  Component,
  inject
} from '@angular/core';

import { Api } from '../../../core/services/api';
import { Certification } from '../../../models/certification.model';

@Component({
  selector: 'app-certifications',
  imports: [],
  templateUrl: './certifications.html',
  styleUrl: './certifications.css'
})
export class Certifications {

  private api = inject(Api);
  private cdr = inject(ChangeDetectorRef);

  certifications: Certification[] = [];

  constructor() {
    this.loadCertifications();
  }

  loadCertifications(): void {

    this.api.getFeaturedCertifications().subscribe({

      next: (data) => {

        this.certifications = data;

        this.cdr.markForCheck();
      },

      error: (error) => {

        console.error(
          'Failed to load certifications:',
          error
        );

        this.cdr.markForCheck();
      }

    });
  }
}