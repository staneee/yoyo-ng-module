import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { YoYoUtilModule } from 'yoyo-ng-module/src/utils';

import { YoYoSidebarNavComponent } from './sidebar-nav.component';

@NgModule({
  imports: [CommonModule, RouterModule, NgZorroAntdModule, YoYoUtilModule],
  declarations: [YoYoSidebarNavComponent],
  exports: [YoYoSidebarNavComponent],
})
export class YoYoSidebarNavModule {
  static forRoot(): ModuleWithProviders {
    return { ngModule: YoYoSidebarNavModule, providers: [] };
  }
}
