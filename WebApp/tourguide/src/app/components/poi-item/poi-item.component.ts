import { Component, Input } from '@angular/core';
import { PoiService } from '../../services/poi.service';
import { Poi } from 'src/app/models/Poi';

@Component({
  selector: 'app-poi-item',
  templateUrl: './poi-item.component.html',
  styleUrls: ['./poi-item.component.scss'],
})
export class PoiItemComponent {
  @Input() poi: Poi = new Poi('', 0, 0, '');
  @Input() indexOfelement = {};

  constructor(private poiService: PoiService) {}

  //delete PoI from Service bzw Server later
  onDelete(poi: Poi): void {
    this.poiService.deletePoi(poi);
  }

  //edit current PoI Name
  editName(): void {
    const name = this.poi.name;
    const result = prompt('Edit PoI Name', name);
    if (result !== null && result !== '') {
      this.poi.name = result;
    }
  }

  //edit current PoI Description
  editDescription(): void {
    const description = this.poi.description;
    const result = prompt('Edit PoI Description', description);
    if (result !== null && result !== '') {
      this.poi.description = result;
    }
  }
}
