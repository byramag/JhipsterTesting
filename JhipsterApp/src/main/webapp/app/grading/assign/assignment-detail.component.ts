import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpErrorResponse, HttpResponse, HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService, JhiDataUtils } from 'ng-jhipster';
import { AccountService } from 'app/core';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IAssignment } from 'app/shared/model/assignment.model';

import { ITa } from 'app/shared/model/ta.model';
import { TaService } from 'app/entities/ta/ta.service';

import { IDocument } from 'app/shared/model/document.model';
import { DocumentService } from 'app/entities/document/document.service';

@Component({
    selector: 'jhi-assignment-detail',
    templateUrl: './assignment-detail.component.html'
})
export class AssignmentDetailComponent implements OnInit, AfterViewInit {
    assignment: IAssignment;

    ta: ITa;
    tas: ITa[];

    taNames: ITa[];
    taIDs: ITa[];
    assignmentIDs: IAssignment[];

    document: IDocument;
    documents: IDocument[];
    isSaving: boolean;

    currentAccount: any;
    eventSubscriber: Subscription;
    public resourceUrl = SERVER_API_URL + 'api/tas';

    selectedOption: String = '';
    modal: any;
    btn: any;
    span: any;

    constructor(
        protected activatedRoute: ActivatedRoute,
        protected taService: TaService,
        protected jhiAlertService: JhiAlertService,
        protected eventManager: JhiEventManager,
        protected accountService: AccountService,
        protected http: HttpClient,
        protected dataUtils: JhiDataUtils,
        protected documentService: DocumentService
    ) {}

    ngOnInit() {
        this.loadAll();
        this.activatedRoute.data.subscribe(({ assignment, ta, document }) => {
            this.assignment = assignment;
            this.ta = ta;
            this.document = document;
        });
        this.modal = null;
        this.btn = null;
        this.span = null;
        this.taNames = [];
        this.taIDs = [];
        this.assignmentIDs = [];
        this.registerChangeInDocuments();
    }
    ngAfterViewInit(): void {
        // Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
        // Add 'implements AfterViewInit' to the class.
        this.modal = document.getElementById('myModal');
        this.btn = document.getElementById('myBtn');
        this.span = document.getElementsByClassName('close')[0];
    }

    previousState() {
        window.history.back();
    }

    trackId(index: number, item: ITa) {
        return item.id;
    }

    registerChangeInTas() {
        this.eventSubscriber = this.eventManager.subscribe('taListModification', response => this.loadAll());
    }

    loadAll() {
        this.taService
            .query()
            .pipe(
                filter((res: HttpResponse<ITa[]>) => res.ok),
                map((res: HttpResponse<ITa[]>) => res.body)
            )
            .subscribe(
                (res: ITa[]) => {
                    this.tas = res;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
        this.documentService
            .query()
            .pipe(
                filter((res: HttpResponse<IDocument[]>) => res.ok),
                map((res: HttpResponse<IDocument[]>) => res.body)
            )
            .subscribe(
                (res: IDocument[]) => {
                    this.documents = res;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
    }

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    public addTASelected(event): void {
        this.modal.style.display = 'block';
        console.log('clicked');
    }
    public closePopup(): void {
        this.modal.style.display = 'none';
    }
    public addthisTA(taID: ITa, taName: ITa, assignmentID: IAssignment): void {
        let i = 0;
        let taAdded = false;
        for (i = 0; i < this.taNames.length; i++) {
            if (this.taNames[i] === taName) {
                alert('TA Already on this assignment!');
                taAdded = true;
            }
        }

        if (taAdded === false) {
            alert('added: ' + taName);
            this.taNames.push(taName);
            this.taIDs.push(taID);
            this.assignmentIDs.push(assignmentID);
        }
    }

    setFileData(event, entity, field, isImage) {
        this.dataUtils.setFileData(event, entity, field, isImage);
    }
    openFile(contentType, field) {
        return this.dataUtils.openFile(contentType, field);
    }
    save() {
        this.isSaving = true;
        if (this.document.id !== undefined) {
            this.subscribeToSaveResponse(this.documentService.update(this.document));
        } else {
            this.subscribeToSaveResponse(this.documentService.create(this.document));
        }
    }
    protected onSaveError() {
        this.isSaving = false;
    }
    protected subscribeToSaveResponse(result: Observable<HttpResponse<IDocument>>) {
        result.subscribe((res: HttpResponse<IDocument>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }
    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    registerChangeInDocuments() {
        this.eventSubscriber = this.eventManager.subscribe('documentListModification', response => this.loadAll());
    }
}
