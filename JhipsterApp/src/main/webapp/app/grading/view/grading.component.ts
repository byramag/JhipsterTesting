import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IGrading } from 'app/shared/model/grading.model';
import { AccountService } from 'app/core';
import { GradingService } from 'app/entities/grading/grading.service';
import { AssignmentService } from 'app/entities/assignment/assignment.service';
import { IAssignment } from 'app/shared/model/assignment.model';

@Component({
    selector: 'jhi-grading',
    templateUrl: './grading.component.html'
})
export class GradingComponent implements OnInit, OnDestroy {
    gradings: IGrading[];

    assignments: IAssignment[];

    assignmentsIndexedById: IAssignment[];
    currentAccount: any;
    currentAccountId: number;
    eventSubscriber: Subscription;
    onlyMyGradings: IGrading[];
    gradingStatusList: string[];

    constructor(
        protected gradingService: GradingService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService,
        protected assignmentService: AssignmentService
    ) {
        this.gradingStatusList = [];
    }

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
                    for (let i = 0; i < this.gradings.length; i++) {
                        const currentGrading = this.gradings[i];
                        currentGrading.status = 'Assigned';
                        if (currentGrading.id !== null) {
                            if (this.currentAccountId === currentGrading.id) {
                                this.onlyMyGradings.push(currentGrading);
                            }
                        }
                    }
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );

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
        this.gradingStatusList.push('Assigned');
        this.gradingStatusList.push('Accepted');
        this.gradingStatusList.push('Completed');
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
            this.currentAccountId = account.id;
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

    getNumSubmissions(idToLookup: number) {
        const temp = this.assignments[idToLookup - 1].numSubmissions;
        if (temp) {
            return temp;
        } else {
            return 'N/A';
        }
    }

    getNumParts(idToLookup: number) {
        const temp = this.assignments[idToLookup - 1].numParts;
        if (temp) {
            return temp;
        } else {
            return 'N/A';
        }
    }
}
