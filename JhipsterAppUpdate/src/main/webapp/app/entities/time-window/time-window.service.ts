import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ITimeWindow } from 'app/shared/model/time-window.model';

type EntityResponseType = HttpResponse<ITimeWindow>;
type EntityArrayResponseType = HttpResponse<ITimeWindow[]>;

@Injectable({ providedIn: 'root' })
export class TimeWindowService {
    public resourceUrl = SERVER_API_URL + 'api/time-windows';

    constructor(protected http: HttpClient) {}

    create(timeWindow: ITimeWindow): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(timeWindow);
        return this.http
            .post<ITimeWindow>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(timeWindow: ITimeWindow): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(timeWindow);
        return this.http
            .put<ITimeWindow>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<ITimeWindow>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<ITimeWindow[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    protected convertDateFromClient(timeWindow: ITimeWindow): ITimeWindow {
        const copy: ITimeWindow = Object.assign({}, timeWindow, {
            startTime: timeWindow.startTime != null && timeWindow.startTime.isValid() ? timeWindow.startTime.toJSON() : null,
            endTime: timeWindow.endTime != null && timeWindow.endTime.isValid() ? timeWindow.endTime.toJSON() : null
        });
        return copy;
    }

    protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
        if (res.body) {
            res.body.startTime = res.body.startTime != null ? moment(res.body.startTime) : null;
            res.body.endTime = res.body.endTime != null ? moment(res.body.endTime) : null;
        }
        return res;
    }

    protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        if (res.body) {
            res.body.forEach((timeWindow: ITimeWindow) => {
                timeWindow.startTime = timeWindow.startTime != null ? moment(timeWindow.startTime) : null;
                timeWindow.endTime = timeWindow.endTime != null ? moment(timeWindow.endTime) : null;
            });
        }
        return res;
    }
}
