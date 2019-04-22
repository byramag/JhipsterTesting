import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { ITaRole } from 'app/shared/model/ta-role.model';

type EntityResponseType = HttpResponse<ITaRole>;
type EntityArrayResponseType = HttpResponse<ITaRole[]>;

@Injectable({ providedIn: 'root' })
export class TaRoleService {
    public resourceUrl = SERVER_API_URL + 'api/ta-roles';

    constructor(protected http: HttpClient) {}

    create(taRole: ITaRole): Observable<EntityResponseType> {
        return this.http.post<ITaRole>(this.resourceUrl, taRole, { observe: 'response' });
    }

    update(taRole: ITaRole): Observable<EntityResponseType> {
        return this.http.put<ITaRole>(this.resourceUrl, taRole, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ITaRole>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<ITaRole[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
