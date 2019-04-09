import { NgModule } from '@angular/core';

import { TaManagementSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent } from './';

@NgModule({
    imports: [TaManagementSharedLibsModule],
    declarations: [JhiAlertComponent, JhiAlertErrorComponent],
    exports: [TaManagementSharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent]
})
export class TaManagementSharedCommonModule {}
