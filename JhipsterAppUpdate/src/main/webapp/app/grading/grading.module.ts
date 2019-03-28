import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'grading-assign',
                loadChildren: './assign/grading.module#TaManagementGradingAssignModule'
            },
            {
                path: 'grading-view',
                loadChildren: './view/grading.module#TaManagementGradingViewModule'
            }
        ])
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TaManagementGradingModule {}
