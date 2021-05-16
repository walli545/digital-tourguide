import { ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

export const enterText = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fixture: ComponentFixture<any>,
  id: string,
  text: string
): void => {
  const nativeElement = fixture.debugElement.query(By.css(id)).nativeElement;
  nativeElement.value = text;
  nativeElement.dispatchEvent(new Event('input'));
};

export const clickButton = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fixture: ComponentFixture<any>,
  id: string
): void => {
  fixture.debugElement.query(By.css(id)).nativeElement.click();
};
