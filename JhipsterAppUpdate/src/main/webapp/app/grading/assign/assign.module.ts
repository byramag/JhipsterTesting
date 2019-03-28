import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TaManagementSharedModule } from 'app/shared';
import {
    AssignComponent,
    AssignDetailComponent,
    AssignUpdateComponent,
    AssignDeletePopupComponent,
    AssignDeleteDialogComponent,
    assignPopupRoute,
    assignRoute
} from './';

const ENTITY_STATES = [...assignRoute, ...assignPopupRoute];

@NgModule({
    imports: [TaManagementSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [AssignComponent, AssignDetailComponent, AssignUpdateComponent, AssignDeleteDialogComponent, AssignDeletePopupComponent],
    entryComponents: [AssignComponent, AssignUpdateComponent, AssignDeleteDialogComponent, AssignDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TaManagementGradingAssignModule {}
