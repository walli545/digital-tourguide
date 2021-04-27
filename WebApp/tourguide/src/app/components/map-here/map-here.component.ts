import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import H from '@here/maps-api-for-javascript';

@Component({
  selector: 'app-map-here',
  templateUrl: './map-here.component.html',
  styleUrls: ['./map-here.component.scss'],
})
export class MapHereComponent implements AfterViewInit {
  @ViewChild('map') map!: ElementRef;

  private coords = [
    { lat: 48.11107030946002, lng: 11.61439881491252 },
    { lat: 48.11730789786704, lng: 11.638860123146667 },
    { lat: 48.1378660155541, lng: 11.574366858966822 },
    { lat: 48.1250039872127, lng: 11.526697803315923 },
  ];

  constructor() {}

  ngAfterViewInit(): void {
    const platform = new H.service.Platform({
      apikey: 'IEIs1b-ev3-VKS3XOJBs7zLNejxkbhm1XYOo_QSVZzk',
    });
    const layers = platform.createDefaultLayers({
      tileSize: 512,
      lg: 'zh',
      ppi: 72,
    });
    const m = new H.Map(
      this.map.nativeElement,
      layers.raster.normal.mapnight || null,
      {
        pixelRatio: 1,
        center: { lat: 48.14177, lng: 11.5545 },
        zoom: 12,
      }
    );
    const behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(m));
    const ui = H.ui.UI.createDefault(
      m,
      platform.createDefaultLayers(),
      'de-DE'
    );

    this.addMarkers(m);
    this.displayRoute(platform, m);

    // const provider = m.getBaseLayer()?.getProvider();
    // // Create the style object from the YAML configuration.
    // // First argument is the style path and the second is the base URL to use for
    // // resolving relative URLs in the style like textures, fonts.
    // // all referenced resources relative to the base path https://js.api.here.com/v3/3.1/styles/omv.
    // const style = new H.map.Style(
    //   'https://heremaps.github.io/maps-api-for-javascript-examples/change-style-at-load/data/dark.yaml',
    //   'https://js.api.here.com/v3/3.1/styles/omv/'
    // );
    // set the style on the existing layer
    //provider?.setStyleInternal(style);
  }

  private addMarkers(map: H.Map) {
    // const svgMarkup =
    //   '<svg width="24" height="24" ' +
    //   'xmlns="http://www.w3.org/2000/svg">' +
    //   '<rect stroke="white" fill="#1b468d" x="1" y="1" width="22" ' +
    //   'height="22" /><text x="12" y="18" font-size="12pt" ' +
    //   'font-family="Arial" font-weight="bold" text-anchor="middle" ' +
    //   'fill="white">H</text></svg>';

    /* eslint-disable max-len */
    const svgMarkup = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Layer_1" width="24" x="0px" y="0px" viewBox="0 0 365 560" enable-background="new 0 0 365 560" xml:space="preserve">
<g>
	<path fill="#00AEEF" d="M182.9,551.7c0,0.1,0.2,0.3,0.2,0.3S358.3,283,358.3,194.6c0-130.1-88.8-186.7-175.4-186.9   C96.3,7.9,7.5,64.5,7.5,194.6c0,88.4,175.3,357.4,175.3,357.4S182.9,551.7,182.9,551.7z M122.2,187.2c0-33.6,27.2-60.8,60.8-60.8   c33.6,0,60.8,27.2,60.8,60.8S216.5,248,182.9,248C149.4,248,122.2,220.8,122.2,187.2z"/>
</g>
</svg>`;

    const icon = new H.map.Icon(svgMarkup);
    this.coords.forEach((c) => {
      map.addObject(new H.map.Marker(c, { icon, data: {} }));
    });
  }

  private displayRoute(platform: H.service.Platform, map: H.Map) {
    // Create the parameters for the routing request:
    const routingParameters = {
      routingMode: 'fast',
      transportMode: 'pedestrian',
      // The start point of the route:
      origin: `${this.coords[0].lat},${this.coords[0].lng}`,
      // The end point of the route:
      destination: `${this.coords[this.coords.length - 1].lat},${
        this.coords[this.coords.length - 1].lng
      }`,
      via: [`${this.coords[2].lat},${this.coords[2].lng}`],
      // Include the route shape in the response
      return: 'polyline',
    };

    // Define a callback function to process the routing response:
    const onResult = (result: any) => {
      // ensure that at least one route was found
      if (result.routes.length) {
        result.routes[0].sections.forEach((section: any) => {
          // Create a linestring to use as a point source for the route line
          const linestring = H.geo.LineString.fromFlexiblePolyline(
            section.polyline
          );

          // Create a polyline to display the route:
          const routeLine = new H.map.Polyline(linestring, {
            style: { strokeColor: 'blue', lineWidth: 3 },
            data: {},
          });

          // // Create a marker for the start point:
          // const startMarker = new H.map.Marker(
          //   section.departure.place.location
          // );

          // // Create a marker for the end point:
          // const endMarker = new H.map.Marker(section.arrival.place.location);

          // Add the route polyline and the two markers to the map:
          //map.addObjects([routeLine, startMarker, endMarker]);
          map.addObject(routeLine);

          // Set the map's viewport to make the whole route visible:
          map
            .getViewModel()
            .setLookAtData({ bounds: routeLine.getBoundingBox() });
        });
      }
    };

    // Get an instance of the routing service version 8:
    const router = platform.getRoutingService(undefined, 8);

    // Call calculateRoute() with the routing parameters,
    // the callback and an error callback function (called if a
    // communication error occurs):
    router.calculateRoute(routingParameters, onResult, (error: any) => {
      alert(error.message);
    });
  }
}
