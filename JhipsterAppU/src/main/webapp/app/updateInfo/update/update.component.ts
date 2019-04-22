import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { ITa } from 'app/shared/model/ta.model';
import { TaService } from 'app/entities/ta/ta.service';
import { IUser, UserService } from 'app/core';
import { ISection } from 'app/shared/model/section.model';
import { SectionService } from 'app/entities/section';
import { ICourse } from 'app/shared/model/course.model';
import { CourseService } from 'app/entities/course';
import { ITaRole } from 'app/shared/model/ta-role.model';
import { TaRoleService } from 'app/entities/ta-role';

@Component({
    selector: 'jhi-update',
    templateUrl: './update.component.html'
})
export class UpdateComponent implements OnInit {
    ta: ITa;
    isSaving: boolean;

    users: IUser[];

    sections: ISection[];

    courses: ICourse[];

    taroles: ITaRole[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected taService: TaService,
        protected userService: UserService,
        protected sectionService: SectionService,
        protected courseService: CourseService,
        protected taRoleService: TaRoleService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ ta }) => {
            this.ta = ta;
        });
        this.userService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IUser[]>) => mayBeOk.ok),
                map((response: HttpResponse<IUser[]>) => response.body)
            )
            .subscribe((res: IUser[]) => (this.users = res), (res: HttpErrorResponse) => this.onError(res.message));
        this.sectionService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<ISection[]>) => mayBeOk.ok),
                map((response: HttpResponse<ISection[]>) => response.body)
            )
            .subscribe((res: ISection[]) => (this.sections = res), (res: HttpErrorResponse) => this.onError(res.message));
        this.courseService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<ICourse[]>) => mayBeOk.ok),
                map((response: HttpResponse<ICourse[]>) => response.body)
            )
            .subscribe((res: ICourse[]) => (this.courses = res), (res: HttpErrorResponse) => this.onError(res.message));
        this.taRoleService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<ITaRole[]>) => mayBeOk.ok),
                map((response: HttpResponse<ITaRole[]>) => response.body)
            )
            .subscribe((res: ITaRole[]) => (this.taroles = res), (res: HttpErrorResponse) => this.onError(res.message));
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.ta.id !== undefined) {
            this.subscribeToSaveResponse(this.taService.update(this.ta));
        } else {
            this.subscribeToSaveResponse(this.taService.create(this.ta));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<ITa>>) {
        result.subscribe((res: HttpResponse<ITa>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackUserById(index: number, item: IUser) {
        return item.id;
    }

    trackSectionById(index: number, item: ISection) {
        return item.id;
    }

    trackCourseById(index: number, item: ICourse) {
        return item.id;
    }

    trackTaRoleById(index: number, item: ITaRole) {
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
