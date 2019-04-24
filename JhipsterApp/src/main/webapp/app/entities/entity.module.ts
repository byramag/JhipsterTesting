import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'applicant',
                loadChildren: './applicant/applicant.module#TaManagementApplicantModule'
            },
            {
                path: 'ta',
                loadChildren: './ta/ta.module#TaManagementTaModule'
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
            },
            {
                path: 'grading',
                loadChildren: './grading/grading.module#TaManagementGradingModule'
            },
            {
                path: 'time-window',
                loadChildren: './time-window/time-window.module#TaManagementTimeWindowModule'
            },
            {
                path: 'ta-note',
                loadChildren: './ta-note/ta-note.module#TaManagementTANoteModule'
            },
            {
                path: 'faculty-note',
                loadChildren: './faculty-note/faculty-note.module#TaManagementFacultyNoteModule'
            },
            {
                path: 'ta-role',
                loadChildren: './ta-role/ta-role.module#TaManagementTaRoleModule'
            },
            {
                path: 'document',
                loadChildren: './document/document.module#TaManagementDocumentModule'
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
