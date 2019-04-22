/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { TaManagementTestModule } from '../../../test.module';
import { FacultyNoteComponent } from 'app/entities/faculty-note/faculty-note.component';
import { FacultyNoteService } from 'app/entities/faculty-note/faculty-note.service';
import { FacultyNote } from 'app/shared/model/faculty-note.model';

describe('Component Tests', () => {
    describe('FacultyNote Management Component', () => {
        let comp: FacultyNoteComponent;
        let fixture: ComponentFixture<FacultyNoteComponent>;
        let service: FacultyNoteService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TaManagementTestModule],
                declarations: [FacultyNoteComponent],
                providers: []
            })
                .overrideTemplate(FacultyNoteComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(FacultyNoteComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FacultyNoteService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new FacultyNote(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.facultyNotes[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
