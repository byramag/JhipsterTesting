import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TaManagementSharedModule } from 'app/shared';
import { HOME_ROUTE, HomeComponent } from './';
import { ClassListScreenComponent } from './class-list-screen/class-list-screen.component';
import { ClassSelectedScreenComponent } from './class-selected-screen/class-selected-screen.component';
import { AboutClassScreenComponent } from './about-class-screen/about-class-screen.component';
import { GradingClassScreenComponent } from './grading-class-screen/grading-class-screen.component';
import { TASelectClassScreenComponent } from './taselect-class-screen/taselect-class-screen.component';
import { CourseAnalyticsClassScreenComponent } from './course-analytics-class-screen/course-analytics-class-screen.component';
import { GradingAssignmentSelectedScreenComponent } from './grading-assignment-selected-screen/grading-assignment-selected-screen.component';

@NgModule({
    imports: [TaManagementSharedModule, RouterModule.forChild([HOME_ROUTE])],
    declarations: [
        HomeComponent,
        ClassListScreenComponent,
        ClassSelectedScreenComponent,
        AboutClassScreenComponent,
        GradingClassScreenComponent,
        TASelectClassScreenComponent,
        CourseAnalyticsClassScreenComponent,
        GradingAssignmentSelectedScreenComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class TaManagementHomeModule {}
