import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TaManagementSharedModule } from 'app/shared';
import {
    GradingComponent,
    GradingDetailComponent,
    GradingUpdateComponent,
    GradingDeletePopupComponent,
    GradingDeleteDialogComponent,
    gradingRoute,
    gradingPopupRoute
} from './';

const ENTITY_STATES = [...gradingRoute, ...gradingPopupRoute];

@NgModule({
    imports: [TaManagementSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        GradingComponent,
        GradingDetailComponent,
        GradingUpdateComponent,
        GradingDeleteDialogComponent,
        GradingDeletePopupComponent
    ],
    entryComponents: [GradingComponent, GradingUpdateComponent, GradingDeleteDialogComponent, GradingDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TaManagementGradingModule {}
