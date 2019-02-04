/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TaManagementTestModule } from '../../../test.module';
import { AssignmentDetailComponent } from 'app/entities/assignment/assignment-detail.component';
import { Assignment } from 'app/shared/model/assignment.model';

describe('Component Tests', () => {
    describe('Assignment Management Detail Component', () => {
        let comp: AssignmentDetailComponent;
        let fixture: ComponentFixture<AssignmentDetailComponent>;
        const route = ({ data: of({ assignment: new Assignment(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TaManagementTestModule],
                declarations: [AssignmentDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(AssignmentDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(AssignmentDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.assignment).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
