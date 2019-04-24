import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IGrading } from 'app/shared/model/grading.model';
import { IAssignment } from 'app/shared/model/assignment.model';
import { AssignmentService } from 'app/entities/assignment/assignment.service';
import { filter, map } from 'rxjs/operators';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

@Component({
    selector: 'jhi-grading-detail',
    templateUrl: './grading-detail.component.html'
})
export class GradingDetailComponent implements OnInit {
    grading: IGrading;
    assignments: IAssignment[];

    constructor(
        protected activatedRoute: ActivatedRoute,
        protected assignmentService: AssignmentService,
        protected jhiAlertService: JhiAlertService
    ) {}

    ngOnInit() {
        this.loadAll();
        this.activatedRoute.data.subscribe(({ grading }) => {
            this.grading = grading;
        });
    }

    previousState() {
        window.history.back();
    }

    getGradingInstructions(lookupID: number) {
        const temp = this.assignments[lookupID - 1].gradingDirections;
        if (temp) {
            return temp;
        } else {
            return 'N/A';
        }
    }

    getNumSubmissions(idToLookup: number) {
        const temp = this.assignments[idToLookup - 1].numSubmissions;
        if (temp) {
            return temp;
        } else {
            return 'N/A';
        }
    }

    getNumParts(idToLookup: number) {
        const temp = this.assignments[idToLookup - 1].numParts;
        if (temp) {
            return temp;
        } else {
            return 'N/A';
        }
    }

    getAssignmentLink(idToLookup: number) {
        const temp = this.assignments[idToLookup - 1].gradingLink;
        if (temp) {
            return temp;
        } else {
            return 'N/A';
        }
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    loadAll() {
        this.assignmentService
            .query()
            .pipe(
                filter((res: HttpResponse<IAssignment[]>) => res.ok),
                map((res: HttpResponse<IAssignment[]>) => res.body)
            )
            .subscribe(
                (res: IAssignment[]) => {
                    this.assignments = res;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }
}
