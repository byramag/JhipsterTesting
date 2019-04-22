import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IApplicant } from 'app/shared/model/applicant.model';

import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

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
