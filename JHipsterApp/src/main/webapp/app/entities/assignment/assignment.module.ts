import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { TaManagementSharedModule } from 'app/shared';
import {
    AssignmentComponent,
    AssignmentDetailComponent,
    AssignmentUpdateComponent,
    AssignmentDeletePopupComponent,
    AssignmentDeleteDialogComponent,
    assignmentRoute,
    assignmentPopupRoute
} from './';

const ENTITY_STATES = [...assignmentRoute, ...assignmentPopupRoute];

@NgModule({
    imports: [TaManagementSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        AssignmentComponent,
        AssignmentDetailComponent,
        AssignmentUpdateComponent,
        AssignmentDeleteDialogComponent,
        AssignmentDeletePopupComponent
    ],
    entryComponents: [AssignmentComponent, AssignmentUpdateComponent, AssignmentDeleteDialogComponent, AssignmentDeletePopupComponent],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TaManagementAssignmentModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
