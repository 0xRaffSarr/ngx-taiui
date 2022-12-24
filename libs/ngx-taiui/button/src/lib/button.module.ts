import {ModuleWithProviders, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonCheckDirective } from './button-check.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [
    ButtonCheckDirective
  ],
  exports: [
    ButtonCheckDirective
  ]
})
export class ButtonModule {
  static forRoot(): ModuleWithProviders<ButtonModule> {
    return { ngModule: ButtonModule, providers: [] };
  }
}
