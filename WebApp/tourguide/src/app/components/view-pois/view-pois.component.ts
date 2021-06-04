import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { GoogleMap, MapInfoWindow, MapMarker } from '@angular/google-maps';
import { Router } from '@angular/router';
import { finalize, map } from 'rxjs/operators';
import { PointOfInterest, PointOfInterestService } from 'src/app/api';
import { customStyle } from 'src/app/utils/custom-style';

@Component({
  selector: 'app-view-pois',
  templateUrl: './view-pois.component.html',
  styleUrls: ['./view-pois.component.scss'],
})
export class ViewPoisComponent implements OnInit, AfterViewInit {
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
  username = '';

  loading = true;
  constructor(
    private poiService: PointOfInterestService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.poiService
      .getPOIs(this.username)
      .pipe(
        map((pois) => {
          if (pois.length === 0) {
            this.loading = false;
          }
          pois.map((id) => {
            this.poiService
              .getPOI(id)
              .pipe(
                map((p) => {
                  this.pois.set(id, p);
                }),
                finalize(() => (this.loading = false))
              )
              .subscribe();
          });
        })
      )
      .subscribe();
  }

  ngAfterViewInit(): void {
    // pan map in eastern direction because of overlay card
    this.map.panBy(-260, 0);
  }

  openInfoWindow(marker: MapMarker, poi: PointOfInterest): void {
    this.infoWindow.options = {
      content: `<p><h4>${poi.name}</h4></p>
      <p><img src=${poi.imageURL}></p>
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
    this.poiService.deletePOI(poi.id);
    this.pois.delete(poi.id);
  }

  onEdit(poi: PointOfInterest): void {
    this.router.navigate(['poi', poi.id]);
  }

  onNew(): void {
    this.router.navigate(['poi', 'new']);
  }
}
