/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { TaManagementTestModule } from '../../../test.module';
import { GradingComponent } from 'app/entities/grading/grading.component';
import { GradingService } from 'app/entities/grading/grading.service';
import { Grading } from 'app/shared/model/grading.model';

describe('Component Tests', () => {
    describe('Grading Management Component', () => {
        let comp: GradingComponent;
        let fixture: ComponentFixture<GradingComponent>;
        let service: GradingService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TaManagementTestModule],
                declarations: [GradingComponent],
                providers: []
            })
                .overrideTemplate(GradingComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(GradingComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(GradingService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Grading(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.gradings[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
