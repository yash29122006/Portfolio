import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Api } from '../../../../core/services/api';
import { ContactMessage } from '../../../../models/contact-message.model';

@Component({
  selector: 'app-messages',
  imports: [
    CommonModule
  ],
  templateUrl: './messages.html',
  styleUrl: './messages.css'
})
export class Messages implements OnInit {
  private cdr = inject(ChangeDetectorRef);
  private api = inject(Api);

  messages: ContactMessage[] = [];

  loading = false;

  successMessage = '';
  errorMessage = '';

  ngOnInit(): void {
    this.loadMessages();
  }

  loadMessages(): void {

    this.loading = true;
    this.errorMessage = '';

    this.api.getAdminMessages().subscribe({
      next: (data) => {
        this.messages = data;
        this.loading = false;
        this.cdr.markForCheck();
      },

      error: () => {
        this.errorMessage =
          'Failed to load contact messages.';

        this.loading = false;
        this.cdr.markForCheck();
      }
    });
  }

  deleteMessage(id: number): void {

    const confirmed = window.confirm(
      'Are you sure you want to delete this message?'
    );

    if (!confirmed) {
      return;
    }

    this.api.deleteMessage(id).subscribe({
      next: () => {

        this.messages = this.messages.filter(
          message => message.id !== id
        );

        this.successMessage =
          'Message deleted successfully.';
      },

      error: () => {
        this.errorMessage =
          'Failed to delete message.';
      }
    });
  }
}