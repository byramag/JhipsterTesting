import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IFaculty } from 'app/shared/model/faculty.model';
import { FacultyService } from './faculty.service';
import { ISection } from 'app/shared/model/section.model';
import { SectionService } from 'app/entities/section';

@Component({
    selector: 'jhi-faculty-update',
    templateUrl: './faculty-update.component.html'
})
export class FacultyUpdateComponent implements OnInit {
    faculty: IFaculty;
    isSaving: boolean;

    sections: ISection[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected facultyService: FacultyService,
        protected sectionService: SectionService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ faculty }) => {
            this.faculty = faculty;
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
        if (this.faculty.id !== undefined) {
            this.subscribeToSaveResponse(this.facultyService.update(this.faculty));
        } else {
            this.subscribeToSaveResponse(this.facultyService.create(this.faculty));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IFaculty>>) {
        result.subscribe((res: HttpResponse<IFaculty>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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
