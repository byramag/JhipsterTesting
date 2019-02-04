import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITA } from 'app/shared/model/ta.model';

@Component({
    selector: 'jhi-ta-detail',
    templateUrl: './ta-detail.component.html'
})
export class TADetailComponent implements OnInit {
    tA: ITA;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ tA }) => {
            this.tA = tA;
        });
    }

    previousState() {
        window.history.back();
    }
}
