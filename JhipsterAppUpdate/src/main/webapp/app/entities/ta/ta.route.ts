import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Ta } from 'app/shared/model/ta.model';
import { TaService } from './ta.service';
import { TaComponent } from './ta.component';
import { TaDetailComponent } from './ta-detail.component';
import { TaUpdateComponent } from './ta-update.component';
import { TaDeletePopupComponent } from './ta-delete-dialog.component';
import { ITa } from 'app/shared/model/ta.model';

@Injectable({ providedIn: 'root' })
export class TaResolve implements Resolve<ITa> {
    constructor(private service: TaService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ITa> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Ta>) => response.ok),
                map((ta: HttpResponse<Ta>) => ta.body)
            );
        }
        return of(new Ta());
    }
}

export const taRoute: Routes = [
    {
        path: '',
        component: TaComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Tas'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: TaDetailComponent,
        resolve: {
            ta: TaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Tas'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: TaUpdateComponent,
        resolve: {
            ta: TaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Tas'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: TaUpdateComponent,
        resolve: {
            ta: TaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Tas'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const taPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: TaDeletePopupComponent,
        resolve: {
            ta: TaResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Tas'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
