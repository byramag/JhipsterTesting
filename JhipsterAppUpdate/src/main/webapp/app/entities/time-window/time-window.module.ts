import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TaManagementSharedModule } from 'app/shared';
import {
    TimeWindowComponent,
    TimeWindowDetailComponent,
    TimeWindowUpdateComponent,
    TimeWindowDeletePopupComponent,
    TimeWindowDeleteDialogComponent,
    timeWindowRoute,
    timeWindowPopupRoute
} from './';

const ENTITY_STATES = [...timeWindowRoute, ...timeWindowPopupRoute];

@NgModule({
    imports: [TaManagementSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        TimeWindowComponent,
        TimeWindowDetailComponent,
        TimeWindowUpdateComponent,
        TimeWindowDeleteDialogComponent,
        TimeWindowDeletePopupComponent
    ],
    entryComponents: [TimeWindowComponent, TimeWindowUpdateComponent, TimeWindowDeleteDialogComponent, TimeWindowDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TaManagementTimeWindowModule {}
