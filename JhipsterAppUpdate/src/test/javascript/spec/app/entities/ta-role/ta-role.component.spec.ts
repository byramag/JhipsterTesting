/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { TaManagementTestModule } from '../../../test.module';
import { TaRoleComponent } from 'app/entities/ta-role/ta-role.component';
import { TaRoleService } from 'app/entities/ta-role/ta-role.service';
import { TaRole } from 'app/shared/model/ta-role.model';

describe('Component Tests', () => {
    describe('TaRole Management Component', () => {
        let comp: TaRoleComponent;
        let fixture: ComponentFixture<TaRoleComponent>;
        let service: TaRoleService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [TaManagementTestModule],
                declarations: [TaRoleComponent],
                providers: []
            })
                .overrideTemplate(TaRoleComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(TaRoleComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TaRoleService);
        });

        it('Should call load all on init', () => {
            // GIVEN
            const headers = new HttpHeaders().append('link', 'link;link');
            spyOn(service, 'query').and.returnValue(
                of(
                    new HttpResponse({
                        body: [new TaRole(123)],
                        headers
                    })
                )
            );

            // WHEN
            comp.ngOnInit();

            // THEN
            expect(service.query).toHaveBeenCalled();
            expect(comp.taRoles[0]).toEqual(jasmine.objectContaining({ id: 123 }));
        });
    });
});
