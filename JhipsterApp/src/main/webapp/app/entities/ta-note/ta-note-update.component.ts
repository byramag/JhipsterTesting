import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';
import { ITANote } from 'app/shared/model/ta-note.model';
import { TANoteService } from './ta-note.service';
import { ISection } from 'app/shared/model/section.model';
import { SectionService } from 'app/entities/section';
import { ITa } from 'app/shared/model/ta.model';
import { TaService } from 'app/entities/ta';

@Component({
    selector: 'jhi-ta-note-update',
    templateUrl: './ta-note-update.component.html'
})
export class TANoteUpdateComponent implements OnInit {
    tANote: ITANote;
    isSaving: boolean;

    sections: ISection[];

    tas: ITa[];
    createdOn: string;

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected tANoteService: TANoteService,
        protected sectionService: SectionService,
        protected taService: TaService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ tANote }) => {
            this.tANote = tANote;
            this.createdOn = this.tANote.createdOn != null ? this.tANote.createdOn.format(DATE_TIME_FORMAT) : null;
        });
        this.sectionService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<ISection[]>) => mayBeOk.ok),
                map((response: HttpResponse<ISection[]>) => response.body)
            )
            .subscribe((res: ISection[]) => (this.sections = res), (res: HttpErrorResponse) => this.onError(res.message));
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
        this.tANote.createdOn = this.createdOn != null ? moment(this.createdOn, DATE_TIME_FORMAT) : null;
        if (this.tANote.id !== undefined) {
            this.subscribeToSaveResponse(this.tANoteService.update(this.tANote));
        } else {
            this.subscribeToSaveResponse(this.tANoteService.create(this.tANote));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<ITANote>>) {
        result.subscribe((res: HttpResponse<ITANote>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackTaById(index: number, item: ITa) {
        return item.id;
    }
}
