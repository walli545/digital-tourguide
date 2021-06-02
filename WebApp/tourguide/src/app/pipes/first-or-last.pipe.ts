import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'isFirstOrLast',
})
export class FirstOrLastPipe implements PipeTransform {
  transform(index: number, length: number): unknown {
    return index === 0 || index === length - 1;
  }
}
