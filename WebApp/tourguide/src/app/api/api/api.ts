export * from './pointOfInterest.service';
import { PointOfInterestService } from './pointOfInterest.service';
export * from './pointOfInterest.serviceInterface'
export * from './promoted.service';
import { PromotedService } from './promoted.service';
export * from './promoted.serviceInterface'
export * from './route.service';
import { RouteService } from './route.service';
export * from './route.serviceInterface'
export const APIS = [PointOfInterestService, PromotedService, RouteService];
