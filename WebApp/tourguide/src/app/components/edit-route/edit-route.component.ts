import { Component, OnInit, ViewChild } from '@angular/core';
import { GoogleMap } from '@angular/google-maps';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import {
  PointOfInterest,
  PointOfInterestService,
  RouteService,
} from '../../api';
import { PolylineService } from '../../services/polyline.service';
import { displayError } from '../../utils/errors';
import { mapOptions } from '../../utils/map-options';
import { toGoogleMaps } from '../../utils/poi';
import { toPostRoute } from '../../utils/route';
import { PoiOrderComponent } from '../poi/poi-order/poi-order.component';
import { RouteForm } from './route-form';

@Component({
  selector: 'app-edit-route',
  templateUrl: './edit-route.component.html',
  styleUrls: ['./edit-route.component.scss'],
})
export class EditRouteComponent implements OnInit {
  @ViewChild('map') map!: GoogleMap;
  @ViewChild('orderPois') orderPois!: PoiOrderComponent;

  mapOptions = mapOptions;
  polylineOptions: google.maps.PolylineOptions = {
    strokeOpacity: 0.6,
    strokeWeight: 3,
    strokeColor: '#9c27b0',
    icons: [
      {
        fixedRotation: false,
        icon: {
          path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW,
          fillOpacity: 1,
          strokeOpacity: 1,
          strokeWeight: 1,
        },
        repeat: '100px',
        offset: '100%',
      },
    ],
  };

  loading = true;
  isNew = true;
  routeForm: RouteForm;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private routeService: RouteService,
    private snackBar: MatSnackBar,
    public polylineService: PolylineService,
    private poiService: PointOfInterestService
  ) {
    this.routeForm = new RouteForm();
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      const id = params.get('id');
      if (id) {
        this.getExistingRoute(id).then(() => {
          this.routeForm.updateFormControl();
          this.loading = false;
          this.updateMapPosition();
        });
      } else {
        this.poiService
          .getCenterOfPOIs('username')
          .toPromise()
          .then((coord) => {
            this.map.center = {
              lat: coord.latitude || 48.137154,
              lng: coord.longitude || 11.576124,
            };
          });
      }
    });
  }

  async onSave(): Promise<void> {
    this.loading = true;
    this.routeForm.updateRoute();
    try {
      if (this.isNew) {
        await this.saveNewRoute();
      } else {
        await this.saveExistingRoute();
      }
    } catch (error) {
      displayError(error, `Unable to save route`, this.snackBar);
    }
    this.loading = false;
  }

  onCancel(): void {
    this.router.navigate(['routes']);
  }

  getPolylinePath(): google.maps.LatLng[] {
    return this.polylineService.toPath(this.routeForm.route.polyline);
  }

  async onPoisChange(pois: PointOfInterest[]): Promise<void> {
    try {
      this.routeForm.route.polyline = await this.polylineService.getPolyline(
        pois
      );
      this.routeForm.route.pointOfInterests = pois;
      this.updateMapPosition();
    } catch (error) {
      displayError(error, 'Route could not be calculated', this.snackBar);
    }
  }

  private updateMapPosition(): void {
    const bounds = new google.maps.LatLngBounds();
    this.routeForm.route.pointOfInterests.forEach((p) =>
      bounds.extend(toGoogleMaps(p))
    );
    this.map.fitBounds(bounds);
    this.map.panBy(-260, 0);
  }

  private async getExistingRoute(id: string): Promise<void> {
    try {
      this.routeForm.route = await this.routeService.getRoute(id).toPromise();
      this.isNew = false;
    } catch (error) {
      displayError(error, 'Route not found', this.snackBar);
      this.router.navigate(['route', 'new']);
    }
  }

  private async saveNewRoute(): Promise<void> {
    const newRoute = await this.routeService
      .addRoute(toPostRoute(this.routeForm.route))
      .toPromise();
    this.router.navigate(['route', newRoute.id]);
  }

  private async saveExistingRoute(): Promise<void> {
    const updatedRoute = await this.routeService
      .putRoute(toPostRoute(this.routeForm.route))
      .toPromise();
    this.routeForm.route = updatedRoute;
  }
}
