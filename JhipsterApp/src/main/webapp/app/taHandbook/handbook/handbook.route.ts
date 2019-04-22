import { Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { HandbookComponent } from 'app/taHandbook/handbook/handbook.component';

export const handbookRoute: Routes = [
    {
        path: '',
        component: HandbookComponent,
        data: {
            authorities: [],
            pageTitle: 'TA Handbook'
        },
        canActivate: [UserRouteAccessService]
    }
];
