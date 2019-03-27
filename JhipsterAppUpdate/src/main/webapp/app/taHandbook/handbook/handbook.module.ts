import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TaManagementSharedModule } from 'app/shared';
import { HandbookComponent, handbookRoute } from './';

const ENTITY_STATES = [...handbookRoute];

@NgModule({
    imports: [TaManagementSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [HandbookComponent],
    entryComponents: [HandbookComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TaManagementHandbookModule {}
