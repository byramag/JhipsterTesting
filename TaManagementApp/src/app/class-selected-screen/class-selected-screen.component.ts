import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-class-selected-screen',
  templateUrl: './class-selected-screen.component.html',
  styleUrls: ['./class-selected-screen.component.css']
})
export class ClassSelectedScreenComponent implements OnInit {


  aboutScreenHTMLToggle: boolean;
  gradingScreenHTMLToggle: boolean;
  TASelectHTMLToggle: boolean;
  CourseAnalyticsHTMLToggle: boolean;

  constructor() {
    this.aboutScreenHTMLToggle = true;
    this.gradingScreenHTMLToggle = false;
    this.TASelectHTMLToggle = false;
    this.CourseAnalyticsHTMLToggle = false;
  }
  public ts1(): void {
    document.getElementById('sidebar').classList.toggle('active');
  }

  ngOnInit() {
  }

  public showGradingScreen() {
    this.aboutScreenHTMLToggle = false;
    this.gradingScreenHTMLToggle = true;
    this.TASelectHTMLToggle = false;
    this.CourseAnalyticsHTMLToggle = false;
  }

  public showAboutScreen() {
    this.aboutScreenHTMLToggle = true;
    this.gradingScreenHTMLToggle = false;
    this.TASelectHTMLToggle = false;
    this.CourseAnalyticsHTMLToggle = false;
  }

  public showTASelectScreen() {
    this.aboutScreenHTMLToggle = false;
    this.gradingScreenHTMLToggle = false;
    this.TASelectHTMLToggle = true;
    this.CourseAnalyticsHTMLToggle = false;
  }

  public showCourseAnalyticsScreen() {
    this.aboutScreenHTMLToggle = false;
    this.gradingScreenHTMLToggle = false;
    this.TASelectHTMLToggle = false;
    this.CourseAnalyticsHTMLToggle = true;
  }

}
