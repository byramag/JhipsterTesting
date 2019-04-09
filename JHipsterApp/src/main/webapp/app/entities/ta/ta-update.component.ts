import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { ITA } from 'app/shared/model/ta.model';
import { TAService } from './ta.service';
import { ISection } from 'app/shared/model/section.model';
import { SectionService } from 'app/entities/section';
import { IAssignment } from 'app/shared/model/assignment.model';
import { AssignmentService } from 'app/entities/assignment';

@Component({
    selector: 'jhi-ta-update',
    templateUrl: './ta-update.component.html'
})
export class TAUpdateComponent implements OnInit {
    tA: ITA;
    isSaving: boolean;

    sections: ISection[];

    assignments: IAssignment[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected tAService: TAService,
        protected sectionService: SectionService,
        protected assignmentService: AssignmentService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ tA }) => {
            this.tA = tA;
        });
        this.sectionService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<ISection[]>) => mayBeOk.ok),
                map((response: HttpResponse<ISection[]>) => response.body)
            )
            .subscribe((res: ISection[]) => (this.sections = res), (res: HttpErrorResponse) => this.onError(res.message));
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
        if (this.tA.id !== undefined) {
            this.subscribeToSaveResponse(this.tAService.update(this.tA));
        } else {
            this.subscribeToSaveResponse(this.tAService.create(this.tA));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<ITA>>) {
        result.subscribe((res: HttpResponse<ITA>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackSectionById(index: number, item: ISection) {
        return item.id;
    }

    trackAssignmentById(index: number, item: IAssignment) {
        return item.id;
    }

    getSelected(selectedVals: Array<any>, option: any) {
        if (selectedVals) {
            for (let i = 0; i < selectedVals.length; i++) {
                if (option.id === selectedVals[i].id) {
                    return selectedVals[i];
                }
            }
        }
        return option;
    }
}
