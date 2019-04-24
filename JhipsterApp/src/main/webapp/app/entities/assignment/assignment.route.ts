import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Assignment } from 'app/shared/model/assignment.model';
import { AssignmentService } from './assignment.service';
import { AssignmentComponent } from './assignment.component';
import { AssignmentDetailComponent } from './assignment-detail.component';
import { AssignmentUpdateComponent } from './assignment-update.component';
import { AssignmentDeletePopupComponent } from './assignment-delete-dialog.component';
import { IAssignment } from 'app/shared/model/assignment.model';

@Injectable({ providedIn: 'root' })
export class AssignmentResolve implements Resolve<IAssignment> {
    constructor(private service: AssignmentService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IAssignment> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Assignment>) => response.ok),
                map((assignment: HttpResponse<Assignment>) => assignment.body)
            );
        }
        return of(new Assignment());
    }
}

export const assignmentRoute: Routes = [
    {
        path: '',
        component: AssignmentComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Assignments'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: AssignmentDetailComponent,
        resolve: {
            assignment: AssignmentResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Assignments'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: AssignmentUpdateComponent,
        resolve: {
            assignment: AssignmentResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Assignments'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: AssignmentUpdateComponent,
        resolve: {
            assignment: AssignmentResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Assignments'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const assignmentPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: AssignmentDeletePopupComponent,
        resolve: {
            assignment: AssignmentResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Assignments'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
