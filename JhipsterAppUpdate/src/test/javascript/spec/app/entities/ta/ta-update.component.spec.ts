/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { TaManagementTestModule } from '../../../test.module';
import { TaUpdateComponent } from 'app/entities/ta/ta-update.component';
import { TaService } from 'app/entities/ta/ta.service';
import { Ta } from 'app/shared/model/ta.model';

describe('Component Tests', () => {
    describe('Ta Management Update Component', () => {
        let comp: TaUpdateComponent;
        let fixture: ComponentFixture<TaUpdateComponent>;
        let service: TaService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TaManagementTestModule],
                declarations: [TaUpdateComponent]
            })
                .overrideTemplate(TaUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(TaUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TaService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new Ta(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.ta = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new Ta();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.ta = entity;
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
