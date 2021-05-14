import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { GoogleMap, MapInfoWindow, MapMarker } from '@angular/google-maps';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { PointOfInterest, PointOfInterestService } from 'src/app/api';
import { PostPointOfInterest } from 'src/app/api/model/postPointOfInterest';
import { customStyle } from '../map-google/custom-style';

@Component({
  selector: 'app-view-pois',
  templateUrl: './view-pois.component.html',
  styleUrls: ['./view-pois.component.scss'],
})
export class ViewPoisComponent implements OnInit, AfterViewInit {
  @ViewChild('map') map!: GoogleMap;
  //@ViewChild(MapMarker) public marker!: MapMarker; //???
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
  pois = new Map<number, PointOfInterest>();
  index = 0;

  postPois: PostPointOfInterest[] = [
    {
      id: '0',
      name: 'SendlingerTor',
      latitude: 48.13401718904898,
      longitude: 11.56761646270752,
      description:
        'Das Sendlinger Tor ist das südliche Stadttor der historischen Altstadt in München. ',
    },
    {
      id: '1',
      name: 'Marienplatz',
      latitude: 48.13739675056184,
      longitude: 11.575448513031006,
      description:
        'Der Marienplatz ist der zentrale Platz der Münchner Innenstadt und Beginn der Fußgängerzone. ',
    },
  ];

  loading = true;
  constructor(
    private poiService: PointOfInterestService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.postPois.forEach((value) => {
      this.poiService.addPOI(value);
    });
    this.poiService.getPOIs('test').subscribe((pois) => {
      pois.forEach((id) => {
        this.poiService.getPOI(parseInt(id, 2)).subscribe((p) => {
          this.pois.set(parseInt(id, 2), p);
        });
      });
    });
  }

  ngAfterViewInit(): void {
    // pan map in eastern direction because of overlay card
    this.map.panBy(-260, 0);
    this.loading = false;
  }

  openInfoWindow(marker: MapMarker, poi: PointOfInterest): void {
    this.infoWindow.options = {
      content: `<h4>${poi.name}</h4><br>
      <h5>${poi.description}</h5>`,
    };
    this.infoWindow.open(marker);
  }

  closeInfoWindow(): void {
    this.infoWindow.close();
  }

  hasPois(): boolean {
    if (this.pois.size > 0) {
      return true;
    }
    return false;
  }

  //for Marker positon
  toGoogle(poi: PointOfInterest): google.maps.LatLng {
    return new google.maps.LatLng(poi.latitude, poi.longitude);
  }

  // for Marker label
  toString(index: number): string {
    return index.toString();
  }

  onDelete(poi: PointOfInterest): void {
    this.poiService.deletePOI(parseInt(poi.id, 2));
    this.pois.delete(parseInt(poi.id, 2));
  }

  onEdit(poi: PointOfInterest): void {
    this.router.navigate(['poi', poi.id]);
  }

  onNew(): void {
    this.router.navigate(['poi', 'new']);
  }

  private handleError(error: Error, snackBarMessage: string): void {
    console.error(error);
    this.snackBar.open(snackBarMessage, undefined, {
      duration: 3000,
    });
  }
}
