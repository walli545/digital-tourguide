import {
  PointOfInterest,
  PostPointOfInterest,
  PutPointOfInterest,
} from '../api';

export const toGoogleMaps = (
  poi: PointOfInterest
): google.maps.LatLngLiteral => ({
  lat: poi.latitude,
  lng: poi.longitude,
});

export const toPostPoi = (poi: PointOfInterest): PostPointOfInterest => ({
  name: poi.name,
  userName: poi.userName,
  description: poi.description,
  latitude: poi.latitude,
  longitude: poi.longitude,
  imageUrl: poi.imageUrl,
});

export const toPutPoi = (poi: PointOfInterest): PutPointOfInterest => ({
  id: poi.poIID,
  userName: poi.userName,
  name: poi.name,
  description: poi.description,
  latitude: poi.latitude,
  longitude: poi.longitude,
  imageUrl: poi.imageUrl,
});
