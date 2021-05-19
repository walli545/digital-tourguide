import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditPoiComponent } from './components/edit-poi/edit-poi.component';
import { TestComponent } from './components/test/test.component';
import { ViewPoisComponent } from './components/view-pois/view-pois.component';
import { ViewRoutesComponent } from './components/view-routes/view-routes.component';

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
    path: 'routes',
    component: ViewRoutesComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
