/* tslint:disable max-line-length */
import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { take, map } from 'rxjs/operators';
import { ApplicantService } from 'app/entities/applicant/applicant.service';
import { IApplicant, Applicant } from 'app/shared/model/applicant.model';

describe('Service Tests', () => {
    describe('Applicant Service', () => {
        let injector: TestBed;
        let service: ApplicantService;
        let httpMock: HttpTestingController;
        let elemDefault: IApplicant;
        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [HttpClientTestingModule]
            });
            injector = getTestBed();
            service = injector.get(ApplicantService);
            httpMock = injector.get(HttpTestingController);

            elemDefault = new Applicant(
                0,
                'AAAAAAA',
                'AAAAAAA',
                'AAAAAAA',
                'AAAAAAA',
                0,
                'AAAAAAA',
                'AAAAAAA',
                'AAAAAAA',
                'AAAAAAA',
                'AAAAAAA',
                'AAAAAAA',
                'AAAAAAA',
                false
            );
        });

        describe('Service methods', async () => {
            it('should find an element', async () => {
                const returnedFromService = Object.assign({}, elemDefault);
                service
                    .find(123)
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: elemDefault }));

                const req = httpMock.expectOne({ method: 'GET' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should create a Applicant', async () => {
                const returnedFromService = Object.assign(
                    {
                        id: 0
                    },
                    elemDefault
                );
                const expected = Object.assign({}, returnedFromService);
                service
                    .create(new Applicant(null))
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: expected }));
                const req = httpMock.expectOne({ method: 'POST' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should update a Applicant', async () => {
                const returnedFromService = Object.assign(
                    {
                        name: 'BBBBBB',
                        email: 'BBBBBB',
                        vNum: 'BBBBBB',
                        classYear: 'BBBBBB',
                        expectedGradYear: 1,
                        expectedGradSemester: 'BBBBBB',
                        statement: 'BBBBBB',
                        grade255: 'BBBBBB',
                        grade256: 'BBBBBB',
                        grade257: 'BBBBBB',
                        referenceEmail: 'BBBBBB',
                        referenceResponse: 'BBBBBB',
                        isRecommended: true
                    },
                    elemDefault
                );

                const expected = Object.assign({}, returnedFromService);
                service
                    .update(expected)
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: expected }));
                const req = httpMock.expectOne({ method: 'PUT' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should return a list of Applicant', async () => {
                const returnedFromService = Object.assign(
                    {
                        name: 'BBBBBB',
                        email: 'BBBBBB',
                        vNum: 'BBBBBB',
                        classYear: 'BBBBBB',
                        expectedGradYear: 1,
                        expectedGradSemester: 'BBBBBB',
                        statement: 'BBBBBB',
                        grade255: 'BBBBBB',
                        grade256: 'BBBBBB',
                        grade257: 'BBBBBB',
                        referenceEmail: 'BBBBBB',
                        referenceResponse: 'BBBBBB',
                        isRecommended: true
                    },
                    elemDefault
                );
                const expected = Object.assign({}, returnedFromService);
                service
                    .query(expected)
                    .pipe(
                        take(1),
                        map(resp => resp.body)
                    )
                    .subscribe(body => expect(body).toContainEqual(expected));
                const req = httpMock.expectOne({ method: 'GET' });
                req.flush(JSON.stringify([returnedFromService]));
                httpMock.verify();
            });

            it('should delete a Applicant', async () => {
                const rxPromise = service.delete(123).subscribe(resp => expect(resp.ok));

                const req = httpMock.expectOne({ method: 'DELETE' });
                req.flush({ status: 200 });
            });
        });

        afterEach(() => {
            httpMock.verify();
        });
    });
});
