export * from './healthcheck.service';
import { HealthcheckService } from './healthcheck.service';
export * from './healthcheck.serviceInterface'
export * from './pointOfInterest.service';
import { PointOfInterestService } from './pointOfInterest.service';
import { PromotedService } from './promoted.service';
export * from './pointOfInterest.serviceInterface'
export * from './route.service';
import { RouteService } from './route.service';
export * from './route.serviceInterface'
export * from './verification.service';
import { VerificationService } from './verification.service';
export * from './verification.serviceInterface'
export const APIS = [HealthcheckService, PointOfInterestService, RouteService, VerificationService, PromotedService];
