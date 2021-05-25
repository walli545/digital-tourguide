import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-order-pois',
  templateUrl: './order-pois.component.html',
  styleUrls: ['./order-pois.component.scss'],
})
export class OrderPoisComponent implements OnInit {
  selectPoiControl = new FormControl();
  pois = ['A', 'B', 'C'];
  options = ['Marienplatz', 'Stachus', 'Isartor', 'Sendlinger Tor'];
  filteredOptions!: Observable<string[]>;

  ngOnInit(): void {
    this.filteredOptions = this.selectPoiControl.valueChanges.pipe(
      startWith(''),
      map((value) => this.filter(value))
    );
  }

  drop(event: CdkDragDrop<string[]>): void {
    moveItemInArray(this.pois, event.previousIndex, event.currentIndex);
  }

  isFirstOrLast(i: number): boolean {
    return i === 0 || i === this.pois.length - 1;
  }

  remove(i: number): void {
    this.pois.splice(i, 1);
  }

  add(data: MatAutocompleteSelectedEvent): void {
    console.log(data);
    this.pois.push(data.option.value);
    this.selectPoiControl.setValue('');
  }

  invalid(): boolean {
    return this.pois.length < 2;
  }

  private filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }
}
