/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TaManagementTestModule } from '../../../test.module';
import { TaDetailComponent } from 'app/entities/ta/ta-detail.component';
import { Ta } from 'app/shared/model/ta.model';

describe('Component Tests', () => {
    describe('Ta Management Detail Component', () => {
        let comp: TaDetailComponent;
        let fixture: ComponentFixture<TaDetailComponent>;
        const route = ({ data: of({ ta: new Ta(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TaManagementTestModule],
                declarations: [TaDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(TaDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(TaDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.ta).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
