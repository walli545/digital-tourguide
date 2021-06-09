import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditPoiComponent } from './components/edit-poi/edit-poi.component';
import { EditRouteComponent } from './components/edit-route/edit-route.component';
import { ViewPoisComponent } from './components/view-pois/view-pois.component';
import { ViewRoutesComponent } from './components/view-routes/view-routes.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'pois',
    pathMatch: 'full',
  },
  {
    path: 'pois',
    component: ViewPoisComponent,
    canActivate: [AuthGuard],
    data: { rolesAny: ['content-creator'] },
  },
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
