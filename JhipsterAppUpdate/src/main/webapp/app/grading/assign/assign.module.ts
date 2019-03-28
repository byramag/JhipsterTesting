import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TaManagementSharedModule } from 'app/shared';
import { AssignComponent, assignRoute } from './';

const ENTITY_STATES = [...assignRoute];

@NgModule({
    imports: [TaManagementSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [AssignComponent],
    entryComponents: [AssignComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TaManagementGradingAssignModule {}
