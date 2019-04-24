import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IGrading } from 'app/shared/model/grading.model';

type EntityResponseType = HttpResponse<IGrading>;
type EntityArrayResponseType = HttpResponse<IGrading[]>;

@Injectable({ providedIn: 'root' })
export class GradingService {
    public resourceUrl = SERVER_API_URL + 'api/gradings';

    constructor(protected http: HttpClient) {}

    create(grading: IGrading): Observable<EntityResponseType> {
        grading.status = 'Assigned';
        return this.http.post<IGrading>(this.resourceUrl, grading, { observe: 'response' });
    }

    update(grading: IGrading): Observable<EntityResponseType> {
        return this.http.put<IGrading>(this.resourceUrl, grading, { observe: 'response' });
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<IGrading>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http.get<IGrading[]>(this.resourceUrl, { params: options, observe: 'response' });
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }
}
