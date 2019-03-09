import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITa } from 'app/shared/model/ta.model';

@Component({
    selector: 'jhi-ta-detail',
    templateUrl: './ta-detail.component.html'
})
export class TaDetailComponent implements OnInit {
    ta: ITa;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ ta }) => {
            this.ta = ta;
        });
    }

    previousState() {
        window.history.back();
    }
}
