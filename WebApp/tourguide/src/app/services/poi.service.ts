import { Injectable } from '@angular/core';
import { Poi } from '../models/Poi';

@Injectable({
  providedIn: 'root',
})
export class PoiService {
  pois: Poi[] = [
    new Poi(
      'SendlingerTor',
      48.13401718904898,
      11.56761646270752,
      'Das Sendlinger Tor ist das südliche Stadttor der historischen Altstadt in München. '
    ),
    new Poi(
      'Marienplatz',
      48.13739675056184,
      11.575448513031006,
      'Der Marienplatz ist der zentrale Platz der Münchner Innenstadt und Beginn der Fußgängerzone. '
    ),
  ];

  //later fetch PoI's via REST-API
  getPois(): Poi[] {
    return this.pois;
  }

  //later delete PoI via REST-API
  deletePoi(poi: Poi): void {
    const index: number = this.pois.indexOf(poi);
    if (index !== -1) {
      this.pois.splice(index, 1);
    }
    console.log(this.pois);
  }

  //later add PoI via REST-API
  addPoi(poi: Poi): void {
    this.pois.push(poi);
  }
}
