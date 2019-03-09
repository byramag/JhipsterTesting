import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ITaRole } from 'app/shared/model/ta-role.model';
import { AccountService } from 'app/core';
import { TaRoleService } from './ta-role.service';

@Component({
    selector: 'jhi-ta-role',
    templateUrl: './ta-role.component.html'
})
export class TaRoleComponent implements OnInit, OnDestroy {
    taRoles: ITaRole[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        protected taRoleService: TaRoleService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService
    ) {}

    loadAll() {
        this.taRoleService
            .query()
            .pipe(
                filter((res: HttpResponse<ITaRole[]>) => res.ok),
                map((res: HttpResponse<ITaRole[]>) => res.body)
            )
            .subscribe(
                (res: ITaRole[]) => {
                    this.taRoles = res;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    ngOnInit() {
        this.loadAll();
        this.accountService.identity().then(account => {
            this.currentAccount = account;
        });
        this.registerChangeInTaRoles();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ITaRole) {
        return item.id;
    }

    registerChangeInTaRoles() {
        this.eventSubscriber = this.eventManager.subscribe('taRoleListModification', response => this.loadAll());
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }
}
