import { Injectable } from '@angular/core';
import { PointOfInterest } from '../api';
import { toGoogleMaps } from '../utils/poi';

@Injectable({
  providedIn: 'root',
})
export class PolylineService {
  async getPolyline(pois: PointOfInterest[]): Promise<string> {
    const results = Promise.all(
      this.separateIntoChunks(pois).map((p) => this.doDirectionsRequest(p))
    );
    const polyline = new google.maps.Polyline();
    (await results).map((r) => this.addToPolyline(r, polyline));
    return Promise.resolve(
      google.maps.geometry.encoding.encodePath(polyline.getPath())
    );
  }

  toPath(polyline: string): google.maps.LatLng[] {
    return google.maps.geometry.encoding.decodePath(polyline);
  }

  private separateIntoChunks(pois: PointOfInterest[]): PointOfInterest[][] {
    const chunks = [];
    let chunk = 10;
    for (let i = 0; i < pois.length; i += chunk) {
      let slice = [];
      if (i > 1) {
        chunk = 9;
        slice = pois.slice(i - 1, i + chunk);
      } else {
        slice = pois.slice(i, i + chunk);
      }
      chunks.push(slice);
    }
    return chunks;
  }

  private doDirectionsRequest(
    pois: PointOfInterest[]
  ): Promise<google.maps.DirectionsResult> {
    return new Promise((resolve, reject) => {
      const directionsService = new google.maps.DirectionsService();
      const request = {
        origin: toGoogleMaps(pois[0]),
        destination: toGoogleMaps(pois[pois.length - 1]),
        travelMode: 'WALKING',
        waypoints: pois
          .slice(1, -1)
          .map((p) => ({ location: toGoogleMaps(p), stopover: true })),
      } as google.maps.DirectionsRequest;
      directionsService.route(request, (result, status) => {
        if (status === 'OK') {
          resolve(result);
        } else {
          reject(`Failed to get direction: ${result}`);
        }
      });
    });
  }

  private addToPolyline(
    directionsResult: google.maps.DirectionsResult,
    polyline: google.maps.Polyline
  ): google.maps.Polyline {
    const legs = directionsResult.routes[0].legs;
    for (const leg of legs) {
      for (const step of leg.steps) {
        for (const p of step.path) {
          polyline.getPath().push(p);
        }
      }
    }
    return polyline;
  }
}
