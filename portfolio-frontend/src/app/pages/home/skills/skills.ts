import {
  ChangeDetectorRef,
  Component,
  inject
} from '@angular/core';

import { Api } from '../../../core/services/api';
import { Skill } from '../../../models/skill.model';

@Component({
  selector: 'app-skills',
  imports: [],
  templateUrl: './skills.html',
  styleUrl: './skills.css'
})
export class Skills {

  private api = inject(Api);
  private cdr = inject(ChangeDetectorRef);

  skillCategories: {
    category: string;
    skills: string[];
  }[] = [];

  constructor() {
    this.loadSkills();
  }

  loadSkills(): void {

    this.api.getSkills().subscribe({

      next: (data: Skill[]) => {

        const grouped = new Map<string, string[]>();

        for (const skill of data) {

          if (!grouped.has(skill.category)) {
            grouped.set(skill.category, []);
          }

          grouped
            .get(skill.category)!
            .push(skill.name);
        }

        this.skillCategories = Array.from(
          grouped.entries()
        ).map(([category, skills]) => ({
          category,
          skills
        }));

        this.cdr.markForCheck();
      },

      error: (error) => {

        console.error(
          'Failed to load skills:',
          error
        );

        this.cdr.markForCheck();
      }

    });
  }
}