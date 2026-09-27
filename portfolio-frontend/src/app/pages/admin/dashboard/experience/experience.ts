import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { Api } from '../../../../core/services/api';
import { Experience } from '../../../../models/experience.model';

@Component({
  selector: 'app-experience',
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './experience.html',
  styleUrl: './experience.css'
})
export class ExperienceComponent implements OnInit {

  private api = inject(Api);
  private fb = inject(FormBuilder);
  private cdr = inject(ChangeDetectorRef);
  experiences: Experience[] = [];

  editingId: number | null = null;

  loading = false;
  saving = false;

  successMessage = '';
  errorMessage = '';

  experienceForm = this.fb.nonNullable.group({
    companyName: ['', [
      Validators.required,
      Validators.maxLength(150)
    ]],

    role: ['', [
      Validators.required,
      Validators.maxLength(150)
    ]],

    contribution: ['', [
      Validators.required,
      Validators.maxLength(1000)
    ]]
  });

  ngOnInit(): void {
    this.loadExperiences();
  }

  loadExperiences(): void {
    this.loading = true;
    this.errorMessage = '';

    this.api.getAdminExperience().subscribe({
      next: (data) => {
        this.experiences = data;
        this.loading = false;
        this.cdr.markForCheck();
      },

      error: () => {
        this.errorMessage = 'Failed to load experience entries.';
        this.loading = false;
      }
    });
  }

  submit(): void {
    if (this.experienceForm.invalid) {
      this.experienceForm.markAllAsTouched();
      return;
    }

    this.saving = true;
    this.successMessage = '';
    this.errorMessage = '';

    const formValue = this.experienceForm.getRawValue();

    if (this.editingId === null) {

      this.api.createExperience(formValue).subscribe({
        next: (created) => {

          this.experiences = [
            ...this.experiences,
            created
          ];

          this.successMessage =
            'Experience added successfully.';

          this.resetForm();
          this.saving = false;
        },

        error: () => {
          this.errorMessage =
            'Failed to add experience.';

          this.saving = false;
        }
      });

    } else {

      this.api.updateExperience(
        this.editingId,
        formValue
      ).subscribe({
        next: (updated) => {

          this.experiences = this.experiences.map(
            experience =>
              experience.id === updated.id
                ? updated
                : experience
          );

          this.successMessage =
            'Experience updated successfully.';

          this.resetForm();
          this.saving = false;
        },

        error: () => {
          this.errorMessage =
            'Failed to update experience.';

          this.saving = false;
        }
      });
    }
  }

  editExperience(experience: Experience): void {

    this.editingId = experience.id;

    this.experienceForm.patchValue({
      companyName: experience.companyName,
      role: experience.role,
      contribution: experience.contribution
    });

    this.successMessage = '';
    this.errorMessage = '';

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  deleteExperience(id: number): void {

    const confirmed = window.confirm(
      'Are you sure you want to delete this experience entry?'
    );

    if (!confirmed) {
      return;
    }

    this.api.deleteExperience(id).subscribe({
      next: () => {

        this.experiences = this.experiences.filter(
          experience => experience.id !== id
        );

        this.successMessage =
          'Experience deleted successfully.';

        if (this.editingId === id) {
          this.resetForm();
        }
      },

      error: () => {
        this.errorMessage =
          'Failed to delete experience.';
      }
    });
  }

  resetForm(): void {

    this.editingId = null;

    this.experienceForm.reset({
      companyName: '',
      role: '',
      contribution: ''
    });
  }

  get companyName() {
    return this.experienceForm.controls.companyName;
  }

  get role() {
    return this.experienceForm.controls.role;
  }

  get contribution() {
    return this.experienceForm.controls.contribution;
  }
}