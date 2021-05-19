import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { CdkTreeModule } from '@angular/cdk/tree';
import { CommonModule } from '@angular/common';
import { HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { GoogleMapsModule } from '@angular/google-maps';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTreeModule } from '@angular/material/tree';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  ApiModule,
  Configuration,
  ConfigurationParameters,
  PointOfInterestService,
} from './api';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EditPoiComponent } from './components/edit-poi/edit-poi.component';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { TestComponent } from './components/test/test.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { ViewPoisComponent } from './components/view-pois/view-pois.component';
import { LocalPointOfInterestService } from './services/local-api/LocalPointOfInterestService';
import { ViewRoutesComponent } from './components/view-routes/view-routes.component';

const materialModules = [
  BrowserModule,
  BrowserAnimationsModule,
  CdkTreeModule,
  MatAutocompleteModule,
  MatBadgeModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDividerModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatTreeModule,
  OverlayModule,
  PortalModule,
  ReactiveFormsModule,
];

export const apiConfigFactory = (): Configuration => {
  const params: ConfigurationParameters = {
    // set configuration parameters here.
  };
  return new Configuration(params);
};

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    SideNavComponent,
    TestComponent,
    ViewPoisComponent,
    EditPoiComponent,
    ViewRoutesComponent,
  ],
  imports: [
    ApiModule.forRoot(apiConfigFactory),
    AppRoutingModule,
    BrowserModule,
    CommonModule,
    GoogleMapsModule,
    HttpClientModule,
    HttpClientJsonpModule,
    ...materialModules,
  ],
  providers: [
    { provide: PointOfInterestService, useClass: LocalPointOfInterestService },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
