import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';
import { IFacultyNote } from 'app/shared/model/faculty-note.model';
import { FacultyNoteService } from './faculty-note.service';
import { ITa } from 'app/shared/model/ta.model';
import { TaService } from 'app/entities/ta';
import { ISection } from 'app/shared/model/section.model';
import { SectionService } from 'app/entities/section';
import { IFaculty } from 'app/shared/model/faculty.model';
import { FacultyService } from 'app/entities/faculty';

@Component({
    selector: 'jhi-faculty-note-update',
    templateUrl: './faculty-note-update.component.html'
})
export class FacultyNoteUpdateComponent implements OnInit {
    facultyNote: IFacultyNote;
    isSaving: boolean;

    tas: ITa[];

    sections: ISection[];

    faculties: IFaculty[];
    createdOn: string;

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected facultyNoteService: FacultyNoteService,
        protected taService: TaService,
        protected sectionService: SectionService,
        protected facultyService: FacultyService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ facultyNote }) => {
            this.facultyNote = facultyNote;
            this.createdOn = this.facultyNote.createdOn != null ? this.facultyNote.createdOn.format(DATE_TIME_FORMAT) : null;
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
        this.facultyService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<IFaculty[]>) => mayBeOk.ok),
                map((response: HttpResponse<IFaculty[]>) => response.body)
            )
            .subscribe((res: IFaculty[]) => (this.faculties = res), (res: HttpErrorResponse) => this.onError(res.message));
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.facultyNote.createdOn = this.createdOn != null ? moment(this.createdOn, DATE_TIME_FORMAT) : null;
        if (this.facultyNote.id !== undefined) {
            this.subscribeToSaveResponse(this.facultyNoteService.update(this.facultyNote));
        } else {
            this.subscribeToSaveResponse(this.facultyNoteService.create(this.facultyNote));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IFacultyNote>>) {
        result.subscribe((res: HttpResponse<IFacultyNote>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackFacultyById(index: number, item: IFaculty) {
        return item.id;
    }
}
