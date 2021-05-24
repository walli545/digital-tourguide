import { customStyle } from './custom-style';

export const mapOptions: google.maps.MapOptions = {
  zoom: 12,
  styles: customStyle,
  fullscreenControl: false,
  mapTypeControl: false,
  streetViewControl: false,
  scaleControl: false,
  zoomControl: false,
  backgroundColor: '#424242',
};
