import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MapInfoWindow, MapMarker } from '@angular/google-maps';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Poi } from '../../models/Poi';
import { PoiService } from '../../services/poi.service';
import { customStyle } from './custom-style';

@Component({
  selector: 'app-map-google',
  templateUrl: './map-google.component.html',
  styleUrls: ['./map-google.component.scss'],
})
export class MapGoogleComponent implements OnInit {
  @ViewChild(MapInfoWindow) infoWindow!: MapInfoWindow;

  // center coordinates of munich
  lat = 48.137154;
  lng = 11.576124;
  apiLoaded: Observable<boolean>;
  options: google.maps.MapOptions = {
    center: { lat: this.lat, lng: this.lng },
    zoom: 12,
    styles: customStyle,
  };
  markerOptions: google.maps.MarkerOptions = { draggable: false };

  pois: Poi[] = [];

  customStyle = customStyle;

  constructor(private poiService: PoiService, httpClient: HttpClient) {
    this.apiLoaded = httpClient
      .jsonp(
        'https://maps.googleapis.com/maps/api/js?key=AIzaSyAiZcSKHkU0fDADhteoQJJzkdXQfvnCHnQ',
        'callback'
      )
      .pipe(
        map(() => true),
        catchError(() => of(false))
      );
  }

  ngOnInit(): void {
    this.pois = this.poiService.getPois();
  }

  onChoseLocation(event: google.maps.MapMouseEvent): void {
    this.poiService.addPoi(
      new Poi(
        'testName',
        event.latLng.lat(),
        event.latLng.lng(),
        'testDescription'
      )
    );
  }

  addMarker(event: google.maps.MapMouseEvent): void {
    this.poiService.addPoi(
      new Poi(
        'testName',
        event.latLng.lat(),
        event.latLng.lng(),
        'testDescription'
      )
    );
  }

  openInfoWindow(marker: MapMarker, poi: Poi): void {
    this.infoWindow.options = {
      content: `<h4>${poi.name}</h4>
          <h5>${poi.description}</h5>`,
    };
    this.infoWindow.open(marker);
  }
}
