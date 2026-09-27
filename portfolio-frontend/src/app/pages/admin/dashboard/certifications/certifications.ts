import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { Api } from '../../../../core/services/api';
import { Certification } from '../../../../models/certification.model';

@Component({
  selector: 'app-certifications',
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './certifications.html',
  styleUrl: './certifications.css'
})
export class Certifications implements OnInit {
  private cdr = inject(ChangeDetectorRef);
  private api = inject(Api);
  private fb = inject(FormBuilder);

  certifications: Certification[] = [];

  editingId: number | null = null;

  loading = false;
  saving = false;

  successMessage = '';
  errorMessage = '';

  certificationForm = this.fb.nonNullable.group({
    name: ['', [
      Validators.required,
      Validators.maxLength(150)
    ]],

    issuingAuthority: ['', [
      Validators.required,
      Validators.maxLength(150)
    ]],

    skillsLearned: ['', [
      Validators.required,
      Validators.maxLength(500)
    ]],

    featured: [false]
  });

  ngOnInit(): void {
    this.loadCertifications();
  }

  loadCertifications(): void {
    this.loading = true;
    this.errorMessage = '';

    this.api.getAdminCertifications().subscribe({
      next: (data) => {
        this.certifications = data;
        this.loading = false;
        this.cdr.markForCheck();
      },

      error: () => {
        this.errorMessage = 'Failed to load certifications.';
        this.loading = false;
        this.cdr.markForCheck();
      }
    });
  }

  submit(): void {
    if (this.certificationForm.invalid) {
      this.certificationForm.markAllAsTouched();
      return;
    }

    this.saving = true;
    this.successMessage = '';
    this.errorMessage = '';

    const formValue = this.certificationForm.getRawValue();

    if (this.editingId === null) {

      this.api.createCertification(formValue).subscribe({
        next: (created) => {

          this.certifications = [
            ...this.certifications,
            created
          ];

          this.successMessage =
            'Certification added successfully.';

          this.resetForm();
          this.saving = false;
        },

        error: () => {
          this.errorMessage =
            'Failed to add certification.';

          this.saving = false;
        }
      });

    } else {

      this.api.updateCertification(
        this.editingId,
        formValue
      ).subscribe({
        next: (updated) => {

          this.certifications =
            this.certifications.map(certification =>
              certification.id === updated.id
                ? updated
                : certification
            );

          this.successMessage =
            'Certification updated successfully.';

          this.resetForm();
          this.saving = false;
        },

        error: () => {
          this.errorMessage =
            'Failed to update certification.';

          this.saving = false;
        }
      });
    }
  }

  editCertification(
    certification: Certification
  ): void {

    this.editingId = certification.id;

    this.certificationForm.patchValue({
      name: certification.name,
      issuingAuthority: certification.issuingAuthority,
      skillsLearned: certification.skillsLearned,
      featured: certification.featured
    });

    this.successMessage = '';
    this.errorMessage = '';

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  deleteCertification(id: number): void {

    const confirmed = window.confirm(
      'Are you sure you want to delete this certification?'
    );

    if (!confirmed) {
      return;
    }

    this.api.deleteCertification(id).subscribe({
      next: () => {

        this.certifications =
          this.certifications.filter(
            certification => certification.id !== id
          );

        this.successMessage =
          'Certification deleted successfully.';

        if (this.editingId === id) {
          this.resetForm();
        }
      },

      error: () => {
        this.errorMessage =
          'Failed to delete certification.';
      }
    });
  }

  resetForm(): void {

    this.editingId = null;

    this.certificationForm.reset({
      name: '',
      issuingAuthority: '',
      skillsLearned: '',
      featured: false
    });
  }

  get name() {
    return this.certificationForm.controls.name;
  }

  get issuingAuthority() {
    return this.certificationForm.controls.issuingAuthority;
  }

  get skillsLearned() {
    return this.certificationForm.controls.skillsLearned;
  }
}