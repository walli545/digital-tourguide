import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditPoiComponent } from './components/edit-poi/edit-poi.component';
import { EditRouteComponent } from './components/edit-route/edit-route.component';
import { TestComponent } from './components/test/test.component';
import { ViewPoisComponent } from './components/view-pois/view-pois.component';

const routes: Routes = [
  {
    path: '',
    component: TestComponent,
  },
  { path: 'pois', component: ViewPoisComponent },
  {
    path: 'poi/new',
    component: EditPoiComponent,
  },
  {
    path: 'poi/:id',
    component: EditPoiComponent,
  },
  {
    path: 'route/new',
    component: EditRouteComponent,
  },
  {
    path: 'route/:id',
    component: EditRouteComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
