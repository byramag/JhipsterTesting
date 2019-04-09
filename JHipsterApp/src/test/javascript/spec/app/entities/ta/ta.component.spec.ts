/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { TaManagementTestModule } from '../../../test.module';
import { TAComponent } from 'app/entities/ta/ta.component';
import { TAService } from 'app/entities/ta/ta.service';
import { TA } from 'app/shared/model/ta.model';

describe('Component Tests', () => {
    describe('TA Management Component', () => {
        let comp: TAComponent;
        let fixture: ComponentFixture<TAComponent>;
        let service: TAService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TaManagementTestModule],
                declarations: [TAComponent],
                providers: []
            })
                .overrideTemplate(TAComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(TAComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TAService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new TA(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.tAS[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
