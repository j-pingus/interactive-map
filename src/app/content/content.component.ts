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
  }
  goLuxembourg(){
    //"MEAN_BBXC":,"MEAN_BBYC":
    this.map.setHome(8.5,49.62083333,6.12527259);
    this.map.home();
  }
  goNewYork(){
    this.map.setHome(5.5,40.715561, -74.003019);
    this.map.home();
  }
  luxembourg:any;
  addLuxembourg(){
    if(this.luxembourg==null)
    this.luxembourg=this.map.addCity(49.62083333,6.12527259,"Luxembourg",this,this.visitLuxembourg);
  }
  public visitLuxembourg(content:ContentComponent){
    content.html_content="You just clicked Luxembourg";
  }
  newYork:any;
  addNewYork(){
    if(this.newYork==null)
    
    this.newYork=this.map.addCity(40.715561, -74.003019,"New York",this, function(content:ContentComponent){
      content.html_content="Yeah !! New York man !!";
    });
  }
  fly:any;
  addfly(){
    if(this.luxembourg!=null && this.newYork!=null && this.fly==null ){
      this.fly=this.map.addFly(this.luxembourg,this.newYork);
    }
    this.map.setHome(2.5,60.336119, -35.017729);
    this.map.home();
  }
}
