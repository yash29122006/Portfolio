import {
  ChangeDetectorRef,
  Component,
  inject
} from '@angular/core';

import { RouterLink } from '@angular/router';

import { Api } from '../../core/services/api';
import { Achievement } from '../../models/achievement.model';

@Component({
  selector: 'app-achievements-page',
  imports: [RouterLink],
  templateUrl: './achievements-page.html',
  styleUrl: './achievements-page.css'
})
export class AchievementsPage {

  private api = inject(Api);
  private cdr = inject(ChangeDetectorRef);

  achievements: Achievement[] = [];

  constructor() {
    this.loadAchievements();
  }

  loadAchievements(): void {

    this.api.getAchievements().subscribe({

      next: (data: Achievement[]) => {

        this.achievements = data;

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