import { PostRoute, PutRoute, Route } from '../api';

export const toPostRoute = (route: Route): PostRoute => ({
  name: route.name,
  description: route.description,
  pointOfInterests: route.pointOfInterests?.map((p) => p.poIID) || [],
  polyline: route.polyline,
  duration: route.duration,
  creatorName: route.creatorName,
});

export const toPutRoute = (route: Route): PutRoute => ({
  id: route.routeId,
  name: route.name,
  description: route.description,
  pointOfInterests: route.pointOfInterests?.map((p) => p.poIID) || [],
  polyline: route.polyline,
  duration: route.duration,
  creatorName: route.creatorName,
});
