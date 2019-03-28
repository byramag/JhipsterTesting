import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TaManagementSharedModule } from 'app/shared';
import { GradingViewComponent, viewRoute } from './';

const ENTITY_STATES = [...viewRoute];

@NgModule({
    imports: [TaManagementSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [GradingViewComponent],
    entryComponents: [GradingViewComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TaManagementGradingViewModule {}
