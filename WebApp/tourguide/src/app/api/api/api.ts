export * from './healthcheck.service';
import { HealthcheckService } from './healthcheck.service';
export * from './healthcheck.serviceInterface'
export * from './me.service';
import { MeService } from './me.service';
export * from './me.serviceInterface'
export * from './poIReview.service';
import { PoIReviewService } from './poIReview.service';
export * from './poIReview.serviceInterface'
export * from './pointOfInterest.service';
import { PointOfInterestService } from './pointOfInterest.service';
export * from './pointOfInterest.serviceInterface'
export * from './route.service';
import { RouteService } from './route.service';
export * from './route.serviceInterface'
export * from './routeReview.service';
import { RouteReviewService } from './routeReview.service';
export * from './routeReview.serviceInterface'
export * from './verification.service';
import { VerificationService } from './verification.service';
export * from './verification.serviceInterface'
export const APIS = [HealthcheckService, MeService, PoIReviewService, PointOfInterestService, RouteService, RouteReviewService, VerificationService];
