import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ITANote } from 'app/shared/model/ta-note.model';
import { AccountService } from 'app/core';
import { TANoteService } from './ta-note.service';

@Component({
    selector: 'jhi-ta-note',
    templateUrl: './ta-note.component.html'
})
export class TANoteComponent implements OnInit, OnDestroy {
    tANotes: ITANote[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected tANoteService: TANoteService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.tANoteService
            .query()
            .pipe(
                filter((res: HttpResponse<ITANote[]>) => res.ok),
                map((res: HttpResponse<ITANote[]>) => res.body)
            )
            .subscribe(
                (res: ITANote[]) => {
                    this.tANotes = res;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInTANotes();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ITANote) {
        return item.id;
    }

    registerChangeInTANotes() {
        this.eventSubscriber = this.eventManager.subscribe('tANoteListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
