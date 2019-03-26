import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TaManagementSharedModule } from 'app/shared';
import { ApplyComponent, applyRoute } from './';

const ENTITY_STATES = [...applyRoute];

@NgModule({
    imports: [TaManagementSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [ApplyComponent],
    entryComponents: [ApplyComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TaManagementApplyModule {}
