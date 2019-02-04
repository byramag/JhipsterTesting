/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { TaManagementTestModule } from '../../../test.module';
import { TAUpdateComponent } from 'app/entities/ta/ta-update.component';
import { TAService } from 'app/entities/ta/ta.service';
import { TA } from 'app/shared/model/ta.model';

describe('Component Tests', () => {
    describe('TA Management Update Component', () => {
        let comp: TAUpdateComponent;
        let fixture: ComponentFixture<TAUpdateComponent>;
        let service: TAService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TaManagementTestModule],
                declarations: [TAUpdateComponent]
            })
                .overrideTemplate(TAUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(TAUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TAService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new TA(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.tA = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.update).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );

            it(
                'Should call create service on save for new entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new TA();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.tA = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.create).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );
        });
    });
});
