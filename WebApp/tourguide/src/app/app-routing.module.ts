import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditPoiComponent } from './components/edit-poi/edit-poi.component';
import { EditRouteComponent } from './components/edit-route/edit-route.component';
import { HomeComponent } from './components/home/home.component';
import { NotAuthorizedComponent } from './components/not-authorized/not-authorized.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ViewPoisComponent } from './components/view-pois/view-pois.component';
import { ViewRoutesComponent } from './components/view-routes/view-routes.component';
import { AuthGuard } from './guards/auth.guard';
import { CONTENT_CREATOR, PROMOTER } from './services/auth.service';

const rolesPoI = [CONTENT_CREATOR, PROMOTER];
const rolesRoute = [CONTENT_CREATOR];

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    runGuardsAndResolvers: 'always',
    component: HomeComponent,
    children: [
      {
        path: 'pois',
        component: ViewPoisComponent,
        data: { anyRole: rolesPoI },
      },
      {
        path: 'poi/new',
        component: EditPoiComponent,
        data: { anyRole: rolesPoI },
      },
      {
        path: 'poi/:id',
        component: EditPoiComponent,
        data: { anyRole: rolesPoI },
      },
      {
        path: 'routes',
        component: ViewRoutesComponent,
        data: { anyRole: rolesRoute },
      },
      {
        path: 'route/new',
        component: EditRouteComponent,
        data: { anyRole: rolesRoute },
      },
      {
        path: 'route/:id',
        component: EditRouteComponent,
        data: { anyRole: rolesRoute },
      },
      {
        path: 'not-authorized',
        component: NotAuthorizedComponent,
      },
      {
        path: '**',
        component: NotFoundComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
