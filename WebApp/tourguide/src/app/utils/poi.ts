import { PointOfInterest } from '../api';

export const toGoogleMaps = (
  poi: PointOfInterest
): google.maps.LatLngLiteral => ({
  lat: poi.latitude,
  lng: poi.longitude,
});
