import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassListScreenComponent } from './class-list-screen.component';

describe('ClassListScreenComponent', () => {
  let component: ClassListScreenComponent;
  let fixture: ComponentFixture<ClassListScreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClassListScreenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassListScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
