import { PointOfInterest, Route } from '../api';

export const sortPois = (a: PointOfInterest, b: PointOfInterest): number =>
  a.name > b.name ? 1 : a.name === b.name ? 0 : -1;

export const sortRoutes = (a: Route, b: Route): number =>
  a.name > b.name ? 1 : a.name === b.name ? 0 : -1;
