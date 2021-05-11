import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { GoogleMap, MapMarker } from '@angular/google-maps';
import { PointOfInterest } from '../../api';
import { customStyle } from '../map-google/custom-style';

@Component({
  selector: 'app-edit-poi',
  templateUrl: './edit-poi.component.html',
  styleUrls: ['./edit-poi.component.scss'],
})
export class EditPoiComponent implements AfterViewInit {
  @ViewChild('map') map!: GoogleMap;
  @ViewChild(MapMarker) public marker!: MapMarker;

  markerOptions: google.maps.MarkerOptions = { draggable: true, title: 'a' };
  mapOptions: google.maps.MapOptions = {
    zoom: 12,
    styles: customStyle,
    fullscreenControl: false,
    mapTypeControl: false,
    streetViewControl: false,
    scaleControl: false,
    zoomControl: false,
    backgroundColor: '#424242',
  };

  poi: PointOfInterest | undefined;

  // constructor() {}

  // ngOnInit(): void {}

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.onPoiReceived({
        latitude: 48.137154,
        longitude: 11.576124,
        id: '1',
        description: 'Description',
        name: 'Name',
        numberOfRatings: 10,
        averageRating: 1,
      });
    }, 1_000);
  }

  onMarkerPositionChanged(): void {
    const pos = this.marker.getPosition();
    if (this.poi && pos) {
      this.poi.latitude = pos.lat();
      this.poi.longitude = pos.lng();
    }
  }

  onPoiReceived(poi: PointOfInterest): void {
    this.poi = poi;
    this.map.googleMap?.setCenter({ lat: poi.latitude, lng: poi.longitude });
    this.map.panBy(-260, 0);
    this.marker.marker?.setPosition({ lat: poi.latitude, lng: poi.longitude });
  }
}
