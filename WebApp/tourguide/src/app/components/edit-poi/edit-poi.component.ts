import { Component, OnInit, ViewChild } from '@angular/core';
import { GoogleMap, MapMarker } from '@angular/google-maps';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { PointOfInterestService } from '../../api';
import { AuthService } from '../../services/auth.service';
import { displayError } from '../../utils/errors';
import { mapOptions } from '../../utils/map-options';
import { toGoogleMaps, toPostPoi, toPutPoi } from '../../utils/poi';
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
  mapOptions = mapOptions;

  loading = true;
  isNew = true;
  poiForm: PoiForm;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private poiService: PointOfInterestService,
    private snackBar: MatSnackBar,
    private authService: AuthService
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
      displayError(error, `Unable to save point of interest`, this.snackBar);
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
        .getCenterOfPOIsAsync(await this.authService.getUsername())
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
      displayError(error, 'Point of interest not found', this.snackBar);
      this.router.navigate(['poi', 'new']);
    }
  }

  private async saveNewPoi(): Promise<void> {
    const newPoi = await this.poiService
      .addPOI(toPostPoi(this.poiForm.pointOfInterest))
      .toPromise();
    this.router.navigate(['poi', newPoi.poIID]);
  }

  private async saveExistingPoi(): Promise<void> {
    await this.poiService
      .putPOI(toPutPoi(this.poiForm.pointOfInterest))
      .toPromise();
    await this.getExistingPoi(this.poiForm.pointOfInterest.poIID);
    this.poiForm.updateFormControl();
    this.updateMap();
  }
}
