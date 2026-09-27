import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { Api } from '../../../core/services/api';

@Component({
  selector: 'app-contact',
  imports: [ReactiveFormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.css'
})
export class Contact {

  private fb = inject(FormBuilder);
  private api = inject(Api);

  contactForm = this.fb.nonNullable.group({
    name: [
      '',
      [
        Validators.required,
        Validators.minLength(2)
      ]
    ],
    email: [
      '',
      [
        Validators.required,
        Validators.email
      ]
    ],
    message: [
      '',
      [
        Validators.required,
        Validators.minLength(10)
      ]
    ]
  });

  isSubmitting = false;
  successMessage = '';
  errorMessage = '';

  submitForm(): void {

    this.successMessage = '';
    this.errorMessage = '';

    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;

    this.api
      .sendContactMessage(this.contactForm.getRawValue())
      .subscribe({
        next: () => {

          this.isSubmitting = false;

          this.successMessage =
            'Your message has been sent successfully.';

          this.contactForm.reset();

        },

        error: () => {

          this.isSubmitting = false;

          this.errorMessage =
            'Unable to send your message right now. Please try again later.';

        }
      });
  }

}