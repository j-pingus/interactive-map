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
    content.htmlContent="You just <i>clicked</i> on <a href=\"https://vdl.lu\" target=\"_blank\">Luxembourg</a><br/><br/>"+
    "<iframe width=\"560\" height=\"315\" src=\"https://www.youtube.com/embed/KpDRGBjmwHM\" frameborder=\"0\" allow=\"accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>";
  }
  newYork:any;
  addNewYork(){
    if(this.newYork==null)
    
    this.newYork=this.map.addCity(40.715561, -74.003019,"New York",this, function(content:ContentComponent){
      content.htmlContent="Yeah !! <b>New York</b> man !!";
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
