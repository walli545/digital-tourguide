import { PointOfInterest, PostPointOfInterest } from '../api';

export const toGoogleMaps = (
  poi: PointOfInterest
): google.maps.LatLngLiteral => ({
  lat: poi.latitude,
  lng: poi.longitude,
});

export const toPostPoi = (poi: PointOfInterest): PostPointOfInterest => ({
  id: poi.id,
  name: poi.name,
  description: poi.description,
  latitude: poi.latitude,
  longitude: poi.longitude,
  imageURL: poi.imageURL,
});
