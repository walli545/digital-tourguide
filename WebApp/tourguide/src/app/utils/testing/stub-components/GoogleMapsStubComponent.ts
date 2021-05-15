import { Component, Input } from '@angular/core';

// eslint-disable-next-line @angular-eslint/component-selector
@Component({ selector: 'google-map', template: '' })
export class GoogleMapsStubComponent {
  @Input()
  options!: google.maps.MapOptions;
  @Input() height!: number;
  @Input() width!: number;

  // eslint-disable-next-line @typescript-eslint/no-empty-function,@typescript-eslint/no-unused-vars
  panBy(x: number, y: number): void {}
}
