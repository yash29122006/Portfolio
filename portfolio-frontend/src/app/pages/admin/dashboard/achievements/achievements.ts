import {
  ChangeDetectorRef,
  Component,
  inject
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import { Api } from '../../../../core/services/api';
import { Achievement } from '../../../../models/achievement.model';

@Component({
  selector: 'app-achievements',
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './achievements.html',
  styleUrl: './achievements.css'
})
export class Achievements {
  private cdr = inject(ChangeDetectorRef);
  private fb = inject(FormBuilder);
  private api = inject(Api);

  achievements: Achievement[] = [];

  editingId: number | null = null;

  loading = false;
  saving = false;

  successMessage = '';
  errorMessage = '';

  achievementForm = this.fb.nonNullable.group({
    heading: ['', Validators.required],
    description: ['', Validators.required],
    featured: [false]
  });

  constructor() {
    this.loadAchievements();
  }

  loadAchievements(): void {
    this.loading = true;
    this.errorMessage = '';

    this.api.getAdminAchievements().subscribe({
      next: (data) => {
        this.achievements = data;
        this.loading = false;
        this.cdr.markForCheck();
      },
      error: () => {
        this.errorMessage = 'Failed to load achievements.';
        this.loading = false;
        this.cdr.markForCheck();
      }
    });
  }

  submit(): void {
    if (this.achievementForm.invalid) {
      this.achievementForm.markAllAsTouched();
      return;
    }

    this.saving = true;
    this.successMessage = '';
    this.errorMessage = '';

    const data = this.achievementForm.getRawValue();

    if (this.editingId === null) {

      this.api.createAchievement(data).subscribe({
        next: (created) => {
          this.achievements = [
            ...this.achievements,
            created
          ];

          this.successMessage = 'Achievement added successfully.';
          this.resetForm();
          this.saving = false;
        },
        error: () => {
          this.errorMessage = 'Failed to add achievement.';
          this.saving = false;
        }
      });

    } else {

      this.api.updateAchievement(
        this.editingId,
        data
      ).subscribe({
        next: (updated) => {
          this.achievements = this.achievements.map(
            achievement =>
              achievement.id === this.editingId
                ? updated
                : achievement
          );

          this.successMessage = 'Achievement updated successfully.';
          this.resetForm();
          this.saving = false;
        },
        error: () => {
          this.errorMessage = 'Failed to update achievement.';
          this.saving = false;
        }
      });
    }
  }

  editAchievement(achievement: Achievement): void {
    this.editingId = achievement.id;

    this.achievementForm.patchValue({
      heading: achievement.heading,
      description: achievement.description,
      featured: achievement.featured
    });

    this.successMessage = '';
    this.errorMessage = '';

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  deleteAchievement(id: number): void {
    const confirmed = window.confirm(
      'Are you sure you want to delete this achievement?'
    );

    if (!confirmed) {
      return;
    }

    this.api.deleteAchievement(id).subscribe({
      next: () => {
        this.achievements = this.achievements.filter(
          achievement => achievement.id !== id
        );

        this.successMessage = 'Achievement deleted successfully.';

        if (this.editingId === id) {
          this.resetForm();
        }
      },
      error: () => {
        this.errorMessage = 'Failed to delete achievement.';
      }
    });
  }

  cancelEdit(): void {
    this.resetForm();
  }

  resetForm(): void {
    this.editingId = null;

    this.achievementForm.reset({
      heading: '',
      description: '',
      featured: false
    });
  }

  get heading() {
  return this.achievementForm.controls.heading;
}

get description() {
  return this.achievementForm.controls.description;
}
}