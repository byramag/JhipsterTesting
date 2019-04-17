import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IApplicant } from 'app/shared/model/applicant.model';
import { ApplicantService } from 'app/entities/applicant/applicant.service';

@Component({
    selector: 'jhi-evaluate-delete-dialog',
    templateUrl: './evaluate-delete-dialog.component.html'
})
export class EvaluateDeleteDialogComponent {
    applicant: IApplicant;

    constructor(
        protected applicantService: ApplicantService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.applicantService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'applicantListModification',
                content: 'Deleted an applicant'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-evaluate-delete-popup',
    template: ''
})
export class EvaluateDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ applicant }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(EvaluateDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.applicant = applicant;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/evaluate', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/evaluate', { outlets: { popup: null } }]);
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
