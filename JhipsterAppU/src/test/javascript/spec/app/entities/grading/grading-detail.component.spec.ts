/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TaManagementTestModule } from '../../../test.module';
import { GradingDetailComponent } from 'app/entities/grading/grading-detail.component';
import { Grading } from 'app/shared/model/grading.model';

describe('Component Tests', () => {
    describe('Grading Management Detail Component', () => {
        let comp: GradingDetailComponent;
        let fixture: ComponentFixture<GradingDetailComponent>;
        const route = ({ data: of({ grading: new Grading(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TaManagementTestModule],
                declarations: [GradingDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(GradingDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(GradingDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.grading).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
