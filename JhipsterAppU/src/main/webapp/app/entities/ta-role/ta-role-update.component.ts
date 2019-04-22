import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { ITaRole } from 'app/shared/model/ta-role.model';
import { TaRoleService } from './ta-role.service';
import { ITa } from 'app/shared/model/ta.model';
import { TaService } from 'app/entities/ta';

@Component({
    selector: 'jhi-ta-role-update',
    templateUrl: './ta-role-update.component.html'
})
export class TaRoleUpdateComponent implements OnInit {
    taRole: ITaRole;
    isSaving: boolean;

    tas: ITa[];

    constructor(
        protected jhiAlertService: JhiAlertService,
        protected taRoleService: TaRoleService,
        protected taService: TaService,
        protected activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ taRole }) => {
            this.taRole = taRole;
        });
        this.taService
            .query()
            .pipe(
                filter((mayBeOk: HttpResponse<ITa[]>) => mayBeOk.ok),
                map((response: HttpResponse<ITa[]>) => response.body)
            )
            .subscribe((res: ITa[]) => (this.tas = res), (res: HttpErrorResponse) => this.onError(res.message));
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.taRole.id !== undefined) {
            this.subscribeToSaveResponse(this.taRoleService.update(this.taRole));
        } else {
            this.subscribeToSaveResponse(this.taRoleService.create(this.taRole));
        }
    }

    protected subscribeToSaveResponse(result: Observable<HttpResponse<ITaRole>>) {
        result.subscribe((res: HttpResponse<ITaRole>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackTaById(index: number, item: ITa) {
        return item.id;
    }

    getSelected(selectedVals: Array<any>, option: any) {
        if (selectedVals) {
            for (let i = 0; i < selectedVals.length; i++) {
                if (option.id === selectedVals[i].id) {
                    return selectedVals[i];
                }
            }
        }
        return option;
    }
}
