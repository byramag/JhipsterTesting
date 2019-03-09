import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITimeWindow } from 'app/shared/model/time-window.model';

@Component({
    selector: 'jhi-time-window-detail',
    templateUrl: './time-window-detail.component.html'
})
export class TimeWindowDetailComponent implements OnInit {
    timeWindow: ITimeWindow;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ timeWindow }) => {
            this.timeWindow = timeWindow;
        });
    }

    previousState() {
        window.history.back();
    }
}
