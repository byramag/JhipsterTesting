import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Applicant } from 'app/shared/model/applicant.model';
import { ApplicantService } from 'app/entities/applicant/applicant.service';
import { AssignComponent } from './assign.component';
import { IApplicant } from 'app/shared/model/applicant.model';

// TODO Injectable?

export const assignRoute: Routes = [
    {
        path: '',
        component: AssignComponent,
        data: {
            authorities: [],
            pageTitle: 'Assign Grading'
        },
        canActivate: [UserRouteAccessService]
    }
];
