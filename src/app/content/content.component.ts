import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { MapComponent } from '../map/map.component';
import { DomSanitizer } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit,AfterViewInit {
  @Input() map : MapComponent;
  constructor(private sanitizer: DomSanitizer,private http:HttpClient) { 
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
  goEuropa(){
    this.map.go(8.5,49.978346, 7.892255);
  }
  goAustralia(){
    this.map.go(5.5,-23.098499, 133.654900);
  }
  getIntroduction(){
    this.http.get('assets/Introduction.html',{responseType: 'text'})
    .subscribe(data =>
      {
        this.htmlContent=data;
      })
  }
  getPage(id:String){
    this.http.get('assets/locations/'+id+".html", {responseType: 'text'})
    .subscribe(data => 
      {
        this.htmlContent=data;
      });
      
    }
    private addCityWithPage(id:string, latitude:number, longitude:number,tooltip:string){
      this.map.addCity(id,latitude,longitude,tooltip,this,function(content:ContentComponent){
          content.map.go(3.5,latitude,longitude);
          content.getPage(id);
        });
    }
  fly:any;
  addfly(){
    if(!this.fly){
      this.fly=this.map.addFly("LU-LU","US-NY");
    }
    this.map.go(2.5,60.336119, -35.017729);
  }
  ngAfterViewInit(){
    this.getIntroduction();
    this.map.addGroupOfCountries("EU","Europa",
      ['FR','GB','IE','BE','DE','LU','NL','GB','IT','AT','CH','DK','CZ','ES','PT','PL','SK','HU','SI','HR','NO','SE','FI','EE','LV','LT','GR'],
      this,function(content:ContentComponent){
      content.getPage("Europa");
    });
    this.map.addGroupOfCountries("AU","Australien",['AU'],this,function(content:ContentComponent){content.getPage("Australien");});
    this.map.addGroupOfCountries("US","Nordamerika",['US','CA'],this,function(content:ContentComponent){content.getPage("Nordamerika");});
    this.map.addGroupOfCountries("AF","Afrika",['GO','JU','ZW','ZM','ZA','UG','TZ','TN','TG','TD','SC','SZ','ST','SO','SL','SH','SN',
    'SS','SD','EH','RW','RE','PT','NG','NE','NA','YT','MW','MU','MR','MZ','ML','MG','MA',
    'LS','LY','LR','KE','GQ','GW','GM','GN','GH','GA','ET','ES','ER','EG','DZ','DJ','CV',
    'KM','CG','CD','CM','CI','CF','BW','BF','BJ','BI','AO'],this,function(content:ContentComponent){content.getPage("Afrika");});
    


   }
}
    