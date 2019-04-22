import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { UserRouteAccessService } from 'app/core';
import { Observable, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Section } from 'app/shared/model/section.model';
import { SectionService } from 'app/entities/section/section.service';
import { CoursesComponent } from './courses.component';
import { CourseDetailComponent } from './course-detail.component';
import { CourseUpdateComponent } from './course-update.component';
import { ISection } from 'app/shared/model/section.model';

@Injectable({ providedIn: 'root' })
export class SectionResolve implements Resolve<ISection> {
    constructor(private service: SectionService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<ISection> {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(
                filter((response: HttpResponse<Section>) => response.ok),
                map((section: HttpResponse<Section>) => section.body)
            );
        }
        return of(new Section());
    }
}

export const coursesRoute: Routes = [
    {
        path: '',
        component: CoursesComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'My Courses'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/view',
        component: CourseDetailComponent,
        resolve: {
            section: SectionResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Course Homepage'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'new',
        component: CourseUpdateComponent,
        resolve: {
            section: SectionResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'New Course'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: ':id/edit',
        component: CourseUpdateComponent,
        resolve: {
            section: SectionResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Edit Course'
        },
        canActivate: [UserRouteAccessService]
    }
];
