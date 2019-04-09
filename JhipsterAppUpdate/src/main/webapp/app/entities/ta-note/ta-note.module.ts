import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TaManagementSharedModule } from 'app/shared';
import {
    TANoteComponent,
    TANoteDetailComponent,
    TANoteUpdateComponent,
    TANoteDeletePopupComponent,
    TANoteDeleteDialogComponent,
    tANoteRoute,
    tANotePopupRoute
} from './';

const ENTITY_STATES = [...tANoteRoute, ...tANotePopupRoute];

@NgModule({
    imports: [TaManagementSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [TANoteComponent, TANoteDetailComponent, TANoteUpdateComponent, TANoteDeleteDialogComponent, TANoteDeletePopupComponent],
    entryComponents: [TANoteComponent, TANoteUpdateComponent, TANoteDeleteDialogComponent, TANoteDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TaManagementTANoteModule {}
