import { Injectable } from '@angular/core';
import { Poi } from '../models/Poi';

@Injectable({
  providedIn: 'root',
})
export class PoiService {
  pois: Poi[] = [
    {
      name: 'SendlingerTor',
      lat: 48.13401718904898,
      lng: 11.56761646270752,
    },
    {
      name: 'Marienplatz',
      lat: 48.13739675056184,
      lng: 11.575448513031006,
    },
  ];
  constructor() {}

  getPois() {
    return this.pois;
  }

  deletePoi(poi: Poi) {
    const index: number = this.pois.indexOf(poi);
    if (index !== -1) {
      this.pois.splice(index, 1);
    }
  }
  addPoi(poi: Poi) {
    this.pois.push(poi);
  }
}
