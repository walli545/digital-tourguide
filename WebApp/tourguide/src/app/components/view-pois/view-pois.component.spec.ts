/* import { ComponentFixture, TestBed, tick } from '@angular/core/testing';
import { GoogleMap, MapMarker } from '@angular/google-maps';
import {
  ActivatedRoute,
  convertToParamMap,
  ParamMap,
  Router,
} from '@angular/router';
import { BehaviorSubject, of } from 'rxjs';
import {
  PointOfInterestService,
  PointOfInterestServiceInterface,
} from 'src/app/api';
import { clickButton } from 'src/app/utils/testing/interaction';
import { ViewPoisComponent } from './view-pois.component';

describe('ViewPoisComponent', () => {
  let component: ViewPoisComponent;
  let fixture: ComponentFixture<ViewPoisComponent>;

  let poiServiceSpy: jasmine.SpyObj<PointOfInterestServiceInterface>;
  let route$: BehaviorSubject<ParamMap>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    route$ = new BehaviorSubject(convertToParamMap({}));

    poiServiceSpy = jasmine.createSpyObj('PointOfInterestService', [
      'getPOI',
      'getPOIs',
    ]);
    await TestBed.configureTestingModule({
      declarations: [ViewPoisComponent],
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
    setupGetPOI();
    setupGetPOIs();
    fixture = TestBed.createComponent(ViewPoisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    fixture.detectChanges(); // onInit
    tick(); // wait for getCenterOfPOIs
    fixture.detectChanges(); // stop loading

    expect(component).toBeTruthy();
  });

  describe('new poi', () => {
    beforeEach(() => {
      //route$.next(convertToParamMap({}));
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
    });

    it('click new Button', () => {
      fixture.detectChanges();
      tick(); // wait for getCenterOfPOIs
      fixture.detectChanges(); // stop loading
      clickButton(fixture, '#btn-new');

      expect(routerSpy.navigate).toHaveBeenCalledWith(['poi', 'new']);
    });
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
  const setupGetPOIs = (): void => {
    poiServiceSpy.getPOIs.and.returnValue(of(['1']));
  };
});
 */
