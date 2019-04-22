import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Ta } from 'app/shared/model/ta.model';
import { TaService } from 'app/entities/ta/ta.service';
import { SelectComponent } from './select.component';
import { SelectTaComponent } from './select-ta.component';
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

export const selectRoute: Routes = [
    {
        path: '',
        component: SelectComponent,
        data: {
            authorities: [],
            pageTitle: 'TA List'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/detail',
        component: SelectTaComponent,
        resolve: {
            ta: TaResolve
        },
        data: {
            authorities: [],
            pageTitle: 'View TA'
        },
        canActivate: [UserRouteAccessService]
    }
];
