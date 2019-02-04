import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { TA } from 'app/shared/model/ta.model';
import { TAService } from './ta.service';
import { TAComponent } from './ta.component';
import { TADetailComponent } from './ta-detail.component';
import { TAUpdateComponent } from './ta-update.component';
import { TADeletePopupComponent } from './ta-delete-dialog.component';
import { ITA } from 'app/shared/model/ta.model';

@Injectable({ providedIn: 'root' })
export class TAResolve implements Resolve<ITA> {
    constructor(private service: TAService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ITA> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<TA>) => response.ok),
                map((tA: HttpResponse<TA>) => tA.body)
            );
        }
        return of(new TA());
    }
}

export const tARoute: Routes = [
    {
        path: '',
        component: TAComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'taManagementApp.tA.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: TADetailComponent,
        resolve: {
            tA: TAResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'taManagementApp.tA.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: TAUpdateComponent,
        resolve: {
            tA: TAResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'taManagementApp.tA.home.title'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: TAUpdateComponent,
        resolve: {
            tA: TAResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'taManagementApp.tA.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const tAPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: TADeletePopupComponent,
        resolve: {
            tA: TAResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'taManagementApp.tA.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
