/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { TaManagementTestModule } from '../../../test.module';
import { GradingDeleteDialogComponent } from 'app/entities/grading/grading-delete-dialog.component';
import { GradingService } from 'app/entities/grading/grading.service';

describe('Component Tests', () => {
    describe('Grading Management Delete Component', () => {
        let comp: GradingDeleteDialogComponent;
        let fixture: ComponentFixture<GradingDeleteDialogComponent>;
        let service: GradingService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TaManagementTestModule],
                declarations: [GradingDeleteDialogComponent]
            })
                .overrideTemplate(GradingDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(GradingDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(GradingService);
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
