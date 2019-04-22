import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IGrading } from 'app/shared/model/grading.model';
import { GradingService } from './grading.service';

@Component({
    selector: 'jhi-grading-delete-dialog',
    templateUrl: './grading-delete-dialog.component.html'
})
export class GradingDeleteDialogComponent {
    grading: IGrading;

    constructor(protected gradingService: GradingService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.gradingService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'gradingListModification',
                content: 'Deleted an grading'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-grading-delete-popup',
    template: ''
})
export class GradingDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ grading }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(GradingDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.grading = grading;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/grading', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/grading', { outlets: { popup: null } }]);
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
