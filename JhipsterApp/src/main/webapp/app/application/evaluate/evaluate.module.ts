import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TaManagementSharedModule } from 'app/shared';
import { EvaluateComponent, EvaluateViewComponent, evaluateRoute } from 'app/application/evaluate';

const ENTITY_STATES = [...evaluateRoute];

@NgModule({
    imports: [TaManagementSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [EvaluateComponent, EvaluateViewComponent],
    entryComponents: [EvaluateComponent, EvaluateViewComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TaManagementEvaluateModule {}
