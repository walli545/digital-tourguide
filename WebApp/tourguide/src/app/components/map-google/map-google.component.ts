import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { PoiService } from '../../services/poi.service';
import { Poi } from '../../models/Poi';

@Component({
  selector: 'app-map-google',
  templateUrl: './map-google.component.html',
  styleUrls: ['./map-google.component.scss'],
})
export class MapGoogleComponent implements OnInit {
  @Output() addPoi: EventEmitter<Poi> = new EventEmitter();
  pois: Poi[] = [];

  // center coordinates of munich
  lat = 48.137154;
  lng = 11.576124;
  locationChosen = false;

  constructor(private poiService: PoiService) {}

  ngOnInit(): void {
    this.pois = this.poiService.getPois();
  }

  onChoseLocation(event: any) {
    this.lat = event.coords.lat;
    this.lng = event.coords.lng;
    this.locationChosen = true;
    this.pois.push(new Poi('test', event.coords.lat, event.coords.lng));
  }
}
