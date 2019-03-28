import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { GradingViewComponent } from './view.component';

// TODO Injectable?

export const viewRoute: Routes = [
    {
        path: '',
        component: GradingViewComponent,
        data: {
            authorities: [],
            pageTitle: 'View Grading'
        },
        canActivate: [UserRouteAccessService]
    }
];
