import { Component, OnInit, ViewChild } from '@angular/core';
import { GoogleMap } from '@angular/google-maps';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { PointOfInterest, RouteService } from '../../api';
import { displayError } from '../../utils/errors';
import { mapOptions } from '../../utils/map-options';
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

  loading = true;
  isNew = true;
  routeForm: RouteForm;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private routeService: RouteService,
    private snackBar: MatSnackBar
  ) {
    this.routeForm = new RouteForm();
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      const id = params.get('id');
      let promise: Promise<void> = Promise.resolve();
      if (id) {
        promise = this.getExistingRoute(id);
      }
      promise.then(() => {
        this.routeForm.updateFormControl();
        this.loading = false;
      });
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

  onPoisChange(pois: PointOfInterest[]): void {
    console.log(pois);
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
