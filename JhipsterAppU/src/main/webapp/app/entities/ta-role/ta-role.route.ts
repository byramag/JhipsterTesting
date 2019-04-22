import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { TaRole } from 'app/shared/model/ta-role.model';
import { TaRoleService } from './ta-role.service';
import { TaRoleComponent } from './ta-role.component';
import { TaRoleDetailComponent } from './ta-role-detail.component';
import { TaRoleUpdateComponent } from './ta-role-update.component';
import { TaRoleDeletePopupComponent } from './ta-role-delete-dialog.component';
import { ITaRole } from 'app/shared/model/ta-role.model';

@Injectable({ providedIn: 'root' })
export class TaRoleResolve implements Resolve<ITaRole> {
    constructor(private service: TaRoleService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ITaRole> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<TaRole>) => response.ok),
                map((taRole: HttpResponse<TaRole>) => taRole.body)
            );
        }
        return of(new TaRole());
    }
}

export const taRoleRoute: Routes = [
    {
        path: '',
        component: TaRoleComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TaRoles'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: TaRoleDetailComponent,
        resolve: {
            taRole: TaRoleResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TaRoles'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: TaRoleUpdateComponent,
        resolve: {
            taRole: TaRoleResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TaRoles'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: TaRoleUpdateComponent,
        resolve: {
            taRole: TaRoleResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TaRoles'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const taRolePopupRoute: Routes = [
    {
        path: ':id/delete',
        component: TaRoleDeletePopupComponent,
        resolve: {
            taRole: TaRoleResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TaRoles'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
