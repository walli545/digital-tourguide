import { Component, OnInit, ViewChild } from '@angular/core';
import { GoogleMap, MapMarker } from '@angular/google-maps';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { PointOfInterestService } from '../../api';
import { customStyle } from '../../utils/custom-style';
import { toGoogleMaps, toPostPoi } from '../../utils/poi';
import { PoiForm } from './poi-form';

@Component({
  selector: 'app-edit-poi',
  templateUrl: './edit-poi.component.html',
  styleUrls: ['./edit-poi.component.scss'],
})
export class EditPoiComponent implements OnInit {
  @ViewChild('map') map!: GoogleMap;
  @ViewChild(MapMarker) marker!: MapMarker;

  markerOptions: google.maps.MarkerOptions = { draggable: true };
  mapOptions: google.maps.MapOptions = {
    zoom: 12,
    styles: customStyle,
    fullscreenControl: false,
    mapTypeControl: false,
    streetViewControl: false,
    scaleControl: false,
    zoomControl: false,
    backgroundColor: '#424242',
  };

  loading = true;
  isNew = true;
  poiForm: PoiForm;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private poiService: PointOfInterestService,
    private snackBar: MatSnackBar
  ) {
    this.poiForm = new PoiForm();
  }

  // Lifecycle methods

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      const id = params.get('id');
      let promise: Promise<void>;
      if (id) {
        promise = this.getExistingPoi(id);
      } else {
        promise = this.getDefaultCoordinates();
      }
      promise.then(() => {
        this.poiForm.updateFormControl();
        this.loading = false;
        this.updateMap();
      });
    });
  }

  // Callbacks

  onMarkerPositionChanged(): void {
    const pos = this.marker.getPosition();
    if (pos) {
      this.poiForm.pointOfInterest.latitude = pos.lat();
      this.poiForm.pointOfInterest.longitude = pos.lng();
    }
  }

  async onSave(): Promise<void> {
    this.loading = true;
    this.poiForm.updatePoi();
    try {
      if (this.isNew) {
        await this.saveNewPoi();
      } else {
        await this.saveExistingPoi();
      }
    } catch (error) {
      this.handleError(error, `Unable to save point of interest`);
    }
    this.loading = false;
  }

  onCancel(): void {
    this.router.navigate(['pois']);
  }

  private updateMap(): void {
    const poi = this.poiForm.pointOfInterest;
    if (this.map && this.marker) {
      // after afterViewInit
      this.map.googleMap?.setCenter(toGoogleMaps(poi));
      this.marker.marker?.setPosition(toGoogleMaps(poi));
      this.map.panBy(-260, 0);
    } else {
      // before afterViewInit
      this.mapOptions.center = toGoogleMaps(poi);
      this.markerOptions.position = toGoogleMaps(poi);
    }
  }

  private async getDefaultCoordinates(): Promise<void> {
    let coords;
    try {
      coords = await this.poiService
        .getCenterOfPOIs('default-username')
        .toPromise();
    } catch (error) {
      console.error(
        'failed to fetch center of existing coords, using local defaults'
      );
    }
    this.poiForm.pointOfInterest.latitude = coords?.latitude || 48.137154;
    this.poiForm.pointOfInterest.longitude = coords?.longitude || 11.576124;
  }

  private async getExistingPoi(id: string): Promise<void> {
    try {
      this.poiForm.pointOfInterest = await this.poiService
        .getPOI(id)
        .toPromise();
      this.isNew = false;
    } catch (error) {
      this.handleError(error, 'Point of interest not found');
      this.router.navigate(['poi', 'new']);
    }
  }

  private async saveNewPoi(): Promise<void> {
    const newPoi = await this.poiService
      .addPOI(toPostPoi(this.poiForm.pointOfInterest))
      .toPromise();
    this.router.navigate(['poi', newPoi.id]);
  }

  private async saveExistingPoi(): Promise<void> {
    const updatedPoi = await this.poiService
      .putPOI(this.poiForm.pointOfInterest)
      .toPromise();
    this.poiForm.pointOfInterest = updatedPoi;
    this.updateMap();
  }

  private handleError(error: Error, snackBarMessage: string): void {
    console.error(error);
    this.snackBar.open(snackBarMessage, undefined, {
      duration: 3000,
    });
  }
}
