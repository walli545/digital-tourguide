import { Component, EventEmitter, Input, Output } from '@angular/core';

// eslint-disable-next-line @angular-eslint/component-selector
@Component({ selector: 'map-marker', template: '' })
export class MarkerStubComponent {
  @Input() options!: google.maps.MarkerOptions;
  @Output() positionChanged = new EventEmitter<void>();
}
