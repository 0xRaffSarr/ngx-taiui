import {ModuleWithProviders, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'ngx-taiui/button';

@NgModule({
    imports: [
      CommonModule,
      ButtonModule.forRoot()
    ],
    declarations: [ ],
    exports: [
      ButtonModule
    ]
})
export class NgxTaiuiModule {
  static forRoot(): ModuleWithProviders<NgxTaiuiModule> {
    return { ngModule: NgxTaiuiModule, providers: [] };
  }
}
