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
  html_content : String;
  ngOnInit() {
    console.log("map");
    console.log(this.map);
  }
  testMap(){
    this.map.showMessage("Connected");
    this.html_content="<h1>connected!</h1>";
  }

}
