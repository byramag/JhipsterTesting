import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TaManagementSharedModule } from 'app/shared';
import { GradingComponent, GradingDetailComponent, gradingRoute } from './';

const ENTITY_STATES = [...gradingRoute];

@NgModule({
    imports: [TaManagementSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [GradingComponent, GradingDetailComponent],
    entryComponents: [GradingComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TaManagementGradingViewModule {}
