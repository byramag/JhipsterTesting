/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { TaManagementTestModule } from '../../../test.module';
import { TANoteDeleteDialogComponent } from 'app/entities/ta-note/ta-note-delete-dialog.component';
import { TANoteService } from 'app/entities/ta-note/ta-note.service';

describe('Component Tests', () => {
    describe('TANote Management Delete Component', () => {
        let comp: TANoteDeleteDialogComponent;
        let fixture: ComponentFixture<TANoteDeleteDialogComponent>;
        let service: TANoteService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TaManagementTestModule],
                declarations: [TANoteDeleteDialogComponent]
            })
                .overrideTemplate(TANoteDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(TANoteDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TANoteService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete', inject(
                [],
                fakeAsync(() => {
                    // GIVEN
                    spyOn(service, 'delete').and.returnValue(of({}));

                    // WHEN
                    comp.confirmDelete(123);
                    tick();

                    // THEN
                    expect(service.delete).toHaveBeenCalledWith(123);
                    expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                })
            ));
        });
    });
});
