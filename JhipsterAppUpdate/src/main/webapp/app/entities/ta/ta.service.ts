import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ITa } from 'app/shared/model/ta.model';

type EntityResponseType = HttpResponse<ITa>;
type EntityArrayResponseType = HttpResponse<ITa[]>;

@Injectable({ providedIn: 'root' })
export class TaService {
    public resourceUrl = SERVER_API_URL + 'api/tas';

    constructor(protected http: HttpClient) {}

    create(ta: ITa): Observable<EntityResponseType> {
        return this.http.post<ITa>(this.resourceUrl, ta, { observe: 'response' });
    }

    update(ta: ITa): Observable<EntityResponseType> {
        return this.http.put<ITa>(this.resourceUrl, ta, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ITa>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ITa[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
