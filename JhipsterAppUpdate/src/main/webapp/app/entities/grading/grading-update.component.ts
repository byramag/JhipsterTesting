import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IGrading } from 'app/shared/model/grading.model';
import { GradingService } from './grading.service';
import { ITa } from 'app/shared/model/ta.model';
import { TaService } from 'app/entities/ta';
import { IAssignment } from 'app/shared/model/assignment.model';
import { AssignmentService } from 'app/entities/assignment';

@Component({
    selector: 'jhi-grading-update',
    templateUrl: './grading-update.component.html'
})
export class GradingUpdateComponent implements OnInit {
    grading: IGrading;
    isSaving: boolean;

    tas: ITa[];

    assignments: IAssignment[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected gradingService: GradingService,
        protected taService: TaService,
        protected assignmentService: AssignmentService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ grading }) => {
            this.grading = grading;
        });
        this.taService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<ITa[]>) => mayBeOk.ok),
                map((response: HttpResponse<ITa[]>) => response.body)
            )
            .subscribe((res: ITa[]) => (this.tas = res), (res: HttpErrorResponse) => this.onError(res.message));
        this.assignmentService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IAssignment[]>) => mayBeOk.ok),
                map((response: HttpResponse<IAssignment[]>) => response.body)
            )
            .subscribe((res: IAssignment[]) => (this.assignments = res), (res: HttpErrorResponse) => this.onError(res.message));
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.grading.id !== undefined) {
            this.subscribeToSaveResponse(this.gradingService.update(this.grading));
        } else {
            this.subscribeToSaveResponse(this.gradingService.create(this.grading));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IGrading>>) {
        result.subscribe((res: HttpResponse<IGrading>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackTaById(index: number, item: ITa) {
        return item.id;
    }

    trackAssignmentById(index: number, item: IAssignment) {
        return item.id;
    }
}
