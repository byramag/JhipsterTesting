import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IApplicant } from 'app/shared/model/applicant.model';
import { ApplicantService } from './applicant.service';
import { ITA } from 'app/shared/model/ta.model';
import { TAService } from 'app/entities/ta';

@Component({
    selector: 'jhi-applicant-update',
    templateUrl: './applicant-update.component.html'
})
export class ApplicantUpdateComponent implements OnInit {
    applicant: IApplicant;
    isSaving: boolean;

    tas: ITA[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected applicantService: ApplicantService,
        protected tAService: TAService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ applicant }) => {
            this.applicant = applicant;
        });
        this.tAService
            .query({ filter: 'applicant-is-null' })
            .pipe(
                filter((mayBeOk: HttpResponse<ITA[]>) => mayBeOk.ok),
                map((response: HttpResponse<ITA[]>) => response.body)
            )
            .subscribe(
                (res: ITA[]) => {
                    if (!this.applicant.ta || !this.applicant.ta.id) {
                        this.tas = res;
                    } else {
                        this.tAService
                            .find(this.applicant.ta.id)
                            .pipe(
                                filter((subResMayBeOk: HttpResponse<ITA>) => subResMayBeOk.ok),
                                map((subResponse: HttpResponse<ITA>) => subResponse.body)
                            )
                            .subscribe(
                                (subRes: ITA) => (this.tas = [subRes].concat(res)),
                                (subRes: HttpErrorResponse) => this.onError(subRes.message)
                            );
                    }
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );
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

    protected onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackTAById(index: number, item: ITA) {
        return item.id;
    }
}
