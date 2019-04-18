import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TaManagementSharedModule } from 'app/shared';
import { UpdateComponent, updateRoute } from './';

const ENTITY_STATES = [...updateRoute];

@NgModule({
    imports: [TaManagementSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [UpdateComponent],
    entryComponents: [UpdateComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TaManagementUpdateModule {}
