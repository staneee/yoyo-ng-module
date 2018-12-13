import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [CommonModule],
})
export class YoYoUtilModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: YoYoUtilModule,
    };
  }
}
