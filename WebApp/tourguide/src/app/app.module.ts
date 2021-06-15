import { DragDropModule } from '@angular/cdk/drag-drop';
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { CdkTreeModule } from '@angular/cdk/tree';
import { CommonModule } from '@angular/common';
import { HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
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
import { KeycloakAngularModule, KeycloakService } from 'keycloak-angular';
import { ApiModule, Configuration, ConfigurationParameters } from './api';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DropdownAccountComponent } from './components/dropdown-account/dropdown-account.component';
import { EditPoiComponent } from './components/edit-poi/edit-poi.component';
import { EditRouteComponent } from './components/edit-route/edit-route.component';
import { InputImageUrlComponent } from './components/input-image-url/input-image-url.component';
import { NotAuthorizedComponent } from './components/not-authorized/not-authorized.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { PoiOrderComponent } from './components/poi/poi-order/poi-order.component';
import { PoiSelectComponent } from './components/poi/poi-select/poi-select.component';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { ViewPoisComponent } from './components/view-pois/view-pois.component';
import { ViewRoutesComponent } from './components/view-routes/view-routes.component';
import { DisplayRolePipe } from './pipes/display-role.pipe';
import { FirstOrLastPipe } from './pipes/first-or-last.pipe';
import { OneOfRequiredRolePipe } from './pipes/one-of-required-role.pipe';
import { HomeComponent } from './components/home/home.component';

const materialModules = [
  BrowserModule,
  BrowserAnimationsModule,
  CdkTreeModule,
  DragDropModule,
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

const apiConfigFactory = (): Configuration => {
  const params: ConfigurationParameters = {
    basePath: '',
    // set configuration parameters here.
  };
  return new Configuration(params);
};

const initializeKeycloak = (
  keycloak: KeycloakService
): (() => Promise<boolean>) => (): Promise<boolean> =>
  keycloak.init({
    config: {
      url: '/auth',
      realm: 'tourguide',
      clientId: 'angular',
    },
    initOptions: {
      onLoad: 'check-sso',
      silentCheckSsoRedirectUri:
        window.location.origin + '/assets/silent-check-sso.html',
    },
  });

@NgModule({
  declarations: [
    AppComponent,
    EditPoiComponent,
    EditRouteComponent,
    FirstOrLastPipe,
    InputImageUrlComponent,
    NotFoundComponent,
    PoiOrderComponent,
    PoiSelectComponent,
    SideNavComponent,
    ToolbarComponent,
    ViewPoisComponent,
    ViewRoutesComponent,
    DropdownAccountComponent,
    DisplayRolePipe,
    NotAuthorizedComponent,
    OneOfRequiredRolePipe,
    HomeComponent,
  ],
  imports: [
    ApiModule.forRoot(apiConfigFactory),
    AppRoutingModule,
    BrowserModule,
    CommonModule,
    GoogleMapsModule,
    HttpClientModule,
    HttpClientJsonpModule,
    KeycloakAngularModule,
    ...materialModules,
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService],
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
