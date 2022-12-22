import {
  Directive,
  forwardRef,
  HostBinding,
  HostListener,
  Input,
  OnInit,
  Provider,
  ChangeDetectorRef, Output, EventEmitter
} from '@angular/core';

import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export const CHECKBOX_CONTROL_VALUE_ACCESSOR: Provider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => ButtonCheckDirective),
  multi: true
};

type btnAcceptedValue = boolean | string | number;

@Directive({
  selector: '[tuiBtnCheck]',
  providers: [ CHECKBOX_CONTROL_VALUE_ACCESSOR ]
})
export class ButtonCheckDirective implements ControlValueAccessor, OnInit {

  @Input() btnCheckedValue: btnAcceptedValue = true;
  @Input() btnUncheckedValue: btnAcceptedValue = false;

  @HostBinding('attr.disabled')
  @Input() disabled!: boolean | string | undefined;

  @HostBinding('class.checked') checked = false;
  @Output() change = new EventEmitter();

  protected btnValue?: btnAcceptedValue;

  protected onChange = Function.prototype;
  protected onTouched = Function.prototype;

  constructor(
    private ref: ChangeDetectorRef
  ) {}

  @HostListener('click')
  onClick(): void {
    this.toggle(this.btnValue !== this.btnCheckedValue);
    this.onChange(this.btnValue);
    this.ref.detectChanges();
    this.change.emit(this.btnValue);
  }

  ngOnInit() {
    this.toggle(this.btnValue === this.btnCheckedValue);
  }

  registerOnChange(fn: () => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    if(!isDisabled) this.disabled = undefined;
    else this.disabled = isDisabled;
  }

  writeValue(value: boolean | string | null): void {
    this.toggle(!!value);
  }

  private toggle(state: boolean) {
    this.checked = state;
    this.btnValue = state ? this.btnCheckedValue : this.btnUncheckedValue;
  }
}
