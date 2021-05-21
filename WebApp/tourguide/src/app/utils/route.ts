import { PostRoute, Route } from '../api';

export const toPostRoute = (route: Route): PostRoute => ({
  id: route.id,
  name: route.name,
  description: route.description,
  pointOfInterests: route.pointOfInterests.map((p) => p.id),
  polyline: route.polyline,
  duration: route.duration,
  creatorName: route.creatorName,
});
