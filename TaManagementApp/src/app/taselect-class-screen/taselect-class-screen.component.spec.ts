import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TASelectClassScreenComponent } from './taselect-class-screen.component';

describe('TASelectClassScreenComponent', () => {
  let component: TASelectClassScreenComponent;
  let fixture: ComponentFixture<TASelectClassScreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TASelectClassScreenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TASelectClassScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
