import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { JhiLanguageService } from 'ng-jhipster';
import { JhiLanguageHelper } from 'app/core';

import { TaManagementSharedModule } from 'app/shared';
import {
    CourseComponent,
    CourseDetailComponent,
    CourseUpdateComponent,
    CourseDeletePopupComponent,
    CourseDeleteDialogComponent,
    courseRoute,
    coursePopupRoute
} from './';

const ENTITY_STATES = [...courseRoute, ...coursePopupRoute];

@NgModule({
    imports: [TaManagementSharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [CourseComponent, CourseDetailComponent, CourseUpdateComponent, CourseDeleteDialogComponent, CourseDeletePopupComponent],
    entryComponents: [CourseComponent, CourseUpdateComponent, CourseDeleteDialogComponent, CourseDeletePopupComponent],
    providers: [{ provide: JhiLanguageService, useClass: JhiLanguageService }],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TaManagementCourseModule {
    constructor(private languageService: JhiLanguageService, private languageHelper: JhiLanguageHelper) {
        this.languageHelper.language.subscribe((languageKey: string) => {
            if (languageKey !== undefined) {
                this.languageService.changeLanguage(languageKey);
            }
        });
    }
}
