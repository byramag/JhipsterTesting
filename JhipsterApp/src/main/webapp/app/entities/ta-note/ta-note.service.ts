import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ITANote } from 'app/shared/model/ta-note.model';

type EntityResponseType = HttpResponse<ITANote>;
type EntityArrayResponseType = HttpResponse<ITANote[]>;

@Injectable({ providedIn: 'root' })
export class TANoteService {
    public resourceUrl = SERVER_API_URL + 'api/ta-notes';

    constructor(protected http: HttpClient) {}

    create(tANote: ITANote): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(tANote);
        return this.http
            .post<ITANote>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(tANote: ITANote): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(tANote);
        return this.http
            .put<ITANote>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<ITANote>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<ITANote[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    protected convertDateFromClient(tANote: ITANote): ITANote {
        const copy: ITANote = Object.assign({}, tANote, {
            createdOn: tANote.createdOn != null && tANote.createdOn.isValid() ? tANote.createdOn.toJSON() : null
        });
        return copy;
    }

    protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
        if (res.body) {
            res.body.createdOn = res.body.createdOn != null ? moment(res.body.createdOn) : null;
        }
        return res;
    }

    protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        if (res.body) {
            res.body.forEach((tANote: ITANote) => {
                tANote.createdOn = tANote.createdOn != null ? moment(tANote.createdOn) : null;
            });
        }
        return res;
    }
}
