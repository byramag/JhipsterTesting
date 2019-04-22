import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ITaRole } from 'app/shared/model/ta-role.model';
import { TaRoleService } from './ta-role.service';

@Component({
    selector: 'jhi-ta-role-delete-dialog',
    templateUrl: './ta-role-delete-dialog.component.html'
})
export class TaRoleDeleteDialogComponent {
    taRole: ITaRole;

    constructor(protected taRoleService: TaRoleService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.taRoleService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'taRoleListModification',
                content: 'Deleted an taRole'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-ta-role-delete-popup',
    template: ''
})
export class TaRoleDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ taRole }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(TaRoleDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.taRole = taRole;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/ta-role', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/ta-role', { outlets: { popup: null } }]);
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
