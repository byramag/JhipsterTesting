import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { ISection } from 'app/shared/model/section.model';
import { SectionService } from './section.service';
import { ICourse } from 'app/shared/model/course.model';
import { CourseService } from 'app/entities/course';
import { IFaculty } from 'app/shared/model/faculty.model';
import { FacultyService } from 'app/entities/faculty';
import { ITa } from 'app/shared/model/ta.model';
import { TaService } from 'app/entities/ta';

@Component({
    selector: 'jhi-section-update',
    templateUrl: './section-update.component.html'
})
export class SectionUpdateComponent implements OnInit {
    section: ISection;
    isSaving: boolean;

    courses: ICourse[];

    faculties: IFaculty[];

    tas: ITa[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected sectionService: SectionService,
        protected courseService: CourseService,
        protected facultyService: FacultyService,
        protected taService: TaService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ section }) => {
            this.section = section;
        });
        this.courseService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<ICourse[]>) => mayBeOk.ok),
                map((response: HttpResponse<ICourse[]>) => response.body)
            )
            .subscribe((res: ICourse[]) => (this.courses = res), (res: HttpErrorResponse) => this.onError(res.message));
        this.facultyService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IFaculty[]>) => mayBeOk.ok),
                map((response: HttpResponse<IFaculty[]>) => response.body)
            )
            .subscribe((res: IFaculty[]) => (this.faculties = res), (res: HttpErrorResponse) => this.onError(res.message));
        this.taService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<ITa[]>) => mayBeOk.ok),
                map((response: HttpResponse<ITa[]>) => response.body)
            )
            .subscribe((res: ITa[]) => (this.tas = res), (res: HttpErrorResponse) => this.onError(res.message));
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.section.id !== undefined) {
            this.subscribeToSaveResponse(this.sectionService.update(this.section));
        } else {
            this.subscribeToSaveResponse(this.sectionService.create(this.section));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<ISection>>) {
        result.subscribe((res: HttpResponse<ISection>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackCourseById(index: number, item: ICourse) {
        return item.id;
    }

    trackFacultyById(index: number, item: IFaculty) {
        return item.id;
    }

    trackTaById(index: number, item: ITa) {
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
