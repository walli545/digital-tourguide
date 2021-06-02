import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
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
import { PointOfInterest, PointOfInterestService } from '../../../api';

@Component({
  selector: 'app-poi-order',
  templateUrl: './poi-order.component.html',
  styleUrls: ['./poi-order.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => PoiOrderComponent),
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: forwardRef(() => PoiOrderComponent),
    },
  ],
})
export class PoiOrderComponent implements ControlValueAccessor, Validator {
  formControl = new FormControl(
    [],
    [Validators.required, this.validate.bind(this)]
  );

  onChange?: (_: PointOfInterest[]) => void;
  onTouched?: () => void;

  private touched = false;

  constructor(public poiService: PointOfInterestService) {}

  // Validator

  validate(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (value.length < 2) {
      return { selectAtLeastTwo: { value } };
    }
    if (this.containsTwoInRow()) {
      return { twoInRow: { value } };
    }
    return null;
  }

  // ControlValueAccessor

  writeValue(obj: PointOfInterest[]): void {
    this.formControl.setValue(obj);
  }

  registerOnChange(callback: (newValue: PointOfInterest[]) => void): void {
    this.onChange = callback;
  }

  registerOnTouched(callback: () => void): void {
    this.onTouched = callback;
  }

  drop(event: CdkDragDrop<PointOfInterest[]>): void {
    const current = this.formControl.value;
    moveItemInArray(current, event.previousIndex, event.currentIndex);
    this.formControl.setValue(current);
    this.emitChangeEvent();
  }

  remove(i: number): void {
    const current = this.formControl.value;
    current.splice(i, 1);
    this.formControl.setValue(current);
    this.emitChangeEvent();
  }

  add(poi: PointOfInterest): void {
    const current = this.formControl.value;
    current.push(poi);
    this.formControl.setValue(current);
    this.emitChangeEvent();
  }

  showDragList(): boolean {
    return this.formControl.value.length > 0;
  }

  private containsTwoInRow(): boolean {
    for (let i = 0; i < this.formControl.value.length - 1; i++) {
      if (
        this.formControl.value[i].poIID === this.formControl.value[i + 1].poIID
      ) {
        return true;
      }
    }
    return false;
  }

  private emitChangeEvent(): void {
    if (this.onChange) {
      this.onChange(this.formControl.value);
    }
    if (!this.touched && this.onTouched) {
      this.onTouched();
    }
  }
}
