import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PoiService } from '../../services/poi.service';
import { Poi } from 'src/app/models/Poi';

@Component({
  selector: 'app-poi-item',
  templateUrl: './poi-item.component.html',
  styleUrls: ['./poi-item.component.scss'],
})
export class PoiItemComponent implements OnInit {
  @Input() poi: Poi = new Poi('', 0, 0);
  @Input() indexOfelement = {};
  //@Output() deletePoi: EventEmitter<Poi> = new EventEmitter();

  constructor(private poiService: PoiService) {}

  ngOnInit(): void {}

  onDelete(poi: Poi) {
    //console.log('deleted');
    this.poiService.deletePoi(poi);
  }
}
