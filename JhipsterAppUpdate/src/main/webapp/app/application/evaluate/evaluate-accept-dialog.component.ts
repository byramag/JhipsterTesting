import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IApplicant } from 'app/shared/model/applicant.model';
import { ApplicantService } from 'app/entities/applicant/applicant.service';

// TESTING ACCEPT
import { TaService } from 'app/entities/ta';

import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ITa } from 'app/shared/model/ta.model';
// */

@Component({
    selector: 'jhi-evaluate-accept-dialog',
    templateUrl: './evaluate-accept-dialog.component.html'
})
export class EvaluateAcceptDialogComponent {
    applicant: IApplicant;
    // TESTING ACCEPT
    isSaving: boolean;
    // */
    constructor(
        protected applicantService: ApplicantService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
        // TESTING ACCEPT
        , protected taService: TaService
        // */
    ) { }

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

    // TESTING ACCEPT
    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.applicant.id !== undefined) {
            this.subscribeToSaveResponse(this.taService.update(this.applicant));
        } else {
            this.subscribeToSaveResponse(this.taService.create(this.applicant));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<ITa>>) {
        result.subscribe((res: HttpResponse<ITa>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }
    // */
}

@Component({
    selector: 'jhi-evaluate-delete-popup',
    template: ''
})
export class EvaluateAcceptPopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) { }

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ applicant }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(EvaluateAcceptDialogComponent as Component, { size: 'lg', backdrop: 'static' });
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
