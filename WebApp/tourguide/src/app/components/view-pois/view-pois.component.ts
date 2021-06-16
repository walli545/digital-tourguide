import { Component, OnInit, ViewChild } from '@angular/core';
import { GoogleMap, MapInfoWindow, MapMarker } from '@angular/google-maps';
import { Router } from '@angular/router';
import { PointOfInterest, PointOfInterestService } from 'src/app/api';
import { customStyle } from 'src/app/utils/custom-style';
import { AuthService } from '../../services/auth.service';
import { toGoogleMaps } from '../../utils/poi';

@Component({
  selector: 'app-view-pois',
  templateUrl: './view-pois.component.html',
  styleUrls: ['./view-pois.component.scss'],
})
export class ViewPoisComponent implements OnInit {
  @ViewChild('map') map!: GoogleMap;
  @ViewChild(MapInfoWindow) infoWindow!: MapInfoWindow;

  markerOptions: google.maps.MarkerOptions = { draggable: false };
  mapOptions: google.maps.MapOptions = {
    zoom: 12,
    styles: customStyle,
    fullscreenControl: false,
    mapTypeControl: false,
    streetViewControl: false,
    scaleControl: false,
    zoomControl: false,
    backgroundColor: '#424242',
    center: { lat: 48.137154, lng: 11.576124 },
  };
  pois = new Map<string, PointOfInterest>();

  loading = true;
  constructor(
    private poiService: PointOfInterestService,
    private router: Router,
    private authService: AuthService
  ) {}

  async ngOnInit(): Promise<void> {
    try {
      const pois = await this.poiService
        .getPOIs(await this.authService.getUsername())
        .toPromise();
      const bounds = new google.maps.LatLngBounds();
      for (const p of pois) {
        this.pois.set(p.poIID, p);
        bounds.extend(toGoogleMaps(p));
      }
      this.map.fitBounds(bounds, { left: 260, top: 25, right: 25, bottom: 25 });
      // pan map in eastern direction because of overlay card
      this.map.panBy(-260, 0);
    } catch (error) {
    } finally {
      this.loading = false;
    }
  }

  openInfoWindow(marker: MapMarker, poi: PointOfInterest): void {
    this.infoWindow.options = {
      content: `<p><h4>${poi.name}</h4></p>
      <p><img src=${poi.imageUrl}></p>
      <p><h5>${poi.description}</p>
      <p><b>Latitude:</b> ${poi.latitude}<br>
      <b>Longitude:</b> ${poi.longitude}</p>
      <p><b>Average Rating:</b> ${poi.averageRating}<br>
      <b>Number of Ratings:</b> ${poi.numberOfRatings}</h5></p>`,
    };
    this.infoWindow.open(marker);
    this.mapOptions.center = this.toGoogle(poi);
  }

  closeInfoWindow(): void {
    this.infoWindow.close();
  }

  hasPois(): boolean {
    return this.pois.size > 0;
  }

  //for Marker positon
  toGoogle(poi: PointOfInterest): google.maps.LatLngLiteral {
    return { lat: poi.latitude, lng: poi.longitude };
  }

  // for Marker label
  toString(index: number): string {
    return index.toString();
  }

  // for pois with array index as marker-label, instead of poi.id, on website
  toArray(): PointOfInterest[] {
    return Array.from(this.pois.values());
  }

  onDelete(poi: PointOfInterest): void {
    this.poiService.deletePOI(poi.poIID).subscribe({
      next: () => {
        this.pois.delete(poi.poIID);
      },
    });
  }

  onEdit(poi: PointOfInterest): void {
    this.router.navigate(['poi', poi.poIID]);
  }

  onNew(): void {
    this.router.navigate(['poi', 'new']);
  }
}
