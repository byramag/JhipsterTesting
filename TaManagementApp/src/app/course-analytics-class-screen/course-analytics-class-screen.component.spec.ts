import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseAnalyticsClassScreenComponent } from './course-analytics-class-screen.component';

describe('CourseAnalyticsClassScreenComponent', () => {
  let component: CourseAnalyticsClassScreenComponent;
  let fixture: ComponentFixture<CourseAnalyticsClassScreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseAnalyticsClassScreenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseAnalyticsClassScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
