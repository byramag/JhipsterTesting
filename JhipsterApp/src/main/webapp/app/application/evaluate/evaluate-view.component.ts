import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IApplicant } from 'app/shared/model/applicant.model';

@Component({
    selector: 'jhi-evaluate-view',
    templateUrl: './evaluate-view.component.html'
})
export class EvaluateViewComponent implements OnInit {
    applicant: IApplicant;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ applicant }) => {
            this.applicant = applicant;
        });
    }

    previousState() {
        window.history.back();
    }
}
