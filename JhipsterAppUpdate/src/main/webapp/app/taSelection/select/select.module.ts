import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TaManagementSharedModule } from 'app/shared';
import { SelectComponent, SelectTaComponent, selectRoute } from './';

const ENTITY_STATES = [...selectRoute];

@NgModule({
    imports: [TaManagementSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [SelectComponent, SelectTaComponent],
    entryComponents: [SelectComponent, SelectTaComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TaManagementSelectModule {}
