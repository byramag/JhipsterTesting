import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Grading } from 'app/shared/model/grading.model';
import { GradingService } from 'app/entities/grading/grading.service';
import { GradingComponent } from './grading.component';
import { GradingDetailComponent } from './grading-detail.component';
import { IGrading } from 'app/shared/model/grading.model';

@Injectable({ providedIn: 'root' })
export class GradingResolve implements Resolve<IGrading> {
    constructor(private service: GradingService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IGrading> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Grading>) => response.ok),
                map((grading: HttpResponse<Grading>) => grading.body)
            );
        }
        return of(new Grading());
    }
}

export const gradingRoute: Routes = [
    {
        path: '',
        component: GradingComponent,
        data: {
            authorities: [],
            pageTitle: 'My Grading'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: GradingDetailComponent,
        resolve: {
            grading: GradingResolve
        },
        data: {
            authorities: [],
            pageTitle: 'Grading Assignment'
        },
        canActivate: [UserRouteAccessService]
    }
];
