/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { TaManagementTestModule } from '../../../test.module';
import { TANoteUpdateComponent } from 'app/entities/ta-note/ta-note-update.component';
import { TANoteService } from 'app/entities/ta-note/ta-note.service';
import { TANote } from 'app/shared/model/ta-note.model';

describe('Component Tests', () => {
    describe('TANote Management Update Component', () => {
        let comp: TANoteUpdateComponent;
        let fixture: ComponentFixture<TANoteUpdateComponent>;
        let service: TANoteService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TaManagementTestModule],
                declarations: [TANoteUpdateComponent]
            })
                .overrideTemplate(TANoteUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(TANoteUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TANoteService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new TANote(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.tANote = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new TANote();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.tANote = entity;
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
