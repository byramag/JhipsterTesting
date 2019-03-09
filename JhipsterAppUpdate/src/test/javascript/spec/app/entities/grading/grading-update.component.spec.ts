/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { TaManagementTestModule } from '../../../test.module';
import { GradingUpdateComponent } from 'app/entities/grading/grading-update.component';
import { GradingService } from 'app/entities/grading/grading.service';
import { Grading } from 'app/shared/model/grading.model';

describe('Component Tests', () => {
    describe('Grading Management Update Component', () => {
        let comp: GradingUpdateComponent;
        let fixture: ComponentFixture<GradingUpdateComponent>;
        let service: GradingService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TaManagementTestModule],
                declarations: [GradingUpdateComponent]
            })
                .overrideTemplate(GradingUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(GradingUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(GradingService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new Grading(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.grading = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new Grading();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.grading = entity;
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
