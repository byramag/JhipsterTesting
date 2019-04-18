import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ITa } from 'app/shared/model/ta.model';
import { AccountService } from 'app/core';
import { TaService } from 'app/entities/ta/ta.service';

@Component({
    selector: 'jhi-select',
    templateUrl: './select.component.html'
})
export class SelectComponent implements OnInit, OnDestroy {
    tas: ITa[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected taService: TaService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.taService
            .query()
            .pipe(
                filter((res: HttpResponse<ITa[]>) => res.ok),
                map((res: HttpResponse<ITa[]>) => res.body)
            )
            .subscribe(
                (res: ITa[]) => {
                    this.tas = res;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInTas();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ITa) {
        return item.id;
    }

    registerChangeInTas() {
        this.eventSubscriber = this.eventManager.subscribe('taListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
