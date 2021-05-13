import { OnInit } from '@angular/core';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { GoogleMap, MapMarker } from '@angular/google-maps';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { PointOfInterest, PointOfInterestService } from '../../api';
import { toGoogleMaps } from '../../utils/poi';
import { customStyle } from '../map-google/custom-style';
import { PoiForm } from './poi-form';

@Component({
  selector: 'app-edit-poi',
  templateUrl: './edit-poi.component.html',
  styleUrls: ['./edit-poi.component.scss'],
})
export class EditPoiComponent implements OnInit, AfterViewInit {
  @ViewChild('map') map!: GoogleMap;
  @ViewChild(MapMarker) public marker!: MapMarker;

  markerOptions: google.maps.MarkerOptions = { draggable: true, title: 'a' };
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
    private poiService: PointOfInterestService
  ) {
    this.poiForm = new PoiForm();
  }

  async ngOnInit(): Promise<void> {
    this.route.paramMap.subscribe(async (params: ParamMap) => {
      const id = params.get('id');
      if (id) {
        await this.getExistingPoi(id);
        this.isNew = false;
      }
      this.poiForm.updateFormControl();
      this.loading = false;
      this.onPoiReceived(this.poiForm.pointOfInterest);
    });
  }

  async ngAfterViewInit(): Promise<void> {
    this.map.panBy(-260, 0);
  }

  onMarkerPositionChanged(): void {
    const pos = this.marker.getPosition();
    if (pos) {
      this.poiForm.pointOfInterest.latitude = pos.lat();
      this.poiForm.pointOfInterest.longitude = pos.lng();
    }
  }

  onPoiReceived(poi: PointOfInterest): void {
    if (this.map && this.marker) {
      this.map.googleMap?.setCenter(toGoogleMaps(poi));
      this.marker.marker?.setPosition(toGoogleMaps(poi));
      this.map.panBy(-260, 0);
    } else {
      this.mapOptions.center = toGoogleMaps(poi);
      this.markerOptions.position = toGoogleMaps(poi);
    }
  }

  onSave(): void {}

  private async getExistingPoi(id: string): Promise<void> {
    try {
      this.poiForm.pointOfInterest = await this.poiService
        .getPOI(id)
        .toPromise();
    } catch (error) {
      //this.handleError(error, 'Category not found');
      this.router.navigate(['poi/new']);
    }
  }
}
