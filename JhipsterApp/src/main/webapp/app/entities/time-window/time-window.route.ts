import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { TimeWindow } from 'app/shared/model/time-window.model';
import { TimeWindowService } from './time-window.service';
import { TimeWindowComponent } from './time-window.component';
import { TimeWindowDetailComponent } from './time-window-detail.component';
import { TimeWindowUpdateComponent } from './time-window-update.component';
import { TimeWindowDeletePopupComponent } from './time-window-delete-dialog.component';
import { ITimeWindow } from 'app/shared/model/time-window.model';

@Injectable({ providedIn: 'root' })
export class TimeWindowResolve implements Resolve<ITimeWindow> {
    constructor(private service: TimeWindowService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ITimeWindow> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<TimeWindow>) => response.ok),
                map((timeWindow: HttpResponse<TimeWindow>) => timeWindow.body)
            );
        }
        return of(new TimeWindow());
    }
}

export const timeWindowRoute: Routes = [
    {
        path: '',
        component: TimeWindowComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'TimeWindows'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: TimeWindowDetailComponent,
        resolve: {
            timeWindow: TimeWindowResolve
        },
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'TimeWindows'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: TimeWindowUpdateComponent,
        resolve: {
            timeWindow: TimeWindowResolve
        },
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'TimeWindows'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: TimeWindowUpdateComponent,
        resolve: {
            timeWindow: TimeWindowResolve
        },
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'TimeWindows'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const timeWindowPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: TimeWindowDeletePopupComponent,
        resolve: {
            timeWindow: TimeWindowResolve
        },
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'TimeWindows'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
