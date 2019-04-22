import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { IApplicant } from 'app/shared/model/applicant.model';
import { ApplicantService } from './applicant.service';

@Component({
    selector: 'jhi-applicant-update',
    templateUrl: './applicant-update.component.html'
})
export class ApplicantUpdateComponent implements OnInit {
    applicant: IApplicant;
    isSaving: boolean;

    constructor(protected applicantService: ApplicantService, protected activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ applicant }) => {
            this.applicant = applicant;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.applicant.id !== undefined) {
            this.subscribeToSaveResponse(this.applicantService.update(this.applicant));
        } else {
            this.subscribeToSaveResponse(this.applicantService.create(this.applicant));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<IApplicant>>) {
        result.subscribe((res: HttpResponse<IApplicant>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    protected onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    protected onSaveError() {
        this.isSaving = false;
    }
}
