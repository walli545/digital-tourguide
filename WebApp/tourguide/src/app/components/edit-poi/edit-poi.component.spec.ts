import {
  ComponentFixture,
  fakeAsync,
  flush,
  TestBed,
  tick,
} from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { GoogleMap, MapMarker } from '@angular/google-maps';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import {
  ActivatedRoute,
  convertToParamMap,
  ParamMap,
  Router,
} from '@angular/router';
import { BehaviorSubject, of, throwError } from 'rxjs';
import {
  PointOfInterest,
  PointOfInterestService,
  PointOfInterestServiceInterface,
  PostPointOfInterest,
} from '../../api';
import { clickButton, enterText } from '../../utils/testing/interaction';
import { GoogleMapsStubComponent } from '../../utils/testing/stub-components/GoogleMapsStubComponent';
import { MarkerStubComponent } from '../../utils/testing/stub-components/MapMarkerStubComponent';
import { EditPoiComponent } from './edit-poi.component';

describe('EditPoiComponent', () => {
  let component: EditPoiComponent;
  let fixture: ComponentFixture<EditPoiComponent>;

  let snackBar: MatSnackBar;
  let poiServiceSpy: jasmine.SpyObj<PointOfInterestServiceInterface>;
  let route$: BehaviorSubject<ParamMap>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    route$ = new BehaviorSubject(convertToParamMap({}));

    poiServiceSpy = jasmine.createSpyObj('PointOfInterestService', [
      'getCenterOfPOIs',
      'addPOI',
      'getPOI',
      'putPOI',
    ]);
    await TestBed.configureTestingModule({
      declarations: [
        EditPoiComponent,
        GoogleMapsStubComponent,
        MarkerStubComponent,
      ],
      imports: [
        MatSnackBarModule,
        MatProgressSpinnerModule,
        MatCardModule,
        MatButtonModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
        NoopAnimationsModule,
      ],
      providers: [
        { provide: PointOfInterestService, useValue: poiServiceSpy },
        { provide: Router, useValue: routerSpy },
        {
          provide: ActivatedRoute,
          useValue: { paramMap: route$.asObservable() },
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPoiComponent);
    component = fixture.componentInstance;
    snackBar = TestBed.inject(MatSnackBar);
    component.marker = jasmine.createSpyObj('MapMarker', ['getPosition']);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('onCancel navigates to /poi', () => {
    component.onCancel();

    expect(routerSpy.navigate).toHaveBeenCalledWith(['poi']);
  });

  describe('new poi', () => {
    beforeEach(() => {
      route$.next(convertToParamMap({}));
    });

    it('sets isNew to true', () => {
      fixture.detectChanges();

      expect(component.isNew).toBe(true);
    });

    it('retrieves center of other pois as initial coordinates', fakeAsync(() => {
      poiServiceSpy.getCenterOfPOIs.and.returnValue(
        of({ type: 5, longitude: 11, latitude: 12 })
      );

      fixture.detectChanges(); // onInit
      tick(); // wait for getCenterOfPOIs

      expect(component.poiForm.pointOfInterest.longitude).toEqual(11);
      expect(component.poiForm.pointOfInterest.latitude).toEqual(12);
    }));

    it('uses default coordinates when center retrieval fails ', fakeAsync(() => {
      poiServiceSpy.getCenterOfPOIs.and.returnValue(throwError(new Error('')));

      fixture.detectChanges(); // onInit
      tick(); // wait for getCenterOfPOIs

      expect(component.poiForm.pointOfInterest.longitude).toEqual(11.576124);
      expect(component.poiForm.pointOfInterest.latitude).toEqual(48.137154);
    }));

    it('saves new poi and navigates to editor', fakeAsync(() => {
      const newName = 'Marienplatz';
      const newDescription =
        'Der Marienplatz ist der zentrale Platz der Münchner Innenstadt und Beginn der Fußgängerzone.';

      poiServiceSpy.getCenterOfPOIs.and.returnValue(
        of({ type: 5, longitude: 11, latitude: 12 })
      );
      poiServiceSpy.addPOI.and.callFake((poi: PostPointOfInterest) => {
        expect(poi.name).toEqual(newName);
        expect(poi.description).toEqual(newDescription);
        expect(poi.longitude).toEqual(11);
        expect(poi.latitude).toEqual(12);
        return of({
          id: '1',
          description: newDescription,
          name: newName,
          latitude: 11,
          longitude: 12,
          averageRating: 0,
          numberOfRatings: 0,
        } as PointOfInterest);
      });

      fixture.detectChanges(); // onInit
      tick(); // wait for getCenterOfPOIs
      fixture.detectChanges(); // stop loading
      enterText(fixture, '#input-name', newName);
      enterText(fixture, '#input-description', newDescription);
      fixture.detectChanges(); // Enable save button
      clickButton(fixture, '#btn-save');
      tick(); // wait for async onSave

      expect(routerSpy.navigate).toHaveBeenCalledWith(['poi', '1']);
    }));

    it('shows error when poi could not be added', fakeAsync(() => {
      const snackBarSpy = spyOn(snackBar, 'open');
      snackBarSpy.and.callThrough();
      poiServiceSpy.getCenterOfPOIs.and.returnValue(
        of({ type: 5, longitude: 11, latitude: 12 })
      );
      poiServiceSpy.addPOI.and.callFake(() =>
        throwError(new Error('Test error'))
      );

      fixture.detectChanges(); // onInit
      tick(); // wait for getCenterOfPOIs
      fixture.detectChanges(); // stop loading
      enterText(fixture, '#input-name', 'a');
      enterText(fixture, '#input-description', 'd');
      fixture.detectChanges(); // Enable save button
      clickButton(fixture, '#btn-save');
      tick(); // wait for async onSave

      expect(snackBarSpy).toHaveBeenCalledWith(
        'Unable to save point of interest',
        undefined,
        {
          duration: 3000,
        }
      );
      flush();
    }));
  });

  describe('edit poi', () => {
    beforeEach(() => {
      route$.next(convertToParamMap({ id: 1 }));
    });

    it('saves edited poi', fakeAsync(() => {
      const newName = 'Marienplatz';
      const newDescription =
        'Der Marienplatz ist der zentrale Platz der Münchner Innenstadt und Beginn der Fußgängerzone.';

      setupGetPOI();
      poiServiceSpy.putPOI.and.callFake(
        (poiId: string, poi: PointOfInterest) => {
          expect(poiId).toEqual('1');
          expect(poi.name).toEqual(newName);
          expect(poi.description).toEqual(newDescription);
          expect(poi.longitude).toEqual(11);
          expect(poi.latitude).toEqual(12);
          return of({
            id: '1',
            description: newDescription,
            name: newName,
            latitude: 11,
            longitude: 12,
            averageRating: 0,
            numberOfRatings: 0,
          } as PointOfInterest);
        }
      );

      fixture.detectChanges(); // onInit
      tick(); // wait for getPOI
      fixture.detectChanges(); // stop loading
      enterText(fixture, '#input-name', newName);
      enterText(fixture, '#input-description', newDescription);
      clickButton(fixture, '#btn-save');
      tick(); // wait for async onSave
    }));

    it('shows error when poi could not be saved', fakeAsync(() => {
      const snackBarSpy = spyOn(snackBar, 'open');
      snackBarSpy.and.callThrough();
      setupGetPOI();
      poiServiceSpy.putPOI.and.callFake(() =>
        throwError(new Error('Test error'))
      );

      fixture.detectChanges(); // onInit
      tick(); // wait for getPOI
      fixture.detectChanges(); // stop loading
      enterText(fixture, '#input-name', 'a');
      enterText(fixture, '#input-description', 'd');
      clickButton(fixture, '#btn-save');
      tick(); // wait for async onSave

      expect(snackBarSpy).toHaveBeenCalledWith(
        'Unable to save point of interest',
        undefined,
        {
          duration: 3000,
        }
      );
      flush();
    }));

    it('navigates to /poi/new when poi was not found', fakeAsync(() => {
      poiServiceSpy.getPOI.and.returnValue(throwError(new Error('Test error')));
      const snackBarSpy = spyOn(snackBar, 'open');
      snackBarSpy.and.callThrough();

      fixture.detectChanges(); // onInit
      tick(); // wait for getPOI

      expect(routerSpy.navigate).toHaveBeenCalledWith(['poi', 'new']);
      expect(snackBarSpy).toHaveBeenCalledWith(
        'Point of interest not found',
        undefined,
        { duration: 3000 }
      );
      flush();
    }));
  });

  describe('marker', () => {
    beforeEach(() => {
      route$.next(convertToParamMap({ id: 1 }));
      setupGetPOI();
    });

    it('displays with coordinates', fakeAsync(() => {
      fixture.detectChanges(); // onInit

      // Create spys because @ViewChild doesn't work with stub components
      const markerSpy = jasmine.createSpyObj('google.maps.Marker', [
        'setPosition',
      ]);
      const mapSpy = jasmine.createSpyObj('google.maps.Map', ['setCenter']);
      component.marker = {
        marker: markerSpy,
      } as MapMarker;
      component.map = {
        googleMap: mapSpy,
        // eslint-disable-next-line @typescript-eslint/no-empty-function,@typescript-eslint/no-unused-vars
        panBy: (x: number, y: number) => {},
      } as GoogleMap;
      const panBySpy = spyOn(component.map, 'panBy').and.stub();

      tick(); // wait for getPOI
      fixture.detectChanges(); // stop loading

      expect(markerSpy.setPosition).toHaveBeenCalledWith({ lat: 12, lng: 11 });
      expect(mapSpy.setCenter).toHaveBeenCalledWith({ lat: 12, lng: 11 });
      expect(panBySpy).toHaveBeenCalledWith(-260, 0);
    }));

    it('displays with coordinates when map and marker are undefined', fakeAsync(() => {
      fixture.detectChanges(); // onInit

      // Create spys because @ViewChild doesn't work with stub components
      component.marker = {
        marker: undefined,
      } as MapMarker;
      component.map = {
        googleMap: undefined,
        // eslint-disable-next-line @typescript-eslint/no-empty-function,@typescript-eslint/no-unused-vars
        panBy: (x: number, y: number) => {},
      } as GoogleMap;
      const panBySpy = spyOn(component.map, 'panBy').and.stub();

      tick(); // wait for getPOI
      fixture.detectChanges(); // stop loading

      expect(panBySpy).toHaveBeenCalledWith(-260, 0);
    }));

    it('updates poi coordinates when marker is dragged', fakeAsync(() => {
      fixture.detectChanges(); // onInit

      tick(); // wait for getPOI
      fixture.detectChanges(); // stop loading

      // Create spys because @ViewChild doesn't work with stub components
      const markerSpy = jasmine.createSpyObj('MapMarker', ['getPosition']);
      markerSpy.getPosition.and.returnValue({ lat: () => 43, lng: () => -14 });
      component.marker = markerSpy;
      component.onMarkerPositionChanged();

      expect(component.poiForm.pointOfInterest.longitude).toEqual(-14);
      expect(component.poiForm.pointOfInterest.latitude).toEqual(43);
    }));

    it('does not update poi coordinates when marker position cannot be read', fakeAsync(() => {
      fixture.detectChanges(); // onInit

      tick(); // wait for getPOI
      fixture.detectChanges(); // stop loading

      // Create spys because @ViewChild doesn't work with stub components
      const markerSpy = jasmine.createSpyObj('MapMarker', ['getPosition']);
      markerSpy.getPosition.and.returnValue(undefined);
      component.marker = markerSpy;
      component.onMarkerPositionChanged();

      expect(component.poiForm.pointOfInterest.longitude).toEqual(11);
      expect(component.poiForm.pointOfInterest.latitude).toEqual(12);
    }));
  });

  const setupGetPOI = (): void => {
    poiServiceSpy.getPOI.and.returnValue(
      of({
        id: '1',
        name: 'M',
        description: 'D',
        longitude: 11,
        latitude: 12,
        averageRating: 1,
        numberOfRatings: 1,
      })
    );
  };
});
