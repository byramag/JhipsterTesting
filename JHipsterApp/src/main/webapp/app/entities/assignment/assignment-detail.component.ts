import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IAssignment } from 'app/shared/model/assignment.model';

@Component({
    selector: 'jhi-assignment-detail',
    templateUrl: './assignment-detail.component.html'
})
export class AssignmentDetailComponent implements OnInit {
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
