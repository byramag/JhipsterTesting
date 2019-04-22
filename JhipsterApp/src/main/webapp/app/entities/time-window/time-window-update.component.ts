import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';
import { ITimeWindow } from 'app/shared/model/time-window.model';
import { TimeWindowService } from './time-window.service';
import { ITa } from 'app/shared/model/ta.model';
import { TaService } from 'app/entities/ta';
import { ISection } from 'app/shared/model/section.model';
import { SectionService } from 'app/entities/section';

@Component({
    selector: 'jhi-time-window-update',
    templateUrl: './time-window-update.component.html'
})
export class TimeWindowUpdateComponent implements OnInit {
    timeWindow: ITimeWindow;
    isSaving: boolean;

    tas: ITa[];

    sections: ISection[];
    startTime: string;
    endTime: string;

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected timeWindowService: TimeWindowService,
        protected taService: TaService,
        protected sectionService: SectionService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ timeWindow }) => {
            this.timeWindow = timeWindow;
            this.startTime = this.timeWindow.startTime != null ? this.timeWindow.startTime.format(DATE_TIME_FORMAT) : null;
            this.endTime = this.timeWindow.endTime != null ? this.timeWindow.endTime.format(DATE_TIME_FORMAT) : null;
        });
        this.taService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<ITa[]>) => mayBeOk.ok),
                map((response: HttpResponse<ITa[]>) => response.body)
            )
            .subscribe((res: ITa[]) => (this.tas = res), (res: HttpErrorResponse) => this.onError(res.message));
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
        this.timeWindow.startTime = this.startTime != null ? moment(this.startTime, DATE_TIME_FORMAT) : null;
        this.timeWindow.endTime = this.endTime != null ? moment(this.endTime, DATE_TIME_FORMAT) : null;
        if (this.timeWindow.id !== undefined) {
            this.subscribeToSaveResponse(this.timeWindowService.update(this.timeWindow));
        } else {
            this.subscribeToSaveResponse(this.timeWindowService.create(this.timeWindow));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<ITimeWindow>>) {
        result.subscribe((res: HttpResponse<ITimeWindow>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackSectionById(index: number, item: ISection) {
        return item.id;
    }
}
