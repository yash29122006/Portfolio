import {
  ChangeDetectorRef,
  Component,
  inject
} from '@angular/core';

import { Api } from '../../../core/services/api';
import { Achievement } from '../../../models/achievement.model';

@Component({
  selector: 'app-achievements',
  imports: [],
  templateUrl: './achievements.html',
  styleUrl: './achievements.css'
})
export class Achievements {

  private api = inject(Api);
  private cdr = inject(ChangeDetectorRef);

  achievements: {
    number: string;
    title: string;
    description: string;
    category: string;
  }[] = [];

  constructor() {
    this.loadAchievements();
  }

  loadAchievements(): void {

    this.api.getFeaturedAchievements().subscribe({

      next: (data: Achievement[]) => {

        this.achievements = data.map(
          (achievement, index) => ({
            number: String(index + 1).padStart(2, '0'),
            title: achievement.heading,
            description: achievement.description,
            category: 'Achievement'
          })
        );

        this.cdr.markForCheck();
      },

      error: (error) => {

        console.error(
          'Failed to load achievements:',
          error
        );

        this.cdr.markForCheck();
      }

    });
  }
}