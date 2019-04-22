/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TaManagementTestModule } from '../../../test.module';
import { FacultyNoteDetailComponent } from 'app/entities/faculty-note/faculty-note-detail.component';
import { FacultyNote } from 'app/shared/model/faculty-note.model';

describe('Component Tests', () => {
    describe('FacultyNote Management Detail Component', () => {
        let comp: FacultyNoteDetailComponent;
        let fixture: ComponentFixture<FacultyNoteDetailComponent>;
        const route = ({ data: of({ facultyNote: new FacultyNote(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TaManagementTestModule],
                declarations: [FacultyNoteDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(FacultyNoteDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(FacultyNoteDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.facultyNote).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
