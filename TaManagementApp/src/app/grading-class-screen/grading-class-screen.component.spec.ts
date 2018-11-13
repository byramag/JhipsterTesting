import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GradingClassScreenComponent } from './grading-class-screen.component';

describe('GradingClassScreenComponent', () => {
  let component: GradingClassScreenComponent;
  let fixture: ComponentFixture<GradingClassScreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GradingClassScreenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GradingClassScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
