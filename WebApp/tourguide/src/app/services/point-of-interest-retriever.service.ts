import { Injectable } from '@angular/core';
import { combineLatest } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { PointOfInterest, PointOfInterestService } from '../api';

@Injectable({
  providedIn: 'root',
})
export class PointOfInterestRetrieverService {
  constructor(private poiService: PointOfInterestService) {}

  getPoisFromUser(username: string): Promise<PointOfInterest[]> {
    return this.poiService
      .getPOIs(username)
      .pipe(
        switchMap((poiIds) =>
          combineLatest(poiIds.map((i) => this.poiService.getPOI(i)))
        )
      )
      .toPromise();
  }
}
