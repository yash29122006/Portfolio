import {
  ChangeDetectorRef,
  Component,
  inject
} from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { RouterLink } from '@angular/router';

import { Api } from '../../../../core/services/api';

@Component({
  selector: 'app-portfolio',
  imports: [
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './portfolio.html',
  styleUrl: './portfolio.css'
})
export class Portfolio {
  private cdr = inject(ChangeDetectorRef);
  private fb = inject(FormBuilder);
  private api = inject(Api);

  isLoading = true;
  isSaving = false;

  successMessage = '';
  errorMessage = '';

  portfolioForm = this.fb.nonNullable.group({
    name: [
      '',
      [
        Validators.required,
        Validators.minLength(2)
      ]
    ],

    summary: [
      '',
      [
        Validators.required,
        Validators.minLength(20)
      ]
    ]
  });


  constructor() {
    this.loadPortfolio();
  }


  loadPortfolio(): void {

    this.isLoading = true;
    this.errorMessage = '';

    this.api.getPortfolio().subscribe({

      next: portfolio => {

        this.portfolioForm.patchValue({
          name: portfolio.name,
          summary: portfolio.summary
        });

        this.isLoading = false;
        this.cdr.markForCheck();
      },

      error: () => {

        this.isLoading = false;

        this.errorMessage =
          'Unable to load portfolio information.';
        this.cdr.markForCheck();
      }

    });

  }


  savePortfolio(): void {

    this.successMessage = '';
    this.errorMessage = '';

    if (this.portfolioForm.invalid) {

      this.portfolioForm.markAllAsTouched();

      return;
    }

    this.isSaving = true;

    this.api
      .updatePortfolio(
        this.portfolioForm.getRawValue()
      )
      .subscribe({

        next: portfolio => {

          this.portfolioForm.patchValue({
            name: portfolio.name,
            summary: portfolio.summary
          });

          this.isSaving = false;

          this.successMessage =
            'Portfolio information updated successfully.';

        },

        error: () => {

          this.isSaving = false;

          this.errorMessage =
            'Unable to update portfolio information.';

        }

      });

  }

}