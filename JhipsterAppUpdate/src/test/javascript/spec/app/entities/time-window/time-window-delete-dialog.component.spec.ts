/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { TaManagementTestModule } from '../../../test.module';
import { TimeWindowDeleteDialogComponent } from 'app/entities/time-window/time-window-delete-dialog.component';
import { TimeWindowService } from 'app/entities/time-window/time-window.service';

describe('Component Tests', () => {
    describe('TimeWindow Management Delete Component', () => {
        let comp: TimeWindowDeleteDialogComponent;
        let fixture: ComponentFixture<TimeWindowDeleteDialogComponent>;
        let service: TimeWindowService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TaManagementTestModule],
                declarations: [TimeWindowDeleteDialogComponent]
            })
                .overrideTemplate(TimeWindowDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(TimeWindowDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TimeWindowService);
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
