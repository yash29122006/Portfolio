import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { Auth } from '../../../core/services/auth';

@Component({
  selector: 'app-login',
  imports: [
  ReactiveFormsModule,
  RouterLink
],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  private fb = inject(FormBuilder);
  private auth = inject(Auth);
  private router = inject(Router);

  loginForm = this.fb.nonNullable.group({
    username: [
      '',
      [
        Validators.required
      ]
    ],

    password: [
      '',
      [
        Validators.required
      ]
    ]
  });

  isSubmitting = false;
  errorMessage = '';

  submitLogin(): void {

    this.errorMessage = '';

    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;

    this.auth
      .login(this.loginForm.getRawValue())
      .subscribe({
        next: () => {

          this.isSubmitting = false;

          this.router.navigate(['/admin/dashboard']);

        },

        error: () => {

          this.isSubmitting = false;

          this.errorMessage =
            'Invalid username or password.';

        }
      });
  }

}