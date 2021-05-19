import { Component, OnInit } from '@angular/core';
import { Route } from 'src/app/api';

@Component({
  selector: 'app-view-routes',
  templateUrl: './view-routes.component.html',
  styleUrls: ['./view-routes.component.scss'],
})
export class ViewRoutesComponent implements OnInit {
  loading = true;
  routes = new Map<string, Route>();
  map =
    'https://maps.googleapis.com/maps/api/staticmap?center=MUC&zoom=13&size=600x300&maptype=roadmap';

  constructor() {
    for (let i = 0; i < 10; i++) {
      this.routes.set(i.toString(), {
        name: 'ROUTENAME',
        routeID: i.toString(),
        description:
          // eslint-disable-next-line max-len
          'DESCRIPTION DESCRIPTION DESCRIPTION DESCRIPTION DESCRIPTION DESCRIPTION DESCRIPTION DESCRIPTION DESCRIPTION DESCRIPTION DESCRIPTION ',
        pointOfInterests: [],
        creatorName: 'Mr.X',
        duration: 2,
      });
    }
  }

  ngOnInit(): void {
    this.loading = false;
  }

  toArray(): Route[] {
    return Array.from(this.routes.values());
  }

  hasRoutes(): boolean {
    return this.routes.size > 0;
  }
  onNew(): void {
    console.log('new');
  }

  onEdit(route: Route): void {
    console.log('edit ' + route);
  }

  onDelete(route: Route): void {
    console.log('delete ' + route);
    this.routes.delete(route.routeID);
  }
}
