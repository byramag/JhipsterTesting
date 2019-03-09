/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TaManagementTestModule } from '../../../test.module';
import { TimeWindowDetailComponent } from 'app/entities/time-window/time-window-detail.component';
import { TimeWindow } from 'app/shared/model/time-window.model';

describe('Component Tests', () => {
    describe('TimeWindow Management Detail Component', () => {
        let comp: TimeWindowDetailComponent;
        let fixture: ComponentFixture<TimeWindowDetailComponent>;
        const route = ({ data: of({ timeWindow: new TimeWindow(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TaManagementTestModule],
                declarations: [TimeWindowDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(TimeWindowDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(TimeWindowDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.timeWindow).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
