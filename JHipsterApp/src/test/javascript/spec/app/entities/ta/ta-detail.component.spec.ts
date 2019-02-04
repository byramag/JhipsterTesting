/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TaManagementTestModule } from '../../../test.module';
import { TADetailComponent } from 'app/entities/ta/ta-detail.component';
import { TA } from 'app/shared/model/ta.model';

describe('Component Tests', () => {
    describe('TA Management Detail Component', () => {
        let comp: TADetailComponent;
        let fixture: ComponentFixture<TADetailComponent>;
        const route = ({ data: of({ tA: new TA(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TaManagementTestModule],
                declarations: [TADetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(TADetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(TADetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.tA).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
