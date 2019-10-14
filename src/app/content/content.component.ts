import { Component, OnInit, Input } from '@angular/core';
import { MapComponent } from '../map/map.component';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {
  @Input() map : MapComponent;
  constructor(private sanitizer: DomSanitizer) { 
    this._htmlContent="<br/>";
  }
  private _htmlContent : any;
  set htmlContent(value:any){
    this._htmlContent=this.sanitizer.bypassSecurityTrustHtml(value);
  }
  get htmlContent():any{
    return this._htmlContent;
  }
  ngOnInit() {
  }
  goLuxembourg(){
    this.map.goCity("LU-LU",8.5);
  }
  goNewYork(){
    this.map.goCity("US-NY",5.5);
  }

  addLuxembourg(){
    this.addCityToMap("LU-LU",49.62083333,6.12527259,"Luxembourg",
    "You just <i>clicked</i> on <a href=\"https://vdl.lu\" target=\"_blank\">Luxembourg</a><br/><br/>"+
    "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/KpDRGBjmwHM\" frameborder=\"0\""+
    " allow=\"accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen>Soon video here !</iframe>");
  }

  addNewYork(){
    this.addCityToMap("US-NY",40.715561, -74.003019,"New York",
        "Yeah !! <b>New York</b> man !!");
  }
  private addCityToMap(id:string, latitude:number, longitude:number,tooltip:string,html:string){
    this.map.addCity(id,latitude,longitude,tooltip,this,function(content:ContentComponent){
      content.htmlContent=html;
    });



  }
  fly:any;
  addfly(){
    if(!this.fly){
      this.fly=this.map.addFly("LU-LU","US-NY");
    }
    this.map.go(2.5,60.336119, -35.017729);
  }
}
