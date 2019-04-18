/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { TaManagementTestModule } from '../../../test.module';
import { TimeWindowComponent } from 'app/entities/time-window/time-window.component';
import { TimeWindowService } from 'app/entities/time-window/time-window.service';
import { TimeWindow } from 'app/shared/model/time-window.model';

describe('Component Tests', () => {
    describe('TimeWindow Management Component', () => {
        let comp: TimeWindowComponent;
        let fixture: ComponentFixture<TimeWindowComponent>;
        let service: TimeWindowService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TaManagementTestModule],
                declarations: [TimeWindowComponent],
                providers: []
            })
                .overrideTemplate(TimeWindowComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(TimeWindowComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TimeWindowService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new TimeWindow(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.timeWindows[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
