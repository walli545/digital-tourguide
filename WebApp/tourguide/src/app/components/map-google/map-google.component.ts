import { Component, OnInit, ViewChild } from '@angular/core';
import { PoiService } from '../../services/poi.service';
import { Poi } from '../../models/Poi';
import { customStyle } from './custom-style';
//import { MouseEvent } from '@agm/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { MapInfoWindow, MapMarker } from '@angular/google-maps';

@Component({
  selector: 'app-map-google',
  templateUrl: './map-google.component.html',
  styleUrls: ['./map-google.component.scss'],
})
export class MapGoogleComponent implements OnInit {
  //@ViewChild(MapInfoWindow) infoWindow: MapInfoWindow;

  // center coordinates of munich
  lat = 48.137154;
  lng = 11.576124;
  apiLoaded: Observable<boolean>;
  options: google.maps.MapOptions = {
    center: { lat: this.lat, lng: this.lng },
    zoom: 12,
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

  // create new PoI from Map-Click
  /*     onChoseLocation(event: MouseEvent): void {
    this.poiService.addPoi(
      new Poi('testName', event.coords.lat, event.coords.lng, 'testDescription')
    );
  }  */

  addMarker(event: google.maps.MapMouseEvent): void {
    console.log(event);
    this.poiService.addPoi(
      new Poi(
        'testName',
        event.latLng.lat(),
        event.latLng.lng(),
        'testDescription'
      )
    );
  }

  openInfoWindow(marker: MapMarker): void {
    //this.infoWindow.open(marker);
  }
}
