import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { Api } from '../../../../core/services/api';
import { SocialLinks } from '../../../../models/social-links.model';

@Component({
  selector: 'app-social-links',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './social-links.html',
  styleUrl: './social-links.css'
})
export class SocialLinksComponent implements OnInit {
  private cdr = inject(ChangeDetectorRef);
  private api = inject(Api);
  private fb = inject(FormBuilder);

  socialLinks: SocialLinks | null = null;

  loading = false;
  saving = false;

  successMessage = '';
  errorMessage = '';

  socialLinksForm = this.fb.nonNullable.group({
    githubUrl: ['', [
      Validators.pattern(/^https?:\/\/.+/)
    ]],

    linkedinUrl: ['', [
      Validators.pattern(/^https?:\/\/.+/)
    ]],

    leetcodeUrl: ['', [
      Validators.pattern(/^https?:\/\/.+/)
    ]],

    codolioUrl: ['', [
      Validators.pattern(/^https?:\/\/.+/)
    ]]
  });

  ngOnInit(): void {
    this.loadSocialLinks();
  }

  loadSocialLinks(): void {
    this.loading = true;
    this.errorMessage = '';

    this.api.getSocialLinks().subscribe({
      next: (data) => {

        this.socialLinks = data;

        this.socialLinksForm.patchValue({
          githubUrl: data.githubUrl ?? '',
          linkedinUrl: data.linkedinUrl ?? '',
          leetcodeUrl: data.leetcodeUrl ?? '',
          codolioUrl: data.codolioUrl ?? ''
        });

        this.loading = false;
        this.cdr.markForCheck();
      },

      error: () => {
        this.errorMessage =
          'Failed to load social links.';

        this.loading = false;
        this.cdr.markForCheck();
      }
    });
  }

  save(): void {

    if (this.socialLinksForm.invalid) {
      this.socialLinksForm.markAllAsTouched();
      return;
    }

    this.saving = true;
    this.successMessage = '';
    this.errorMessage = '';

    const formValue = this.socialLinksForm.getRawValue();

    const data = {
      githubUrl: this.toNullable(formValue.githubUrl),
      linkedinUrl: this.toNullable(formValue.linkedinUrl),
      leetcodeUrl: this.toNullable(formValue.leetcodeUrl),
      codolioUrl: this.toNullable(formValue.codolioUrl)
    };

    this.api.updateSocialLinks(data).subscribe({
      next: (updated) => {

        this.socialLinks = updated;

        this.socialLinksForm.patchValue({
          githubUrl: updated.githubUrl ?? '',
          linkedinUrl: updated.linkedinUrl ?? '',
          leetcodeUrl: updated.leetcodeUrl ?? '',
          codolioUrl: updated.codolioUrl ?? ''
        });

        this.successMessage =
          'Social links updated successfully.';

        this.saving = false;
      },

      error: () => {
        this.errorMessage =
          'Failed to update social links.';

        this.saving = false;
      }
    });
  }

  private toNullable(value: string): string | null {
    const trimmed = value.trim();

    return trimmed === ''
      ? null
      : trimmed;
  }

  get githubUrl() {
    return this.socialLinksForm.controls.githubUrl;
  }

  get linkedinUrl() {
    return this.socialLinksForm.controls.linkedinUrl;
  }

  get leetcodeUrl() {
    return this.socialLinksForm.controls.leetcodeUrl;
  }

  get codolioUrl() {
    return this.socialLinksForm.controls.codolioUrl;
  }
}