/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { TaManagementTestModule } from '../../../test.module';
import { AssignmentDeleteDialogComponent } from 'app/entities/assignment/assignment-delete-dialog.component';
import { AssignmentService } from 'app/entities/assignment/assignment.service';

describe('Component Tests', () => {
    describe('Assignment Management Delete Component', () => {
        let comp: AssignmentDeleteDialogComponent;
        let fixture: ComponentFixture<AssignmentDeleteDialogComponent>;
        let service: AssignmentService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TaManagementTestModule],
                declarations: [AssignmentDeleteDialogComponent]
            })
                .overrideTemplate(AssignmentDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(AssignmentDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AssignmentService);
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
