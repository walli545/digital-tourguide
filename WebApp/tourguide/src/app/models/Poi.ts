export class Poi {
  name?: string;
  lat: number;
  lng: number;
  description: string;

  constructor(name: string, lat: number, lng: number, description: string) {
    this.name = name;
    this.lat = lat;
    this.lng = lng;
    this.description = description;
  }
  google(): google.maps.LatLng {
    return new google.maps.LatLng(this.lat, this.lng);
  }
}
