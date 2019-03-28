import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IAssignment } from 'app/shared/model/assignment.model';

@Component({
    selector: 'jhi-assign-detail',
    templateUrl: './assign-detail.component.html'
})
export class AssignDetailComponent implements OnInit {
    assignment: IAssignment;

    constructor(protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ assignment }) => {
            this.assignment = assignment;
        });
    }

    previousState() {
        window.history.back();
    }
}
