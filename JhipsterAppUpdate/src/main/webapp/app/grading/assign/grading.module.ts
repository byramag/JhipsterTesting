import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TaManagementSharedModule } from 'app/shared';
import {
    AssignmentComponent,
    AssignmentDetailComponent,
    AssignmentUpdateComponent,
    AssignmentDeletePopupComponent,
    AssignmentDeleteDialogComponent,
    assignmentRoute,
    assignmentPopupRoute
} from 'app/grading/assign';

const ENTITY_STATES = [...assignmentRoute, ...assignmentPopupRoute];

@NgModule({
    imports: [TaManagementSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        AssignmentComponent,
        AssignmentDetailComponent,
        AssignmentUpdateComponent,
        AssignmentDeleteDialogComponent,
        AssignmentDeletePopupComponent
    ],
    entryComponents: [AssignmentComponent, AssignmentUpdateComponent, AssignmentDeleteDialogComponent, AssignmentDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TaManagementGradingAssignModule {}
