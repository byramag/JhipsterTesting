/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { TaManagementTestModule } from '../../../test.module';
import { TaRoleUpdateComponent } from 'app/entities/ta-role/ta-role-update.component';
import { TaRoleService } from 'app/entities/ta-role/ta-role.service';
import { TaRole } from 'app/shared/model/ta-role.model';

describe('Component Tests', () => {
    describe('TaRole Management Update Component', () => {
        let comp: TaRoleUpdateComponent;
        let fixture: ComponentFixture<TaRoleUpdateComponent>;
        let service: TaRoleService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TaManagementTestModule],
                declarations: [TaRoleUpdateComponent]
            })
                .overrideTemplate(TaRoleUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(TaRoleUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TaRoleService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new TaRole(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.taRole = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new TaRole();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.taRole = entity;
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
