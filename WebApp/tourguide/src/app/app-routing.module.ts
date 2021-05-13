import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditPoiComponent } from './components/edit-poi/edit-poi.component';
import { MapGoogleComponent } from './components/map-google/map-google.component';
import { TestComponent } from './components/test/test.component';

const routes: Routes = [
  {
    path: '',
    component: TestComponent,
  },
  { path: 'gmaps', component: MapGoogleComponent },
  {
    path: 'poi/new',
    component: EditPoiComponent,
  },
  {
    path: 'poi/:id',
    component: EditPoiComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
