import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IGrading } from 'app/shared/model/grading.model';
import { AccountService } from 'app/core';
import { GradingService } from 'app/entities/grading/grading.service';

@Component({
    selector: 'jhi-grading-view',
    templateUrl: './view.component.html'
})
export class GradingViewComponent implements OnInit, OnDestroy {
    gradings: IGrading[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected gradingService: GradingService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.gradingService
            .query()
            .pipe(
                filter((res: HttpResponse<IGrading[]>) => res.ok),
                map((res: HttpResponse<IGrading[]>) => res.body)
            )
            .subscribe(
                (res: IGrading[]) => {
                    this.gradings = res;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInGradings();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IGrading) {
        return item.id;
    }

    registerChangeInGradings() {
        this.eventSubscriber = this.eventManager.subscribe('gradingListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
