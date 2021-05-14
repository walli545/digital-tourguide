import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MapGoogleComponent } from './components/map-google/map-google.component';
import { TestComponent } from './components/test/test.component';
import { ViewPoisComponent } from './components/view-pois/view-pois.component';

const routes: Routes = [
  {
    path: '',
    component: TestComponent,
  },
  { path: 'gmaps', component: MapGoogleComponent },
  { path: 'pois', component: ViewPoisComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
