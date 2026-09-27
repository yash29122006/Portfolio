import {
  ChangeDetectorRef,
  Component,
  inject
} from '@angular/core';

import { Api } from '../../../core/services/api';
import { Portfolio } from '../../../models/portfolio.model';

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

  constructor() {
    this.loadPortfolio();
  }

  loadPortfolio(): void {

    this.api.getPortfolio().subscribe({

      next: (data) => {

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

  scrollToProjects(): void {

    document
      .getElementById('projects')
      ?.scrollIntoView({
        behavior: 'smooth'
      });
  }

  scrollToContact(): void {

    document
      .getElementById('contact')
      ?.scrollIntoView({
        behavior: 'smooth'
      });
  }
}