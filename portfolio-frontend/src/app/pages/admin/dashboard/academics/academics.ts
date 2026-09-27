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
import { AcademicDetail } from '../../../../models/academic.model';

@Component({
  selector: 'app-academics',
  imports: [
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './academics.html',
  styleUrl: './academics.css'
})
export class Academics {

  private fb = inject(FormBuilder);
  private api = inject(Api);
  private cdr = inject(ChangeDetectorRef);
  academics: AcademicDetail[] = [];

  isLoading = true;
  isSaving = false;

  isEditing = false;
  editingId: number | null = null;

  successMessage = '';
  errorMessage = '';

  academicForm = this.fb.nonNullable.group({
    institutionName: [
      '',
      [
        Validators.required,
        Validators.minLength(2)
      ]
    ],

    degree: [
      '',
      [
        Validators.required
      ]
    ],

    grade: [
      '',
      [
        Validators.required
      ]
    ],

    passingYear: [
      2026,
      [
        Validators.required,
        Validators.min(1900),
        Validators.max(2100)
      ]
    ]
  });


  constructor() {
    this.loadAcademics();
  }


  loadAcademics(): void {

    this.isLoading = true;
    this.errorMessage = '';

    this.api.getAdminAcademics().subscribe({

      next: academics => {

        this.academics = academics;

        this.isLoading = false;
        this.cdr.markForCheck();
      },

      error: () => {

        this.isLoading = false;

        this.errorMessage =
          'Unable to load academic records.';
        this.cdr.markForCheck();
      }

    });

  }


  startAdd(): void {

    this.isEditing = false;
    this.editingId = null;

    this.successMessage = '';
    this.errorMessage = '';

    this.academicForm.reset({
      institutionName: '',
      degree: '',
      grade: '',
      passingYear: 2026
    });

  }


  startEdit(academic: AcademicDetail): void {

    this.isEditing = true;
    this.editingId = academic.id;

    this.successMessage = '';
    this.errorMessage = '';

    this.academicForm.patchValue({
      institutionName: academic.institutionName,
      degree: academic.degree,
      grade: academic.grade,
      passingYear: academic.passingYear
    });

  }


  cancelEdit(): void {

    this.isEditing = false;
    this.editingId = null;

    this.academicForm.reset({
      institutionName: '',
      degree: '',
      grade: '',
      passingYear: 2026
    });

  }


  saveAcademic(): void {

    this.successMessage = '';
    this.errorMessage = '';

    if (this.academicForm.invalid) {

      this.academicForm.markAllAsTouched();

      return;
    }

    this.isSaving = true;

    const data = this.academicForm.getRawValue();


    if (this.isEditing && this.editingId !== null) {

      this.api
        .updateAcademic(
          this.editingId,
          data
        )
        .subscribe({

          next: updatedAcademic => {

            this.academics =
              this.academics.map(academic =>
                academic.id === updatedAcademic.id
                  ? updatedAcademic
                  : academic
              );

            this.isSaving = false;

            this.isEditing = false;
            this.editingId = null;

            this.academicForm.reset({
              institutionName: '',
              degree: '',
              grade: '',
              passingYear: 2026
            });

            this.successMessage =
              'Academic record updated successfully.';

          },

          error: () => {

            this.isSaving = false;

            this.errorMessage =
              'Unable to update academic record.';

          }

        });

      return;
    }


    this.api
      .createAcademic(data)
      .subscribe({

        next: createdAcademic => {

          this.academics = [
            ...this.academics,
            createdAcademic
          ];

          this.isSaving = false;

          this.academicForm.reset({
            institutionName: '',
            degree: '',
            grade: '',
            passingYear: 2026
          });

          this.successMessage =
            'Academic record added successfully.';

        },

        error: () => {

          this.isSaving = false;

          this.errorMessage =
            'Unable to add academic record.';

        }

      });

  }


  deleteAcademic(academic: AcademicDetail): void {

    const confirmed = window.confirm(
      `Delete "${academic.institutionName}"?`
    );

    if (!confirmed) {
      return;
    }

    this.errorMessage = '';
    this.successMessage = '';

    this.api
      .deleteAcademic(academic.id)
      .subscribe({

        next: () => {

          this.academics =
            this.academics.filter(
              item => item.id !== academic.id
            );

          this.successMessage =
            'Academic record deleted successfully.';

        },

        error: () => {

          this.errorMessage =
            'Unable to delete academic record.';

        }

      });

  }

} 