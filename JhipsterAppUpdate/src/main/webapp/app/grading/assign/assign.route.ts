import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Assignment } from 'app/shared/model/assignment.model';
import { AssignmentService } from 'app/entities/assignment/assignment.service';
import { AssignComponent } from './assign.component';
import { AssignDetailComponent } from './assign-detail.component';
import { AssignUpdateComponent } from './assign-update.component';
import { AssignDeletePopupComponent } from './assign-delete-dialog.component';
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

export const assignRoute: Routes = [
    {
        path: '',
        component: AssignComponent,
        data: {
            authorities: [],
            pageTitle: 'Assign Grading'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: AssignDetailComponent,
        resolve: {
            assignment: AssignmentResolve
        },
        data: {
            authorities: [],
            pageTitle: 'Assignments'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: AssignUpdateComponent,
        resolve: {
            assignment: AssignmentResolve
        },
        data: {
            authorities: [],
            pageTitle: 'Assignments'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: AssignUpdateComponent,
        resolve: {
            assignment: AssignmentResolve
        },
        data: {
            authorities: [],
            pageTitle: 'Assignments'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const assignPopupRoute: Routes = [
    {
        path: ':id/delete',
        component: AssignDeletePopupComponent,
        resolve: {
            assignment: AssignmentResolve
        },
        data: {
            authorities: [],
            pageTitle: 'Assignments'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
