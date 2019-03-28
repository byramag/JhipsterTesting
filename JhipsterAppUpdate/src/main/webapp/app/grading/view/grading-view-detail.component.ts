import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IGrading } from 'app/shared/model/grading.model';

@Component({
    selector: 'jhi-grading-view-detail',
    templateUrl: './grading-view-detail.component.html'
})
export class GradingDetailComponent implements OnInit {
    grading: IGrading;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ grading }) => {
            this.grading = grading;
        });
        console.log(this.grading);
    }

    previousState() {
        window.history.back();
    }
}
