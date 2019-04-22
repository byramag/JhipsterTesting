import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IApplicant } from 'app/shared/model/applicant.model';
import { AccountService } from 'app/core';
import { ApplicantService } from 'app/entities/applicant/applicant.service';

@Component({
    selector: 'jhi-evaluate',
    templateUrl: './evaluate.component.html'
})
export class EvaluateComponent implements OnInit, OnDestroy {
    applicants: IApplicant[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected applicantService: ApplicantService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.applicantService
            .query()
            .pipe(
                filter((res: HttpResponse<IApplicant[]>) => res.ok),
                map((res: HttpResponse<IApplicant[]>) => res.body)
            )
            .subscribe(
                (res: IApplicant[]) => {
                    this.applicants = res;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInApplicants();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IApplicant) {
        return item.id;
    }

    registerChangeInApplicants() {
        this.eventSubscriber = this.eventManager.subscribe('applicantListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
