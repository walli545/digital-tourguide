/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { PointOfInterest } from '../../api';

export class PoiForm {
  private poi: PointOfInterest = {
    latitude: 0,
    longitude: 0,
    poIID: 'new',
    description: '',
    name: '',
    numberOfRatings: 0,
    averageRating: 0,
    imageUrl: '',
  };

  private poiForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    imageUrl: new FormControl('', [Validators.required]),
  });

  public get nameControl(): AbstractControl {
    return this.poiForm.get('name')!;
  }

  public get descriptionControl(): AbstractControl {
    return this.poiForm.get('description')!;
  }

  public get imageUrlControl(): AbstractControl {
    return this.poiForm.get('imageUrl')!;
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
      imageUrl: this.poi.imageUrl,
    });
  }

  public updatePoi(): void {
    this.poi.name = this.nameControl.value;
    this.poi.description = this.descriptionControl.value;
    this.poi.imageUrl = this.imageUrlControl.value;
  }
}
