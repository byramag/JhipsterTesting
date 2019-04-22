import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TaManagementSharedModule } from 'app/shared';
import { CoursesComponent, CourseDetailComponent, CourseUpdateComponent, coursesRoute } from 'app/courseList/courses';

const ENTITY_STATES = [...coursesRoute];

@NgModule({
    imports: [TaManagementSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [CoursesComponent, CourseDetailComponent, CourseUpdateComponent],
    entryComponents: [CoursesComponent, CourseUpdateComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TaManagementCoursesModule {}
