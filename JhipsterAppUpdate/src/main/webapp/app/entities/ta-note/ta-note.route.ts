import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { TANote } from 'app/shared/model/ta-note.model';
import { TANoteService } from './ta-note.service';
import { TANoteComponent } from './ta-note.component';
import { TANoteDetailComponent } from './ta-note-detail.component';
import { TANoteUpdateComponent } from './ta-note-update.component';
import { TANoteDeletePopupComponent } from './ta-note-delete-dialog.component';
import { ITANote } from 'app/shared/model/ta-note.model';

@Injectable({ providedIn: 'root' })
export class TANoteResolve implements Resolve<ITANote> {
    constructor(private service: TANoteService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ITANote> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<TANote>) => response.ok),
                map((tANote: HttpResponse<TANote>) => tANote.body)
            );
        }
        return of(new TANote());
    }
}

export const tANoteRoute: Routes = [
    {
        path: '',
        component: TANoteComponent,
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'TANotes'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: TANoteDetailComponent,
        resolve: {
            tANote: TANoteResolve
        },
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'TANotes'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: TANoteUpdateComponent,
        resolve: {
            tANote: TANoteResolve
        },
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'TANotes'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: TANoteUpdateComponent,
        resolve: {
            tANote: TANoteResolve
        },
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'TANotes'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const tANotePopupRoute: Routes = [
    {
        path: ':id/delete',
        component: TANoteDeletePopupComponent,
        resolve: {
            tANote: TANoteResolve
        },
        data: {
            authorities: ['ROLE_ADMIN'],
            pageTitle: 'TANotes'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
