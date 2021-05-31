/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Route } from '../../api';

export class RouteForm {
  private data: Route = {
    id: 'new',
    pointOfInterests: [],
    name: '',
    description: '',
    creatorName: '',
    duration: 1,
    polyline: '',
  };

  private routeForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl(''),
    duration: new FormControl(1, [Validators.required]),
    imageUrl: new FormControl('', [Validators.required]),
    pointsOfInterests: new FormControl([], []),
  });

  public get nameControl(): AbstractControl {
    return this.routeForm.get('name')!;
  }

  public get descriptionControl(): AbstractControl {
    return this.routeForm.get('description')!;
  }

  public get durationControl(): AbstractControl {
    return this.routeForm.get('duration')!;
  }

  public get imageUrlControl(): AbstractControl {
    return this.routeForm.get('imageUrl')!;
  }

  public get pointsOfInterests(): AbstractControl {
    return this.routeForm.get('pointsOfInterests')!;
  }

  public get formGroup(): FormGroup {
    return this.routeForm;
  }

  public get route(): Route {
    return this.data;
  }

  public set route(route: Route) {
    this.data = route;
    this.updateFormControl();
  }

  public updateFormControl(): void {
    this.routeForm.setValue({
      name: this.data.name,
      description: this.data.description,
      duration: this.data.duration,
      pointsOfInterests: this.data.pointOfInterests,
      // TODO change
      imageUrl: '',
    });
  }

  public updateRoute(): void {
    this.data.name = this.nameControl.value;
    this.data.description = this.descriptionControl.value;
    this.data.duration = this.durationControl.value;
    this.data.pointOfInterests = this.pointsOfInterests.value;
    // TODO add image url
  }
}
