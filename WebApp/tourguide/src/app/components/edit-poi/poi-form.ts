import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { PointOfInterest } from '../../api';

export class PoiForm {
  private poi: PointOfInterest = {
    latitude: 48.137154,
    longitude: 11.576124,
    id: 'new',
    description: '',
    name: '',
    numberOfRatings: 10,
    averageRating: 1,
  };

  private poiForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl(''),
  });

  public get nameControl(): AbstractControl {
    const c = this.poiForm.get('name');
    if (!c) {
      throw new Error('Form control with name "name" does not exist');
    }
    return c;
  }

  public get descriptionControl(): AbstractControl {
    const c = this.poiForm.get('description');
    if (!c) {
      throw new Error('Form control with name "description" does not exist');
    }
    return c;
  }

  public get formGroup(): FormGroup {
    return this.poiForm;
  }

  public get pointOfInterest(): PointOfInterest {
    return this.poi;
  }

  public set pointOfInterest(poi: PointOfInterest) {
    this.poi = poi;
    this.updateFormControl();
  }

  public updateFormControl(): void {
    this.poiForm.setValue({
      name: this.poi.name,
      description: this.poi.description,
    });
  }

  public updatePoi(): void {
    this.poi.name = this.nameControl.value;
    this.poi.description = this.descriptionControl.value;
  }
}
