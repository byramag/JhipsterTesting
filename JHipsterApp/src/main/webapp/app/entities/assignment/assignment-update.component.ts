import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IAssignment } from 'app/shared/model/assignment.model';
import { AssignmentService } from './assignment.service';
import { ISection } from 'app/shared/model/section.model';
import { SectionService } from 'app/entities/section';

@Component({
    selector: 'jhi-assignment-update',
    templateUrl: './assignment-update.component.html'
})
export class AssignmentUpdateComponent implements OnInit {
    assignment: IAssignment;
    isSaving: boolean;

    sections: ISection[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected assignmentService: AssignmentService,
        protected sectionService: SectionService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ assignment }) => {
            this.assignment = assignment;
        });
        this.sectionService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<ISection[]>) => mayBeOk.ok),
                map((response: HttpResponse<ISection[]>) => response.body)
            )
            .subscribe((res: ISection[]) => (this.sections = res), (res: HttpErrorResponse) => this.onError(res.message));
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

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackSectionById(index: number, item: ISection) {
        return item.id;
    }
}
