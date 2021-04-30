import { Component, OnInit, Input } from '@angular/core';
import { PoiService } from '../../services/poi.service';
import { Poi } from 'src/app/models/Poi';

@Component({
  selector: 'app-poi-item',
  templateUrl: './poi-item.component.html',
  styleUrls: ['./poi-item.component.scss'],
})
export class PoiItemComponent implements OnInit {
  @Input() poi: Poi = new Poi('', 0, 0, '');
  @Input() indexOfelement = null;
  enableEdit = false;
  enableEditIndex = null;

  constructor(private poiService: PoiService) {}

  ngOnInit(): void {}

  onDelete(poi: Poi) {
    this.poiService.deletePoi(poi);
  }

  editName() {
    const name = this.poi.name;
    const result = prompt('Edit PoI Name', name);
    if (result !== null && result !== '') {
      this.poi.name = result;
    }
  }

  editDescription() {
    const description = this.poi.description;
    const result = prompt('Edit PoI Description', description);
    if (result !== null && result !== '') {
      this.poi.description = result;
    }
  }
}
