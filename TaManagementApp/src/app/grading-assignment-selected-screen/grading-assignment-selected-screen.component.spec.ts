import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GradingAssignmentSelectedScreenComponent } from './grading-assignment-selected-screen.component';

describe('GradingAssignmentSelectedScreenComponent', () => {
  let component: GradingAssignmentSelectedScreenComponent;
  let fixture: ComponentFixture<GradingAssignmentSelectedScreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GradingAssignmentSelectedScreenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GradingAssignmentSelectedScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
