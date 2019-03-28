import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { IApplicant } from 'app/shared/model/applicant.model';
import { ApplicantService } from 'app/entities/applicant/applicant.service';

@Component({
    selector: 'jhi-assign',
    templateUrl: './assign.component.html'
})
export class AssignComponent implements OnInit {
    ngOnInit() {}
}
