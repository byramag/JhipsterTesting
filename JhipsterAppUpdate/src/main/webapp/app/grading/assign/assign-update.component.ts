import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { IAssignment } from 'app/shared/model/assignment.model';
import { AssignmentService } from 'app/entities/assignment/assignment.service';

@Component({
    selector: 'jhi-assign-update',
    templateUrl: './assign-update.component.html'
})
export class AssignUpdateComponent implements OnInit {
    assignment: IAssignment;
    isSaving: boolean;

    constructor(protected assignmentService: AssignmentService, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ assignment }) => {
            this.assignment = assignment;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.assignment.id !== undefined) {
            this.subscribeToSaveResponse(this.assignmentService.update(this.assignment));
        } else {
            this.subscribeToSaveResponse(this.assignmentService.create(this.assignment));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IAssignment>>) {
        result.subscribe((res: HttpResponse<IAssignment>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }
}
