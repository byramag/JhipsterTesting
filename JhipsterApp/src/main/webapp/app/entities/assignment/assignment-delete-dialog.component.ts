import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IAssignment } from 'app/shared/model/assignment.model';
import { AssignmentService } from './assignment.service';

@Component({
    selector: 'jhi-assignment-delete-dialog',
    templateUrl: './assignment-delete-dialog.component.html'
})
export class AssignmentDeleteDialogComponent {
    assignment: IAssignment;

    constructor(
        protected assignmentService: AssignmentService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.assignmentService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'assignmentListModification',
                content: 'Deleted an assignment'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-assignment-delete-popup',
    template: ''
})
export class AssignmentDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ assignment }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(AssignmentDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.assignment = assignment;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/assignment', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/assignment', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}
