/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TaManagementTestModule } from '../../../test.module';
import { TANoteDetailComponent } from 'app/entities/ta-note/ta-note-detail.component';
import { TANote } from 'app/shared/model/ta-note.model';

describe('Component Tests', () => {
    describe('TANote Management Detail Component', () => {
        let comp: TANoteDetailComponent;
        let fixture: ComponentFixture<TANoteDetailComponent>;
        const route = ({ data: of({ tANote: new TANote(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TaManagementTestModule],
                declarations: [TANoteDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(TANoteDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(TANoteDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.tANote).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
