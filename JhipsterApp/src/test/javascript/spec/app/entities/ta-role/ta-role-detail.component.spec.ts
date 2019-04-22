/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TaManagementTestModule } from '../../../test.module';
import { TaRoleDetailComponent } from 'app/entities/ta-role/ta-role-detail.component';
import { TaRole } from 'app/shared/model/ta-role.model';

describe('Component Tests', () => {
    describe('TaRole Management Detail Component', () => {
        let comp: TaRoleDetailComponent;
        let fixture: ComponentFixture<TaRoleDetailComponent>;
        const route = ({ data: of({ taRole: new TaRole(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TaManagementTestModule],
                declarations: [TaRoleDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(TaRoleDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(TaRoleDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.taRole).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
