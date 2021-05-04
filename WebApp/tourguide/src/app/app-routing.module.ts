import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MapHereComponent } from './components/map-here/map-here.component';
import { MapMapboxComponent } from './components/map-mapbox/map-mapbox.component';
import { MapGoogleComponent } from './components/map-google/map-google.component';
import { TestComponent } from './components/test/test.component';

const routes: Routes = [
  {
    path: '',
    component: TestComponent,
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
