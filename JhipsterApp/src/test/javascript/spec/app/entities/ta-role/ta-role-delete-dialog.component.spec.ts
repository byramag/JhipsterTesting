/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { TaManagementTestModule } from '../../../test.module';
import { TaRoleDeleteDialogComponent } from 'app/entities/ta-role/ta-role-delete-dialog.component';
import { TaRoleService } from 'app/entities/ta-role/ta-role.service';

describe('Component Tests', () => {
    describe('TaRole Management Delete Component', () => {
        let comp: TaRoleDeleteDialogComponent;
        let fixture: ComponentFixture<TaRoleDeleteDialogComponent>;
        let service: TaRoleService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TaManagementTestModule],
                declarations: [TaRoleDeleteDialogComponent]
            })
                .overrideTemplate(TaRoleDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(TaRoleDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TaRoleService);
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
