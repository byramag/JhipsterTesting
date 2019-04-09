import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ITa } from 'app/shared/model/ta.model';
import { TaService } from './ta.service';

@Component({
    selector: 'jhi-ta-delete-dialog',
    templateUrl: './ta-delete-dialog.component.html'
})
export class TaDeleteDialogComponent {
    ta: ITa;

    constructor(protected taService: TaService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.taService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'taListModification',
                content: 'Deleted an ta'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-ta-delete-popup',
    template: ''
})
export class TaDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ ta }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(TaDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.ta = ta;
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
