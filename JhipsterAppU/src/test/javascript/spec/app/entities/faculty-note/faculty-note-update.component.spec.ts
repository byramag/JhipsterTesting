/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { TaManagementTestModule } from '../../../test.module';
import { FacultyNoteUpdateComponent } from 'app/entities/faculty-note/faculty-note-update.component';
import { FacultyNoteService } from 'app/entities/faculty-note/faculty-note.service';
import { FacultyNote } from 'app/shared/model/faculty-note.model';

describe('Component Tests', () => {
    describe('FacultyNote Management Update Component', () => {
        let comp: FacultyNoteUpdateComponent;
        let fixture: ComponentFixture<FacultyNoteUpdateComponent>;
        let service: FacultyNoteService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TaManagementTestModule],
                declarations: [FacultyNoteUpdateComponent]
            })
                .overrideTemplate(FacultyNoteUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(FacultyNoteUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FacultyNoteService);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity', fakeAsync(() => {
                // GIVEN
                const entity = new FacultyNote(123);
                spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.facultyNote = entity;
                // WHEN
                comp.save();
                tick(); // simulate async

                // THEN
                expect(service.update).toHaveBeenCalledWith(entity);
                expect(comp.isSaving).toEqual(false);
            }));

            it('Should call create service on save for new entity', fakeAsync(() => {
                // GIVEN
                const entity = new FacultyNote();
                spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                comp.facultyNote = entity;
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
