import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { PointOfInterestService } from '../../../api';
import { PointOfInterest } from '../../../api/model/pointOfInterest';

@Component({
  selector: 'app-poi-select',
  templateUrl: './poi-select.component.html',
  styleUrls: ['./poi-select.component.scss'],
})
export class PoiSelectComponent implements OnInit {
  @Output()
  poiSelect = new EventEmitter<PointOfInterest>();

  selectPoiControl = new FormControl({ value: '', disabled: true });

  filteredOptions!: Observable<PointOfInterest[]>;
  private options: PointOfInterest[] = [];

  constructor(private poiService: PointOfInterestService) {}

  async ngOnInit(): Promise<void> {
    this.options = await this.poiService.getPOIs('username').toPromise();
    this.selectPoiControl.enable();
    this.filteredOptions = this.selectPoiControl.valueChanges.pipe(
      startWith(''),
      map((value) => this.filter(value))
    );
  }

  onOptionSelected(event: MatAutocompleteSelectedEvent): void {
    this.poiSelect.next(event.option.value);
    this.selectPoiControl.setValue('');
  }

  private filter(name: PointOfInterest | string): PointOfInterest[] {
    if (typeof name === 'string') {
      const filterValue = name.toLowerCase();

      return this.options.filter((option) =>
        option.name.toLowerCase().includes(filterValue)
      );
    } else {
      return this.options;
    }
  }
}
