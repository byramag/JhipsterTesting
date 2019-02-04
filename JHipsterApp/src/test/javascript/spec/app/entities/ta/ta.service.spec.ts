/* tslint:disable max-line-length */
import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { take, map } from 'rxjs/operators';
import { TAService } from 'app/entities/ta/ta.service';
import { ITA, TA } from 'app/shared/model/ta.model';

describe('Service Tests', () => {
    describe('TA Service', () => {
        let injector: TestBed;
        let service: TAService;
        let httpMock: HttpTestingController;
        let elemDefault: ITA;
        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [HttpClientTestingModule]
            });
            injector = getTestBed();
            service = injector.get(TAService);
            httpMock = injector.get(HttpTestingController);

            elemDefault = new TA(
                0,
                'AAAAAAA',
                'AAAAAAA',
                'AAAAAAA',
                'AAAAAAA',
                'AAAAAAA',
                'AAAAAAA',
                'AAAAAAA',
                'AAAAAAA',
                'AAAAAAA',
                'AAAAAAA',
                'AAAAAAA'
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

            it('should create a TA', async () => {
                const returnedFromService = Object.assign(
                    {
                        id: 0
                    },
                    elemDefault
                );
                const expected = Object.assign({}, returnedFromService);
                service
                    .create(new TA(null))
                    .pipe(take(1))
                    .subscribe(resp => expect(resp).toMatchObject({ body: expected }));
                const req = httpMock.expectOne({ method: 'POST' });
                req.flush(JSON.stringify(returnedFromService));
            });

            it('should update a TA', async () => {
                const returnedFromService = Object.assign(
                    {
                        studentName: 'BBBBBB',
                        vNumber: 'BBBBBB',
                        email: 'BBBBBB',
                        classYear: 'BBBBBB',
                        currentAssign: 'BBBBBB',
                        previousAssign: 'BBBBBB',
                        ptdLabTA: 'BBBBBB',
                        ptdClassTA: 'BBBBBB',
                        ptdTestGrade: 'BBBBBB',
                        ptdOfficeHours: 'BBBBBB',
                        acceptedCourses: 'BBBBBB'
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

            it('should return a list of TA', async () => {
                const returnedFromService = Object.assign(
                    {
                        studentName: 'BBBBBB',
                        vNumber: 'BBBBBB',
                        email: 'BBBBBB',
                        classYear: 'BBBBBB',
                        currentAssign: 'BBBBBB',
                        previousAssign: 'BBBBBB',
                        ptdLabTA: 'BBBBBB',
                        ptdClassTA: 'BBBBBB',
                        ptdTestGrade: 'BBBBBB',
                        ptdOfficeHours: 'BBBBBB',
                        acceptedCourses: 'BBBBBB'
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

            it('should delete a TA', async () => {
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
