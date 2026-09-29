import {
  ChangeDetectorRef,
  Component,
  inject
} from '@angular/core';

import { Api } from '../../../core/services/api';
import { Portfolio } from '../../../models/portfolio.model';
import { AcademicDetail } from '../../../models/academic.model';

@Component({
  selector: 'app-hero',
  imports: [],
  templateUrl: './hero.html',
  styleUrl: './hero.css'
})
export class Hero {

  private api = inject(Api);
  private cdr = inject(ChangeDetectorRef);

  portfolio: Portfolio | null = null;

  currentCgpa: string = '—';


  constructor() {

    this.loadPortfolio();

    this.loadCurrentCgpa();

  }


  /* =========================================================
     LOAD PORTFOLIO
     ========================================================= */

  loadPortfolio(): void {

    this.api.getPortfolio().subscribe({

      next: (data: Portfolio) => {

        this.portfolio = data;

        this.cdr.markForCheck();

      },

      error: (error) => {

        console.error(
          'Failed to load portfolio:',
          error
        );

        this.cdr.markForCheck();

      }

    });

  }


  /* =========================================================
     LOAD CURRENT CGPA
     ========================================================= */

  loadCurrentCgpa(): void {

    this.api.getAcademics().subscribe({

      next: (data: AcademicDetail[]) => {

        /*
         * Find the current Computer Engineering
         * academic record.
         *
         * This looks for an academic record containing
         * Computer Engineering or TCET.
         */

        const currentAcademic = data.find(
          (academic) => {

            const institution =
              academic.institutionName?.toLowerCase() ?? '';

            const degree =
              academic.degree?.toLowerCase() ?? '';

            return (
              institution.includes('thakur') ||
              institution.includes('tcet') ||
              degree.includes('computer engineering')
            );

          }
        );


        if (currentAcademic?.grade) {

          this.currentCgpa = currentAcademic.grade;

        }


        this.cdr.markForCheck();

      },

      error: (error) => {

        console.error(
          'Failed to load current CGPA:',
          error
        );

        this.currentCgpa = '—';

        this.cdr.markForCheck();

      }

    });

  }


  /* =========================================================
     SCROLL TO PROJECTS
     ========================================================= */

  scrollToProjects(): void {

    document
      .getElementById('projects')
      ?.scrollIntoView({
        behavior: 'smooth'
      });

  }


  /* =========================================================
     SCROLL TO CONTACT
     ========================================================= */

  scrollToContact(): void {

    document
      .getElementById('contact')
      ?.scrollIntoView({
        behavior: 'smooth'
      });

  }

}