import { Component, OnInit } from '@angular/core';
import { PoiService } from '../../services/poi.service';
import { Poi } from '../../models/Poi';
import { customStyle } from './custom-style';
import { MouseEvent } from '@agm/core';

@Component({
  selector: 'app-map-google',
  templateUrl: './map-google.component.html',
  styleUrls: ['./map-google.component.scss'],
})
export class MapGoogleComponent implements OnInit {
  pois: Poi[] = [];

  // center coordinates of munich
  lat = 48.137154;
  lng = 11.576124;

  customStyle = customStyle;

  constructor(private poiService: PoiService) {}

  ngOnInit(): void {
    this.pois = this.poiService.getPois();
  }

  // create new PoI from Map-Click
  onChoseLocation(event: MouseEvent): void {
    this.poiService.addPoi(
      new Poi('testName', event.coords.lat, event.coords.lng, 'testDescription')
    );
  }
}
