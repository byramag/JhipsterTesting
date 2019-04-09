import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IFacultyNote } from 'app/shared/model/faculty-note.model';
import { AccountService } from 'app/core';
import { FacultyNoteService } from './faculty-note.service';

@Component({
    selector: 'jhi-faculty-note',
    templateUrl: './faculty-note.component.html'
})
export class FacultyNoteComponent implements OnInit, OnDestroy {
    facultyNotes: IFacultyNote[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected facultyNoteService: FacultyNoteService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.facultyNoteService
            .query()
            .pipe(
                filter((res: HttpResponse<IFacultyNote[]>) => res.ok),
                map((res: HttpResponse<IFacultyNote[]>) => res.body)
            )
            .subscribe(
                (res: IFacultyNote[]) => {
                    this.facultyNotes = res;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInFacultyNotes();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IFacultyNote) {
        return item.id;
    }

    registerChangeInFacultyNotes() {
        this.eventSubscriber = this.eventManager.subscribe('facultyNoteListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
