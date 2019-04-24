import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { IApplicant } from 'app/shared/model/applicant.model';
import { ApplicantService } from 'app/entities/applicant/applicant.service';

@Component({
    selector: 'jhi-apply',
    templateUrl: './apply.component.html'
})
export class ApplyComponent implements OnInit, AfterViewInit {
    applicant: IApplicant;
    isSaving: boolean;

    currentDate: Date;
    currentYear: number;
    expectedGradYearSelectValues: Array<number>;
    expectedGradSemesterValues: Array<string>;
    gradeValues: Array<string>;

    constructor(protected applicantService: ApplicantService, protected activatedRoute: ActivatedRoute) {
        this.currentDate = new Date();
        this.currentYear = this.currentDate.getFullYear();
        this.expectedGradYearSelectValues = [];
        this.expectedGradSemesterValues = [];
        this.gradeValues = [];
        this.gradeValues.push('A');
        this.gradeValues.push('B');
        this.gradeValues.push('C');
        this.gradeValues.push('D');
        this.gradeValues.push('F');
        this.gradeValues.push('Not Applicable');
        this.expectedGradSemesterValues.push('Fall');
        this.expectedGradSemesterValues.push('Spring');
        this.expectedGradSemesterValues.push('Summer');
        this.expectedGradYearSelectValues.push(this.currentYear);
        this.expectedGradYearSelectValues.push(this.currentYear + 1);
        this.expectedGradYearSelectValues.push(this.currentYear + 2);
        this.expectedGradYearSelectValues.push(this.currentYear + 3);
        this.expectedGradYearSelectValues.push(this.currentYear + 4);
    }

    ngOnInit() {
        this.isSaving = false;
        this.applicant = {};
    }

    ngAfterViewInit() {
        //  const x = document.getElementById('field_expectedGradYear') as HTMLSelectElement;
        // x.selectedIndex = 1;
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.subscribeToSaveResponse(this.applicantService.create(this.applicant));
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
