import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ITANote } from 'app/shared/model/ta-note.model';
import { TANoteService } from './ta-note.service';

@Component({
    selector: 'jhi-ta-note-delete-dialog',
    templateUrl: './ta-note-delete-dialog.component.html'
})
export class TANoteDeleteDialogComponent {
    tANote: ITANote;

    constructor(protected tANoteService: TANoteService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.tANoteService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'tANoteListModification',
                content: 'Deleted an tANote'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-ta-note-delete-popup',
    template: ''
})
export class TANoteDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ tANote }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(TANoteDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.tANote = tANote;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/ta-note', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/ta-note', { outlets: { popup: null } }]);
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
