import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IAssignment } from 'app/shared/model/assignment.model';
import { AccountService } from 'app/core';
import { AssignmentService } from './assignment.service';

@Component({
    selector: 'jhi-assignment',
    templateUrl: './assignment.component.html'
})
export class AssignmentComponent implements OnInit, OnDestroy {
    assignments: IAssignment[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected assignmentService: AssignmentService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.assignmentService
            .query()
            .pipe(
                filter((res: HttpResponse<IAssignment[]>) => res.ok),
                map((res: HttpResponse<IAssignment[]>) => res.body)
            )
            .subscribe(
                (res: IAssignment[]) => {
                    this.assignments = res;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInAssignments();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: IAssignment) {
        return item.id;
    }

    registerChangeInAssignments() {
        this.eventSubscriber = this.eventManager.subscribe('assignmentListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
