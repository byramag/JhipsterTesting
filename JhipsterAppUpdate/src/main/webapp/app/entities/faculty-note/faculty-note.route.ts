import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { FacultyNote } from 'app/shared/model/faculty-note.model';
import { FacultyNoteService } from './faculty-note.service';
import { FacultyNoteComponent } from './faculty-note.component';
import { FacultyNoteDetailComponent } from './faculty-note-detail.component';
import { FacultyNoteUpdateComponent } from './faculty-note-update.component';
import { FacultyNoteDeletePopupComponent } from './faculty-note-delete-dialog.component';
import { IFacultyNote } from 'app/shared/model/faculty-note.model';

@Injectable({ providedIn: 'root' })
export class FacultyNoteResolve implements Resolve<IFacultyNote> {
    constructor(private service: FacultyNoteService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IFacultyNote> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<FacultyNote>) => response.ok),
                map((facultyNote: HttpResponse<FacultyNote>) => facultyNote.body)
            );
        }
        return of(new FacultyNote());
    }
}

export const facultyNoteRoute: Routes = [
    {
        path: '',
        component: FacultyNoteComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'FacultyNotes'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: FacultyNoteDetailComponent,
        resolve: {
            facultyNote: FacultyNoteResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'FacultyNotes'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: FacultyNoteUpdateComponent,
        resolve: {
            facultyNote: FacultyNoteResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'FacultyNotes'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: FacultyNoteUpdateComponent,
        resolve: {
            facultyNote: FacultyNoteResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'FacultyNotes'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const facultyNotePopupRoute: Routes = [
    {
        path: ':id/delete',
        component: FacultyNoteDeletePopupComponent,
        resolve: {
            facultyNote: FacultyNoteResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'FacultyNotes'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
