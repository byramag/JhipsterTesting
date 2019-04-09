import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'ta',
                loadChildren: './ta/ta.module#TaManagementTAModule'
            },
            {
                path: 'applicant',
                loadChildren: './applicant/applicant.module#TaManagementApplicantModule'
            },
            {
                path: 'faculty',
                loadChildren: './faculty/faculty.module#TaManagementFacultyModule'
            },
            {
                path: 'course',
                loadChildren: './course/course.module#TaManagementCourseModule'
            },
            {
                path: 'section',
                loadChildren: './section/section.module#TaManagementSectionModule'
            },
            {
                path: 'assignment',
                loadChildren: './assignment/assignment.module#TaManagementAssignmentModule'
            }
            /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
        ])
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TaManagementEntityModule {}
