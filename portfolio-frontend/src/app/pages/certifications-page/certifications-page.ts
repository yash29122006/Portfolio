import {
    ChangeDetectorRef,
    Component,
    inject
} from '@angular/core';

import { RouterLink } from '@angular/router';

import { Api } from '../../core/services/api';
import { Certification } from '../../models/certification.model';

@Component({
    selector: 'app-certifications-page',
    imports: [RouterLink],
    templateUrl: './certifications-page.html',
    styleUrl: './certifications-page.css'
})
export class CertificationsPage {

    private api = inject(Api);
    private cdr = inject(ChangeDetectorRef);

    certifications: Certification[] = [];

    constructor() {
        this.loadCertifications();
    }

    loadCertifications(): void {

        this.api.getCertifications().subscribe({

            next: (data: Certification[]) => {

                this.certifications = data;

                this.cdr.markForCheck();
            },

            error: (error) => {

                console.error(
                    'Failed to load certifications:',
                    error
                );

                this.cdr.markForCheck();
            }

        });
    }
}