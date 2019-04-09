import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ITA } from 'app/shared/model/ta.model';
import { AccountService } from 'app/core';
import { TAService } from './ta.service';

@Component({
    selector: 'jhi-ta',
    templateUrl: './ta.component.html'
})
export class TAComponent implements OnInit, OnDestroy {
    tAS: ITA[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected tAService: TAService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.tAService
            .query()
            .pipe(
                filter((res: HttpResponse<ITA[]>) => res.ok),
                map((res: HttpResponse<ITA[]>) => res.body)
            )
            .subscribe(
                (res: ITA[]) => {
                    this.tAS = res;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInTAS();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ITA) {
        return item.id;
    }

    registerChangeInTAS() {
        this.eventSubscriber = this.eventManager.subscribe('tAListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
