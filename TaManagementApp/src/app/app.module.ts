import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ClassListScreenComponent } from './class-list-screen/class-list-screen.component';
import { ClassSelectedScreenComponent } from './class-selected-screen/class-selected-screen.component';
import { AboutClassScreenComponent } from './about-class-screen/about-class-screen.component';
import { GradingClassScreenComponent } from './grading-class-screen/grading-class-screen.component';
import { TASelectClassScreenComponent } from './taselect-class-screen/taselect-class-screen.component';
import { CourseAnalyticsClassScreenComponent } from './course-analytics-class-screen/course-analytics-class-screen.component';
import { GradingAssignmentSelectedScreenComponent } from './grading-assignment-selected-screen/grading-assignment-selected-screen.component';

@NgModule({
  declarations: [
    AppComponent,
    ClassListScreenComponent,
    ClassSelectedScreenComponent,
    AboutClassScreenComponent,
    GradingClassScreenComponent,
    TASelectClassScreenComponent,
    CourseAnalyticsClassScreenComponent,
    GradingAssignmentSelectedScreenComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
