import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { TaManagementSharedModule } from 'app/shared';
import {
    TAComponent,
    TADetailComponent,
    TAUpdateComponent,
    TADeletePopupComponent,
    TADeleteDialogComponent,
    tARoute,
    tAPopupRoute
} from './';

const ENTITY_STATES = [...tARoute, ...tAPopupRoute];

@NgModule({
    imports: [TaManagementSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [TAComponent, TADetailComponent, TAUpdateComponent, TADeleteDialogComponent, TADeletePopupComponent],
    entryComponents: [TAComponent, TAUpdateComponent, TADeleteDialogComponent, TADeletePopupComponent],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TaManagementTAModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
