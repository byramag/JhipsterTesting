import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ITA } from 'app/shared/model/ta.model';

type EntityResponseType = HttpResponse<ITA>;
type EntityArrayResponseType = HttpResponse<ITA[]>;

@Injectable({ providedIn: 'root' })
export class TAService {
    public resourceUrl = SERVER_API_URL + 'api/tas';

    constructor(protected http: HttpClient) {}

    create(tA: ITA): Observable<EntityResponseType> {
        return this.http.post<ITA>(this.resourceUrl, tA, { observe: 'response' });
    }

    update(tA: ITA): Observable<EntityResponseType> {
        return this.http.put<ITA>(this.resourceUrl, tA, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ITA>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ITA[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
