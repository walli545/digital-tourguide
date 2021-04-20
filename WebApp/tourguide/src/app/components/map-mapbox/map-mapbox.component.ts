import { AfterViewInit, Component, OnInit } from '@angular/core';
import mapboxgl, { Marker } from 'mapbox-gl';

@Component({
  selector: 'app-map-mapbox',
  templateUrl: './map-mapbox.component.html',
  styleUrls: ['./map-mapbox.component.scss'],
})
export class MapMapboxComponent implements OnInit, AfterViewInit {
  private coords = [
    { lat: 48.11107030946002, lng: 11.61439881491252 },
    { lat: 48.11730789786704, lng: 11.638860123146667 },
    { lat: 48.1378660155541, lng: 11.574366858966822 },
    { lat: 48.1250039872127, lng: 11.526697803315923 },
  ];

  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {}

  onLoad(m: mapboxgl.Map) {
    this.coords.forEach((c) => {
      new Marker({}).setLngLat([c.lng, c.lat]).addTo(m);
    });
  }
}
