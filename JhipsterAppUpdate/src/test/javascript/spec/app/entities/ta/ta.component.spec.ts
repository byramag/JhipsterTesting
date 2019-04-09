/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { TaManagementTestModule } from '../../../test.module';
import { TaComponent } from 'app/entities/ta/ta.component';
import { TaService } from 'app/entities/ta/ta.service';
import { Ta } from 'app/shared/model/ta.model';

describe('Component Tests', () => {
    describe('Ta Management Component', () => {
        let comp: TaComponent;
        let fixture: ComponentFixture<TaComponent>;
        let service: TaService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TaManagementTestModule],
                declarations: [TaComponent],
                providers: []
            })
                .overrideTemplate(TaComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(TaComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TaService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new Ta(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.tas[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
