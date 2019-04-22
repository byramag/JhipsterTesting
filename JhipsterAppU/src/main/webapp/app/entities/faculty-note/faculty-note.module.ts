import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TaManagementSharedModule } from 'app/shared';
import {
    FacultyNoteComponent,
    FacultyNoteDetailComponent,
    FacultyNoteUpdateComponent,
    FacultyNoteDeletePopupComponent,
    FacultyNoteDeleteDialogComponent,
    facultyNoteRoute,
    facultyNotePopupRoute
} from './';

const ENTITY_STATES = [...facultyNoteRoute, ...facultyNotePopupRoute];

@NgModule({
    imports: [TaManagementSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        FacultyNoteComponent,
        FacultyNoteDetailComponent,
        FacultyNoteUpdateComponent,
        FacultyNoteDeleteDialogComponent,
        FacultyNoteDeletePopupComponent
    ],
    entryComponents: [FacultyNoteComponent, FacultyNoteUpdateComponent, FacultyNoteDeleteDialogComponent, FacultyNoteDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TaManagementFacultyNoteModule {}
