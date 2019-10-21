import { Component, NgZone, OnDestroy } from '@angular/core';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4maps from "@amcharts/amcharts4/maps";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import am4geodata_continentsLow from "@amcharts/amcharts4-geodata/continentsLow";
import am4geodata_worldHigh from "@amcharts/amcharts4-geodata/worldHigh";
am4core.useTheme(am4themes_animated);

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnDestroy {
  private chart: am4maps.MapChart;
  private label: am4core.Label;
  private country: string = "#47c78a";
  private countryLines: string = "#454a58";
  private background: string = "#404040";
  private cityStroke: string = "#fff";
  private cityFill: string = this.country;
  private labelFill: string = this.country;
  private labelLine: string = this.cityStroke;
  private shadowFill: string = "#0F0";
  private countryHover: string = "#57d79a";
  private meridianLines: string = "#fff";
  constructor(private zone: NgZone) { }
  public showMessage(message:string){
    this.label.text=message;
  }
  public go(zoomLevel:number, latitude:number, longitude:number){

    this.chart.zoomToGeoPoint({
        latitude: latitude,
        longitude: longitude
    },zoomLevel,true);
  }
  public goCity(cityId:string,zoomLevel:number){
    var city=this.citiesMap.get(cityId);
    if(city)
      this.go(zoomLevel,city.latitude,city.longitude);
  }
  public home(){
    this.chart.goHome();
  }
  public setHome(zoom:number, latitude:number, longitude:number){
    this.chart.homeZoomLevel = zoom;
    this.chart.homeGeoPoint = {
        latitude: latitude,
        longitude: longitude
    };
  }
  private cities:am4maps.MapImageSeries;
  private getCities():am4maps.MapImageSeries{
    if(this.cities==null){
      this.cities=this.chart.series.push(new am4maps.MapImageSeries());
      var city = this.cities.mapImages.template.createChild(am4core.Circle);
      city.radius = 1;
      city.fill = am4core.color(this.cityFill);
      city.strokeWidth = 0.25;
      city.stroke = am4core.color(this.cityStroke);
    }
    return this.cities;
  }
  lineSeries:am4maps.MapArcSeries;
  private getArcLines():am4maps.MapArcSeries{
    if(this.lineSeries==null){
      var lineSeries = this.chart.series.push(new am4maps.MapArcSeries());
      lineSeries.mapLines.template.line.strokeWidth = 2;
      lineSeries.mapLines.template.line.strokeOpacity = 0.5;
      lineSeries.mapLines.template.line.stroke = this.chart.colors.getIndex(0).brighten(-0.2);;
      lineSeries.mapLines.template.line.nonScalingStroke = true;
      lineSeries.mapLines.template.line.strokeDasharray = "1,1";
      lineSeries.zIndex = 10;
      this.lineSeries=lineSeries;
    }
    return this.lineSeries;
  }
  citiesMap : Map<string,am4maps.MapImage> = new Map();
  public addCity(id:string, latitude:number, longitude:number, tooltip:string, component?:any,onClick?:Function):am4maps.MapImage{
    if(!this.citiesMap.has(id)){
      var city:am4maps.MapImage;
      city = this.getCities().mapImages.create();
      city.latitude = latitude;
      city.longitude = longitude;
      city.tooltipHTML = tooltip;
      this.citiesMap.set(id,city);
      if(onClick){
        city.events.on("hit",function(){
          onClick(component);
        });
      }
    }
    return this.citiesMap.get(id);
  }
  public addFly(idFrom : string, idTo:string ):am4maps.MapArc {
    if(idFrom && idTo){
      var from:am4maps.MapImage=this.citiesMap.get(idFrom);
      var to:am4maps.MapImage=this.citiesMap.get(idTo);
      if(from && to){
        var line:am4maps.MapArc = this.getArcLines().mapLines.create();
        line.imagesToConnect = [from, to];
        line.line.controlPointDistance = -0.3;
        var plane = line.lineObjects.create();
        plane.position = 0;
        plane.width = 48;
        plane.height = 48;
        plane.adapter.add("scale", function(scale, target) {
            return 0.5 * (1 - (Math.abs(0.5 - target.position)));
        })
        var planeImage = plane.createChild(am4core.Sprite);
        planeImage.scale = 0.08;
        planeImage.horizontalCenter = "middle";
        planeImage.verticalCenter = "middle";
        planeImage.path = "m2,106h28l24,30h72l-44,-133h35l80,132h98c21,0 21,34 0,34l-98,0 -80,134h-35l43,-133h-71l-24,30h-28l15,-47";
        planeImage.fill = this.chart.colors.getIndex(2).brighten(-0.2);
        planeImage.strokeOpacity = 0;
        var direction = 0;
        function flyPlane() {
          if(direction==0){
              if (planeImage.rotation != 0) {
                planeImage.animate({ to: 0, property: "rotation" }, 1000).events.on("animationended", flyPlane);
                return;
              }
              plane.animate({
                from: 0,
                to: 1,
                property: "position"
              }, 5000, am4core.ease.sinInOut).events.on("animationended", flyPlane);
              direction=1;
          }else{
            if (planeImage.rotation != 180) {
              planeImage.animate({ to: 180, property: "rotation" }, 1000).events.on("animationended", flyPlane);
              return;
            }
            plane.animate({
              from: 1,
              to: 0,
              property: "position"
            }, 5000, am4core.ease.sinInOut).events.on("animationended", flyPlane);
            direction=0;
          } 
        }
        flyPlane();
        return line;
      }
    }
    return null;
}

  ngAfterViewInit() {
    this.zone.runOutsideAngular(() => {
      let chart = am4core.create("chartdiv", am4maps.MapChart);
      am4core.useTheme(am4themes_animated);
      try {
          chart.geodata = am4geodata_worldHigh;
      }
      catch (e) {
          chart.raiseCriticalError(new Error("Map geodata could not be loaded. Please download the latest <a href=\"https://www.amcharts.com/download/download-v4/\">amcharts geodata</a> and extract its contents into the same directory as your amCharts files."));
      }
      
      this.label = chart.createChild(am4core.Label)
      let label=this.label;
      this.label.text = "Author : Even";
      this.label.fontSize = 12;
      this.label.align = "left";
      this.label.valign = "bottom"
      this.label.fill = am4core.color(this.labelFill);
      var background = new am4core.RoundedRectangle();
      this.label.background = background;
      background.cornerRadius(10,10,10,10);
      this.label.padding(10,10,10,10);
      this.label.marginLeft = 30;
      this.label.marginBottom = 30;
      this.label.background.strokeOpacity = 0.3;
      this.label.background.stroke =am4core.color(this.labelLine);
      this.label.background.fill = am4core.color(this.labelFill);
      this.label.background.fillOpacity = 0.6;
      
      // Set projection
      chart.projection = new am4maps.projections.Orthographic;
      chart.panBehavior = "rotateLongLat";
      chart.padding(20,20,20,20);
      
      // Add zoom control
      chart.zoomControl = new am4maps.ZoomControl();
      
      let homeButton = new am4core.Button();
      homeButton.events.on("hit", function(){
        chart.homeZoomLevel=1;
        chart.homeGeoPoint=undefined;
        chart.goHome();
      });
      
      homeButton.icon = new am4core.Sprite();
      homeButton.padding(7, 5, 7, 5);
      homeButton.width = 30;
      homeButton.icon.path = "M16,8 L14,8 L14,16 L10,16 L10,10 L6,10 L6,16 L2,16 L2,8 L0,8 L8,0 L16,8 Z M16,8";
      homeButton.marginBottom = 10;
      homeButton.parent = chart.zoomControl;
      homeButton.insertBefore(chart.zoomControl.plusButton);
      
      chart.backgroundSeries.mapPolygons.template.polygon.fill = am4core.color(this.background);
      chart.backgroundSeries.mapPolygons.template.polygon.fillOpacity = 1;
      chart.deltaLongitude = 20;
      chart.deltaLatitude = -20;
      
      
      // Create map polygon series
      
      let shadowPolygonSeries = chart.series.push(new am4maps.MapPolygonSeries());
      //shadowPolygonSeries.geodata = am4geodata_continentsLow;
      
      try {
          shadowPolygonSeries.geodata = am4geodata_continentsLow;
      }
      catch (e) {
          shadowPolygonSeries.raiseCriticalError(new Error("Map geodata could not be loaded. Please download the latest <a href=\"https://www.amcharts.com/download/download-v4/\">amcharts geodata</a> and extract its contents into the same directory as your amCharts files."));
      }
      
      shadowPolygonSeries.useGeodata = true;
      shadowPolygonSeries.dx = 2;
      shadowPolygonSeries.dy = 2;
      shadowPolygonSeries.mapPolygons.template.fill = am4core.color(this.shadowFill);
      shadowPolygonSeries.mapPolygons.template.fillOpacity = 0.2;
      shadowPolygonSeries.mapPolygons.template.strokeOpacity = 0;
      shadowPolygonSeries.fillOpacity = 0.1;
      shadowPolygonSeries.fill = am4core.color(this.shadowFill);
      
      let graticuleSeries = chart.series.push(new am4maps.GraticuleSeries());
      
      // Create map polygon series
      let polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());
      polygonSeries.useGeodata = true;
      
      polygonSeries.calculateVisualCenter = true;
      polygonSeries.tooltip.background.fillOpacity = 0.2;
      polygonSeries.tooltip.background.cornerRadius = 20;
      
      let template = polygonSeries.mapPolygons.template;
      template.nonScalingStroke = true;
      template.fill = am4core.color(this.country);
      template.stroke = am4core.color(this.countryLines);
      
      polygonSeries.calculateVisualCenter = true;
      template.propertyFields.id = "id";
      template.tooltipPosition = "fixed";
      template.fillOpacity = 1;
      let hs = polygonSeries.mapPolygons.template.states.create("hover");
      hs.properties.fillOpacity = 1;
      hs.properties.fill = am4core.color(this.countryHover);
      
      
      graticuleSeries.fitExtent = false;
      graticuleSeries.mapLines.template.strokeOpacity = 0.2;
      graticuleSeries.mapLines.template.stroke = am4core.color(this.meridianLines);

      this.chart = chart;
    });
 }
  ngOnDestroy(){
    this.zone.runOutsideAngular(() => {
      if (this.chart) {
        this.chart.dispose();
      }
    });
  }
}
