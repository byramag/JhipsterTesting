import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TaManagementSharedModule } from 'app/shared';
import {
    TaRoleComponent,
    TaRoleDetailComponent,
    TaRoleUpdateComponent,
    TaRoleDeletePopupComponent,
    TaRoleDeleteDialogComponent,
    taRoleRoute,
    taRolePopupRoute
} from './';

const ENTITY_STATES = [...taRoleRoute, ...taRolePopupRoute];

@NgModule({
    imports: [TaManagementSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [TaRoleComponent, TaRoleDetailComponent, TaRoleUpdateComponent, TaRoleDeleteDialogComponent, TaRoleDeletePopupComponent],
    entryComponents: [TaRoleComponent, TaRoleUpdateComponent, TaRoleDeleteDialogComponent, TaRoleDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TaManagementTaRoleModule {}
