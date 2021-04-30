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
      description:
        'Das Sendlinger Tor ist das südliche Stadttor der historischen Altstadt in München. ',
    },
    {
      name: 'Marienplatz',
      lat: 48.13739675056184,
      lng: 11.575448513031006,
      description:
        'Der Marienplatz ist der zentrale Platz der Münchner Innenstadt und Beginn der Fußgängerzone. ',
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
    console.log(this.pois);
  }
  addPoi(poi: Poi) {
    this.pois.push(poi);
  }
}
