import { Component, inject, ChangeDetectorRef } from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { RouterLink } from '@angular/router';

import { Api } from '../../../../core/services/api';
import { Skill } from '../../../../models/skill.model';

@Component({
  selector: 'app-skills',
  imports: [
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './skills.html',
  styleUrl: './skills.css'
})
export class Skills {

  private fb = inject(FormBuilder);
  private api = inject(Api);
  private cdr = inject(ChangeDetectorRef);
  skills: Skill[] = [];

  isLoading = true;
  isSaving = false;

  isEditing = false;
  editingId: number | null = null;

  successMessage = '';
  errorMessage = '';

  skillForm = this.fb.nonNullable.group({

    name: [
      '',
      [
        Validators.required,
        Validators.minLength(2)
      ]
    ],

    category: [
      '',
      [
        Validators.required,
        Validators.minLength(2)
      ]
    ]

  });


  constructor() {
    this.loadSkills();
  }


  loadSkills(): void {

    this.isLoading = true;
    this.errorMessage = '';

    this.api.getAdminSkills().subscribe({

      next: skills => {

        this.skills = skills;

        this.isLoading = false;
        this.cdr.markForCheck();
      },

      error: () => {

        this.isLoading = false;

        this.errorMessage =
          'Unable to load skills.';
        this.cdr.markForCheck();
      }

    });

  }


  startAdd(): void {

    this.isEditing = false;
    this.editingId = null;

    this.successMessage = '';
    this.errorMessage = '';

    this.resetForm();

  }


  startEdit(skill: Skill): void {

    this.isEditing = true;
    this.editingId = skill.id;

    this.successMessage = '';
    this.errorMessage = '';

    this.skillForm.patchValue({
      name: skill.name,
      category: skill.category
    });

  }


  cancelEdit(): void {

    this.isEditing = false;
    this.editingId = null;

    this.resetForm();

  }


  saveSkill(): void {

    this.successMessage = '';
    this.errorMessage = '';

    if (this.skillForm.invalid) {

      this.skillForm.markAllAsTouched();

      return;
    }

    this.isSaving = true;

    const data = this.skillForm.getRawValue();


    if (
      this.isEditing &&
      this.editingId !== null
    ) {

      this.api
        .updateSkill(
          this.editingId,
          data
        )
        .subscribe({

          next: updatedSkill => {

            this.skills =
              this.skills.map(skill =>
                skill.id === updatedSkill.id
                  ? updatedSkill
                  : skill
              );

            this.isSaving = false;

            this.isEditing = false;
            this.editingId = null;

            this.resetForm();

            this.successMessage =
              'Skill updated successfully.';

          },

          error: () => {

            this.isSaving = false;

            this.errorMessage =
              'Unable to update skill.';

          }

        });

      return;
    }


    this.api
      .createSkill(data)
      .subscribe({

        next: createdSkill => {

          this.skills = [
            ...this.skills,
            createdSkill
          ];

          this.isSaving = false;

          this.resetForm();

          this.successMessage =
            'Skill added successfully.';

        },

        error: () => {

          this.isSaving = false;

          this.errorMessage =
            'Unable to add skill.';

        }

      });

  }


  deleteSkill(skill: Skill): void {

    const confirmed = window.confirm(
      `Delete "${skill.name}"?`
    );

    if (!confirmed) {
      return;
    }

    this.successMessage = '';
    this.errorMessage = '';

    this.api
      .deleteSkill(skill.id)
      .subscribe({

        next: () => {

          this.skills =
            this.skills.filter(
              item => item.id !== skill.id
            );

          this.successMessage =
            'Skill deleted successfully.';

        },

        error: () => {

          this.errorMessage =
            'Unable to delete skill.';

        }

      });

  }


  private resetForm(): void {

    this.skillForm.reset({
      name: '',
      category: ''
    });

  }

}