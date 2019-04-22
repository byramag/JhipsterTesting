import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TaManagementSharedModule } from 'app/shared';
import {
    TaComponent,
    TaDetailComponent,
    TaUpdateComponent,
    TaDeletePopupComponent,
    TaDeleteDialogComponent,
    taRoute,
    taPopupRoute
} from './';

const ENTITY_STATES = [...taRoute, ...taPopupRoute];

@NgModule({
    imports: [TaManagementSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [TaComponent, TaDetailComponent, TaUpdateComponent, TaDeleteDialogComponent, TaDeletePopupComponent],
    entryComponents: [TaComponent, TaUpdateComponent, TaDeleteDialogComponent, TaDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TaManagementTaModule {}
