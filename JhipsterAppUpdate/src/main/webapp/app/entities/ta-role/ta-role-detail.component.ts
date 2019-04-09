import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITaRole } from 'app/shared/model/ta-role.model';

@Component({
    selector: 'jhi-ta-role-detail',
    templateUrl: './ta-role-detail.component.html'
})
export class TaRoleDetailComponent implements OnInit {
    taRole: ITaRole;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ taRole }) => {
            this.taRole = taRole;
        });
    }

    previousState() {
        window.history.back();
    }
}
