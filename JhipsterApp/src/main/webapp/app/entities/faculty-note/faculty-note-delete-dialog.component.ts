import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IFacultyNote } from 'app/shared/model/faculty-note.model';
import { FacultyNoteService } from './faculty-note.service';

@Component({
    selector: 'jhi-faculty-note-delete-dialog',
    templateUrl: './faculty-note-delete-dialog.component.html'
})
export class FacultyNoteDeleteDialogComponent {
    facultyNote: IFacultyNote;

    constructor(
        protected facultyNoteService: FacultyNoteService,
        public activeModal: NgbActiveModal,
        protected eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.facultyNoteService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'facultyNoteListModification',
                content: 'Deleted an facultyNote'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-faculty-note-delete-popup',
    template: ''
})
export class FacultyNoteDeletePopupComponent implements OnInit, OnDestroy {
    protected ngbModalRef: NgbModalRef;

    constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ facultyNote }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(FacultyNoteDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.facultyNote = facultyNote;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate(['/faculty-note', { outlets: { popup: null } }]);
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate(['/faculty-note', { outlets: { popup: null } }]);
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
