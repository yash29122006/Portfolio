import {
  ChangeDetectorRef,
  Component,
  inject
} from '@angular/core';

import { Api } from '../../../core/services/api';
import { SocialLinks } from '../../../models/social-links.model';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.html',
  styleUrl: './footer.css'
})
export class Footer {

  private api = inject(Api);
  private cdr = inject(ChangeDetectorRef);

  socialLinks: SocialLinks | null = null;

  constructor() {
    this.loadSocialLinks();
  }

  loadSocialLinks(): void {

    this.api.getSocialLinks().subscribe({

      next: (data) => {

        this.socialLinks = data;

        this.cdr.markForCheck();
      },

      error: (error) => {

        console.error(
          'Failed to load social links:',
          error
        );

        this.cdr.markForCheck();
      }

    });
  }

  scrollToTop(): void {

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
}