import { HttpClient } from '@angular/common/http';
import { Component, forwardRef } from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormControl,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-input-image-url',
  templateUrl: './input-image-url.component.html',
  styleUrls: ['./input-image-url.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => InputImageUrlComponent),
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: forwardRef(() => InputImageUrlComponent),
    },
  ],
})
export class InputImageUrlComponent implements ControlValueAccessor, Validator {
  formControl = new FormControl('', [
    Validators.required,
    this.validate.bind(this),
  ]);

  onChange?: (_: string) => void;
  onTouched?: () => void;

  private touched = false;

  constructor(private http: HttpClient) {
    this.formControl.valueChanges.subscribe((newValue: string) => {
      console.log('onchange', newValue);
      if (this.onChange) {
        this.onChange(newValue);
      }
      if (!this.touched && this.onTouched) {
        this.onTouched();
      }
    });
  }

  // Validator

  validate(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (!this.isValidHttpUrl(value)) {
      return { invalidUrl: { value } };
    }
    if (!this.isImage(value)) {
      return { noImageUrl: { value } };
    }
    return null;
  }

  // ControlValueAccessor

  writeValue(obj: string): void {
    this.formControl.setValue(obj);
  }

  registerOnChange(callback: (newValue: string) => void): void {
    this.onChange = callback;
  }

  registerOnTouched(callback: () => void): void {
    this.onTouched = callback;
  }

  private isValidHttpUrl(value: string): boolean {
    let url;
    try {
      url = new URL(value);
    } catch (_) {
      return false;
    }
    return url.protocol === 'http:' || url.protocol === 'https:';
  }

  private isImage(value: string): boolean {
    return value.match(/\.(jpeg|jpg|gif|png)$/) !== null;
  }
}
