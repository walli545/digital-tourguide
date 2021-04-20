import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { MapHereComponent } from './components/map-here/map-here.component';

const routes: Routes = [
  {
    path: '',
    component: AppComponent,
  },
  {
    path: 'here',
    component: MapHereComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
