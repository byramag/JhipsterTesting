import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Applicant } from 'app/shared/model/applicant.model';
import { ApplicantService } from 'app/entities/applicant/applicant.service';
import { EvaluateComponent } from './evaluate.component';
import { EvaluateViewComponent } from 'app/application/evaluate/evaluate-view.component';
import { EvaluateDeletePopupComponent } from 'app/application/evaluate/evaluate-delete-dialog.component';
import { EvaluateAcceptPopupComponent } from 'app/application/evaluate/evaluate-accept-dialog.component';
import { IApplicant } from 'app/shared/model/applicant.model';

@Injectable({ providedIn: 'root' })
export class ApplicantResolve implements Resolve<IApplicant> {
    constructor(private service: ApplicantService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IApplicant> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Applicant>) => response.ok),
                map((applicant: HttpResponse<Applicant>) => applicant.body)
            );
        }
        return of(new Applicant());
    }
}

export const evaluateRoute: Routes = [
    {
        path: '',
        component: EvaluateComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'Review Applicants'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: EvaluateViewComponent,
        resolve: {
            applicant: ApplicantResolve
        },
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'Review this Applicant'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const evaluatePopupRoute: Routes = [
    {
        path: ':id/delete',
        component: EvaluateDeletePopupComponent,
        resolve: {
            applicant: ApplicantResolve
        },
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'Evaluate'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];

export const evaluateAcceptPopupRoute: Routes = [
    {
        path: ':id/accept',
        component: EvaluateAcceptPopupComponent,
        resolve: {
            applicant: ApplicantResolve
        },
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'Evaluate'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
