import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ITA } from 'app/shared/model/ta.model';
import { TAService } from './ta.service';

@Component({
    selector: 'jhi-ta-delete-dialog',
    templateUrl: './ta-delete-dialog.component.html'
})
export class TADeleteDialogComponent {
    tA: ITA;

    constructor(protected tAService: TAService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.tAService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'tAListModification',
                content: 'Deleted an tA'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-ta-delete-popup',
    template: ''
})
export class TADeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ tA }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(TADeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.tA = tA;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/ta', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/ta', { outlets: { popup: null } }]);
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
