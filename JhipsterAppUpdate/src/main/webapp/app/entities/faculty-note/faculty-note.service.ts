import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IFacultyNote } from 'app/shared/model/faculty-note.model';

type EntityResponseType = HttpResponse<IFacultyNote>;
type EntityArrayResponseType = HttpResponse<IFacultyNote[]>;

@Injectable({ providedIn: 'root' })
export class FacultyNoteService {
    public resourceUrl = SERVER_API_URL + 'api/faculty-notes';

    constructor(protected http: HttpClient) {}

    create(facultyNote: IFacultyNote): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(facultyNote);
        return this.http
            .post<IFacultyNote>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(facultyNote: IFacultyNote): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(facultyNote);
        return this.http
            .put<IFacultyNote>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IFacultyNote>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IFacultyNote[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    protected convertDateFromClient(facultyNote: IFacultyNote): IFacultyNote {
        const copy: IFacultyNote = Object.assign({}, facultyNote, {
            createdOn: facultyNote.createdOn != null && facultyNote.createdOn.isValid() ? facultyNote.createdOn.toJSON() : null
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
            res.body.forEach((facultyNote: IFacultyNote) => {
                facultyNote.createdOn = facultyNote.createdOn != null ? moment(facultyNote.createdOn) : null;
            });
        }
        return res;
    }
}
