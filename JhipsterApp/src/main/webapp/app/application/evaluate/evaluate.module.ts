import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TaManagementSharedModule } from 'app/shared';
import {
    EvaluateComponent,
    EvaluateViewComponent,
    evaluateRoute,
    evaluatePopupRoute,
    evaluateAcceptPopupRoute
} from './';
import { EvaluateDeletePopupComponent } from 'app/application/evaluate/evaluate-delete-dialog.component';
import { EvaluateDeleteDialogComponent } from 'app/application/evaluate/evaluate-delete-dialog.component';

import { EvaluateAcceptPopupComponent } from 'app/application/evaluate/evaluate-accept-dialog.component';
import { EvaluateAcceptDialogComponent } from 'app/application/evaluate/evaluate-accept-dialog.component';

const ENTITY_STATES = [...evaluateRoute, ...evaluatePopupRoute, ...evaluateAcceptPopupRoute];

@NgModule({
    imports: [TaManagementSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        EvaluateComponent,
        EvaluateViewComponent,
        EvaluateDeletePopupComponent,
        EvaluateDeleteDialogComponent,
        EvaluateAcceptPopupComponent,
        EvaluateAcceptDialogComponent
    ],
    entryComponents: [EvaluateComponent, EvaluateViewComponent, EvaluateDeletePopupComponent, EvaluateDeleteDialogComponent, EvaluateAcceptPopupComponent, EvaluateAcceptDialogComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TaManagementEvaluateModule { }
