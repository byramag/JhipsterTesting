/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { TaManagementTestModule } from '../../../test.module';
import { TimeWindowUpdateComponent } from 'app/entities/time-window/time-window-update.component';
import { TimeWindowService } from 'app/entities/time-window/time-window.service';
import { TimeWindow } from 'app/shared/model/time-window.model';

describe('Component Tests', () => {
    describe('TimeWindow Management Update Component', () => {
        let comp: TimeWindowUpdateComponent;
        let fixture: ComponentFixture<TimeWindowUpdateComponent>;
        let service: TimeWindowService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TaManagementTestModule],
                declarations: [TimeWindowUpdateComponent]
            })
                .overrideTemplate(TimeWindowUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(TimeWindowUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TimeWindowService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new TimeWindow(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.timeWindow = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new TimeWindow();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.timeWindow = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.create).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));
        });
    });
});
