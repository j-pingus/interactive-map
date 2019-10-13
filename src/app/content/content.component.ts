import { Component, OnInit, Input } from '@angular/core';
import { MapComponent } from '../map/map.component';
@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {
  @Input() map : MapComponent;
  constructor() { }

  ngOnInit() {
    console.log("map");
    console.log(this.map);
  }
  testMap(){
    this.map.showMessage("Connected");

  }

}
