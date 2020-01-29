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
      ['GI','NL','VA','UA','TR','SE','SI','SK','RS','SM','RO','PT','PL','SJ','NO','ME','MT',
      'MK','MD','MC','LV','LU','LT','LI','XK','JE','IT','IS','IE','IM','HU','HR','GR','GG','GE',
      'FR','FO','FI','EE','ES','GB','DK','DE','CZ','CY','CH','BE','BY','BA','BG','AZ','AT','AM',
      'AD','AX','AL'      ],
      "#3f60a6"
      ,this,function(content:ContentComponent){
      content.getPage("Europa");
    });
    this.map.addGroupOfCountries("AU","Australien",['AU'],"#FF6E6E"
    ,this,function(content:ContentComponent){content.getPage("Australien");});
    this.map.addGroupOfCountries("US","Nordamerika",['AW','AG','AI','BS','BL','BZ','BM','BB','CA',
    'CR','CU','CW','KY','DM','DO','GP','GD','GL','GT',
    'HN','HT','JM','KN','LC','MF','MX','MS','MQ','NI','PA','PR','SV','PM','SX','TC','TT','US','VC',
    'VG','VI','BQ'],
    "#37e324"
    ,this,function(content:ContentComponent){content.getPage("Nordamerika");});  
    this.map.addGroupOfCountries("SA","Sudamerika",['AR','BO','BR','CL','CO','EC','FK','GF','GY','PE',
    'PY','SR','UY','VE'],
    "#E89A51"
    ,this,function(content:ContentComponent){content.getPage("Sudamerika");});
    this.map.addGroupOfCountries("AF","Afrika",['GO','JU','ZW','ZM','ZA','UG','TZ','TN','TG',
    'TD','SC','SZ','ST','SO','SL','SH','SN',
    'SS','SD','EH','RW','RE','PT','NG','NE','NA','YT','MW','MU','MR','MZ','ML','MG','MA',
    'LS','LY','LR','KE','GQ','GW','GM','GN','GH','GA','ET','ES','ER','EG','DZ','DJ','CV',
    'KM','CG','CD','CM','CI','CF','BW','BF','BJ','BI','AO'],
    "#fffa6e"
    ,this,function(content:ContentComponent){content.getPage("Afrika");});
    this.map.addGroupOfCountries("AS","Asien",[
    'YE','PS','VN','UZ','TW','TL','TM','TJ','TH','SY','SG','SA','QA','KP','PG','PH',
    'PK','OM','NP','MY','MN','MM','MV','MO','LK','LB','LA','KW','KR','KH','KG','KZ','JP',
    'JO','IL','IR','IQ','IO','IN','ID','HK','CN','BT','BN','BH','BD','AE','AF' ],
    "#57d79a"
    ,this,function(content:ContentComponent){content.getPage("Asien");})


   }
}
    