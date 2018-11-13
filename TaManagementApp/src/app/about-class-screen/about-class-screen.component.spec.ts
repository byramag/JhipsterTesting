import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutClassScreenComponent } from './about-class-screen.component';

describe('AboutClassScreenComponent', () => {
  let component: AboutClassScreenComponent;
  let fixture: ComponentFixture<AboutClassScreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AboutClassScreenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutClassScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
