import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { from } from 'rxjs';
import { AppComponent } from './app.component';
import { MapHereComponent } from './components/map-here/map-here.component';
import { MapMapboxComponent } from './components/map-mapbox/map-mapbox.component';
import { MapGoogleComponent } from './components/map-google/map-google.component';

const routes: Routes = [
  {
    path: '',
    component: AppComponent,
  },
  {
    path: 'here',
    component: MapHereComponent,
  },
  {
    path: 'mapbox',
    component: MapMapboxComponent,
  },
  { path: 'gmaps', component: MapGoogleComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
