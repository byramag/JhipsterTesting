/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { TaManagementTestModule } from '../../../test.module';
import { TANoteComponent } from 'app/entities/ta-note/ta-note.component';
import { TANoteService } from 'app/entities/ta-note/ta-note.service';
import { TANote } from 'app/shared/model/ta-note.model';

describe('Component Tests', () => {
    describe('TANote Management Component', () => {
        let comp: TANoteComponent;
        let fixture: ComponentFixture<TANoteComponent>;
        let service: TANoteService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TaManagementTestModule],
                declarations: [TANoteComponent],
                providers: []
            })
                .overrideTemplate(TANoteComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(TANoteComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TANoteService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new TANote(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.tANotes[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
