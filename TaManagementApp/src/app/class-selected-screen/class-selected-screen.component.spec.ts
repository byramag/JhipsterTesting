import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassSelectedScreenComponent } from './class-selected-screen.component';

describe('ClassSelectedScreenComponent', () => {
  let component: ClassSelectedScreenComponent;
  let fixture: ComponentFixture<ClassSelectedScreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClassSelectedScreenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassSelectedScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
