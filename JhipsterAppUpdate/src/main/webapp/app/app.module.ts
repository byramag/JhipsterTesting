import './vendor.ts';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgbDatepickerConfig } from '@ng-bootstrap/ng-bootstrap';
import { Ng2Webstorage } from 'ngx-webstorage';
import { NgJhipsterModule } from 'ng-jhipster';

import { AuthInterceptor } from './blocks/interceptor/auth.interceptor';
import { AuthExpiredInterceptor } from './blocks/interceptor/auth-expired.interceptor';
import { ErrorHandlerInterceptor } from './blocks/interceptor/errorhandler.interceptor';
import { NotificationInterceptor } from './blocks/interceptor/notification.interceptor';
import { TaManagementSharedModule } from 'app/shared';
import { TaManagementCoreModule } from 'app/core';
import { TaManagementAppRoutingModule } from './app-routing.module';
import { TaManagementHomeModule } from './home/home.module';
import { TaManagementAccountModule } from './account/account.module';
import { TaManagementEntityModule } from './entities/entity.module';
import { TaManagementApplicationModule } from './application/application.module';
import { TaManagementTaHandbookModule } from './taHandbook/taHandbook.module';
import * as moment from 'moment';
// jhipster-needle-angular-add-module-import JHipster will add new module here
import { JhiMainComponent, NavbarComponent, FooterComponent, PageRibbonComponent, ErrorComponent } from './layouts';

@NgModule({
    imports: [
        BrowserModule,
        Ng2Webstorage.forRoot({ prefix: 'jhi', separator: '-' }),
        NgJhipsterModule.forRoot({
            // set below to true to make alerts look like toast
            alertAsToast: false,
            alertTimeout: 5000
        }),
        TaManagementSharedModule.forRoot(),
        TaManagementCoreModule,
        TaManagementHomeModule,
        TaManagementAccountModule,
        // jhipster-needle-angular-add-module JHipster will add new module here
        TaManagementEntityModule,
        TaManagementApplicationModule,
        TaManagementTaHandbookModule,
        TaManagementAppRoutingModule
    ],
    declarations: [JhiMainComponent, NavbarComponent, ErrorComponent, PageRibbonComponent, FooterComponent],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthExpiredInterceptor,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ErrorHandlerInterceptor,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: NotificationInterceptor,
            multi: true
        }
    ],
    bootstrap: [JhiMainComponent]
})
export class TaManagementAppModule {
    constructor(private dpConfig: NgbDatepickerConfig) {
        this.dpConfig.minDate = { year: moment().year() - 100, month: 1, day: 1 };
    }
}
