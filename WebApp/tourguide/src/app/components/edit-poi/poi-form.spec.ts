import { PointOfInterest } from '../../api';
import { PoiForm } from './poi-form';

describe('PoiForm', () => {
  let form: PoiForm;

  beforeEach(async () => {
    form = new PoiForm();
  });

  it('initial formGroup settings are correct', () => {
    const fg = form.formGroup;

    expect(fg).not.toBeNull();
    expect(fg.contains('name')).toBeTrue();
    expect(fg.contains('description')).toBeTrue();
    expect(fg.status).toEqual('INVALID');
    expect(fg.dirty).toBeFalse();
  });

  it('get nameControl works', () => {
    const nameCtl = form.nameControl;

    expect(nameCtl.dirty).toBeFalse();
    expect(nameCtl.enabled).toBeTrue();
    expect(nameCtl.valid).toBeFalse();
    expect(nameCtl.value).toEqual('');
  });

  it('get descriptionControl works', () => {
    const descriptionControl = form.descriptionControl;

    expect(descriptionControl.dirty).toBeFalse();
    expect(descriptionControl.enabled).toBeTrue();
    expect(descriptionControl.valid).toBeTrue();
    expect(descriptionControl.value).toEqual('');
  });

  it('get imageUrlControl works', () => {
    const imageUrlControl = form.imageUrlControl;

    expect(imageUrlControl.dirty).toBeFalse();
    expect(imageUrlControl.enabled).toBeTrue();
    expect(imageUrlControl.valid).toBeFalse();
    expect(imageUrlControl.value).toEqual('');
  });

  it('get initial pointOfInterest works', () => {
    const poi = form.pointOfInterest;

    expect(poi.name).toEqual('');
    expect(poi.description).toEqual('');
    expect(poi.id).toEqual('new');
    expect(poi.latitude).toEqual(0);
    expect(poi.longitude).toEqual(0);
    expect(poi.numberOfRatings).toEqual(0);
    expect(poi.averageRating).toEqual(0);
    expect(poi.imageURL).toEqual('');
  });

  it('set pointOfInterest updates form values', () => {
    const newPoi: PointOfInterest = {
      id: '1',
      averageRating: 0,
      numberOfRatings: 0,
      description:
        'Der Marienplatz ist der zentrale Platz der Münchner Innenstadt und Beginn der Fußgängerzone.',
      latitude: 12.345678,
      longitude: 98.765432,
      name: 'Marienplatz',
      imageURL: 'https://google.png',
    };

    form.pointOfInterest = newPoi;

    expect(form.nameControl.value).toEqual(newPoi.name);
    expect(form.descriptionControl.value).toEqual(newPoi.description);
    expect(form.imageUrlControl.value).toEqual(newPoi.imageURL);
  });

  it('updateFormControl updates form with changed values in poi', () => {
    const newName = 'Marienplatz';
    const newDescription =
      'Der Marienplatz ist der zentrale Platz der Münchner Innenstadt und Beginn der Fußgängerzone.';
    const newImageUrl = 'http://google.png';
    form.pointOfInterest.name = newName;
    form.pointOfInterest.description = newDescription;
    form.pointOfInterest.imageURL = newImageUrl;

    expect(form.nameControl.value).toEqual('');
    expect(form.descriptionControl.value).toEqual('');
    expect(form.imageUrlControl.value).toEqual('');

    form.updateFormControl();

    expect(form.nameControl.value).toEqual(newName);
    expect(form.descriptionControl.value).toEqual(newDescription);
    expect(form.imageUrlControl.value).toEqual(newImageUrl);
  });

  it('updatePoi updates poi with changed values from form', () => {
    const newName = 'Marienplatz';
    const newDescription =
      'Der Marienplatz ist der zentrale Platz der Münchner Innenstadt und Beginn der Fußgängerzone.';
    const newImageUrl = 'http://google.png';
    form.nameControl.setValue(newName);
    form.descriptionControl.setValue(newDescription);
    form.imageUrlControl.setValue(newImageUrl);

    expect(form.pointOfInterest.name).toEqual('');
    expect(form.pointOfInterest.description).toEqual('');
    expect(form.pointOfInterest.imageURL).toEqual('');

    form.updatePoi();

    expect(form.pointOfInterest.name).toEqual(newName);
    expect(form.pointOfInterest.description).toEqual(newDescription);
    expect(form.pointOfInterest.imageURL).toEqual(newImageUrl);
  });
});