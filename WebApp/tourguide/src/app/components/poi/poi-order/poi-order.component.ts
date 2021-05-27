import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PointOfInterest, PointOfInterestService } from '../../../api';

@Component({
  selector: 'app-poi-order',
  templateUrl: './poi-order.component.html',
  styleUrls: ['./poi-order.component.scss'],
})
export class PoiOrderComponent {
  @Input()
  public pointsOfInterests: PointOfInterest[] = [];

  @Output()
  public poisChange = new EventEmitter<PointOfInterest[]>();

  constructor(public poiService: PointOfInterestService) {}

  drop(event: CdkDragDrop<PointOfInterest[]>): void {
    moveItemInArray(
      this.pointsOfInterests,
      event.previousIndex,
      event.currentIndex
    );
    this.checkEmitEvent();
  }

  isFirstOrLast(i: number): boolean {
    return i === 0 || i === this.pointsOfInterests.length - 1;
  }

  remove(i: number): void {
    this.pointsOfInterests.splice(i, 1);
    this.checkEmitEvent();
  }

  add(poi: PointOfInterest): void {
    this.pointsOfInterests.push(poi);
    this.checkEmitEvent();
  }

  invalid(): boolean {
    return this.containsTwoInRow() || this.pointsOfInterests.length < 2;
  }

  showDragList(): boolean {
    return this.pointsOfInterests.length > 0;
  }

  containsTwoInRow(): boolean {
    for (let i = 0; i < this.pointsOfInterests.length - 1; i++) {
      if (this.pointsOfInterests[i].id === this.pointsOfInterests[i + 1].id) {
        return true;
      }
    }
    return false;
  }

  private checkEmitEvent(): void {
    if (!this.invalid()) {
      this.poisChange.emit(this.pointsOfInterests);
    }
  }
}
