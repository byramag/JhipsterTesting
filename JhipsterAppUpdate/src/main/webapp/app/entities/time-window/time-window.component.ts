import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ITimeWindow } from 'app/shared/model/time-window.model';
import { AccountService } from 'app/core';
import { TimeWindowService } from './time-window.service';

@Component({
    selector: 'jhi-time-window',
    templateUrl: './time-window.component.html'
})
export class TimeWindowComponent implements OnInit, OnDestroy {
    timeWindows: ITimeWindow[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected timeWindowService: TimeWindowService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.timeWindowService
            .query()
            .pipe(
                filter((res: HttpResponse<ITimeWindow[]>) => res.ok),
                map((res: HttpResponse<ITimeWindow[]>) => res.body)
            )
            .subscribe(
                (res: ITimeWindow[]) => {
                    this.timeWindows = res;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInTimeWindows();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ITimeWindow) {
        return item.id;
    }

    registerChangeInTimeWindows() {
        this.eventSubscriber = this.eventManager.subscribe('timeWindowListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
