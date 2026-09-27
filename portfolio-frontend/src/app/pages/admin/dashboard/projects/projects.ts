import { Component, inject, ChangeDetectorRef } from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { RouterLink } from '@angular/router';

import { Api } from '../../../../core/services/api';
import { Project } from '../../../../models/project.model';

@Component({
  selector: 'app-projects',
  imports: [
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './projects.html',
  styleUrl: './projects.css'
})
export class Projects {
  private cdr = inject(ChangeDetectorRef);
  private fb = inject(FormBuilder);
  private api = inject(Api);

  projects: Project[] = [];

  isLoading = true;
  isSaving = false;

  isEditing = false;
  editingId: number | null = null;

  successMessage = '';
  errorMessage = '';

  projectForm = this.fb.nonNullable.group({

    name: [
      '',
      [
        Validators.required,
        Validators.minLength(2)
      ]
    ],

    techStack: [
      '',
      [
        Validators.required
      ]
    ],

    description: [
      '',
      [
        Validators.required,
        Validators.minLength(20)
      ]
    ],

    githubLink: [
      ''
    ],

    liveLink: [
      ''
    ],

    featured: [
      false
    ]

  });


  constructor() {
    this.loadProjects();
  }


  loadProjects(): void {

    this.isLoading = true;
    this.errorMessage = '';

    this.api.getAdminProjects().subscribe({

      next: projects => {

        this.projects = projects;

        this.isLoading = false;
        this.cdr.markForCheck();
      },

      error: () => {

        this.isLoading = false;

        this.errorMessage =
          'Unable to load projects.';
        this.cdr.markForCheck();
      }

    });

  }


  startAdd(): void {

    this.isEditing = false;
    this.editingId = null;

    this.successMessage = '';
    this.errorMessage = '';

    this.projectForm.reset({
      name: '',
      techStack: '',
      description: '',
      githubLink: '',
      liveLink: '',
      featured: false
    });

  }


  startEdit(project: Project): void {

    this.isEditing = true;
    this.editingId = project.id;

    this.successMessage = '';
    this.errorMessage = '';

    this.projectForm.patchValue({
      name: project.name,
      techStack: project.techStack,
      description: project.description,
      githubLink: project.githubLink ?? '',
      liveLink: project.liveLink ?? '',
      featured: project.featured
    });

  }


  cancelEdit(): void {

    this.isEditing = false;
    this.editingId = null;

    this.projectForm.reset({
      name: '',
      techStack: '',
      description: '',
      githubLink: '',
      liveLink: '',
      featured: false
    });

  }


  saveProject(): void {

    this.successMessage = '';
    this.errorMessage = '';

    if (this.projectForm.invalid) {

      this.projectForm.markAllAsTouched();

      return;
    }

    this.isSaving = true;

    const formValue = this.projectForm.getRawValue();

    const data = {
      ...formValue,
      githubLink: formValue.githubLink || null,
      liveLink: formValue.liveLink || null
    };


    if (
      this.isEditing &&
      this.editingId !== null
    ) {

      this.api
        .updateProject(
          this.editingId,
          data
        )
        .subscribe({

          next: updatedProject => {

            this.projects =
              this.projects.map(project =>
                project.id === updatedProject.id
                  ? updatedProject
                  : project
              );

            this.isSaving = false;

            this.isEditing = false;
            this.editingId = null;

            this.resetForm();

            this.successMessage =
              'Project updated successfully.';

          },

          error: () => {

            this.isSaving = false;

            this.errorMessage =
              'Unable to update project.';

          }

        });

      return;
    }


    this.api
      .createProject(data)
      .subscribe({

        next: createdProject => {

          this.projects = [
            ...this.projects,
            createdProject
          ];

          this.isSaving = false;

          this.resetForm();

          this.successMessage =
            'Project added successfully.';

        },

        error: () => {

          this.isSaving = false;

          this.errorMessage =
            'Unable to add project.';

        }

      });

  }


  deleteProject(project: Project): void {

    const confirmed = window.confirm(
      `Delete "${project.name}"?`
    );

    if (!confirmed) {
      return;
    }

    this.successMessage = '';
    this.errorMessage = '';

    this.api
      .deleteProject(project.id)
      .subscribe({

        next: () => {

          this.projects =
            this.projects.filter(
              item => item.id !== project.id
            );

          this.successMessage =
            'Project deleted successfully.';

        },

        error: () => {

          this.errorMessage =
            'Unable to delete project.';

        }

      });

  }


  private resetForm(): void {

    this.projectForm.reset({
      name: '',
      techStack: '',
      description: '',
      githubLink: '',
      liveLink: '',
      featured: false
    });

  }

}