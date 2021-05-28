import { HttpClient } from '@angular/common/http';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import {
  AbstractControl,
  FormControl,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-input-image-url',
  templateUrl: './input-image-url.component.html',
  styleUrls: ['./input-image-url.component.scss'],
})
export class InputImageUrlComponent implements OnChanges {
  @Input()
  image = '';

  @Output()
  urlChange = new EventEmitter<string>();

  formControl = new FormControl('', [Validators.required, this.urlValidator()]);

  constructor(private http: HttpClient) {}

  ngOnChanges(changes: SimpleChanges): void {
    const newValue = changes.image?.currentValue;
    if (newValue) {
      this.formControl.setValue(newValue);
    }
  }

  invalid(): boolean {
    const value = this.formControl.value;
    return !(this.isValidHttpUrl(value) && this.isImage(value));
  }

  private urlValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      const valid = this.isValidHttpUrl(value) && this.isImage(value);
      return valid ? null : { invalidUrl: { value: control.value } };
    };
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
