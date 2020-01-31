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
  private cityFill: string = this.background;
  private labelFill: string = this.country;
  private labelLine: string = this.cityStroke;
  private shadowFill: string = "#0F0";
  private countryHover: string = "#57d79a";
  private meridianLines: string = "#fff";
  private refugeeSvg: string = "M103.82,112.8c4.8,0,8-3.2,8-8v-2.4c10.4-4.8,32-16,39.2-34.4c0.8-0.8,0.8-2.4,0.8-3.2v-24c0-4.8-3.2-8-8-8h-30.4 "+
				"c3.2-8.8,12.8-16.8,21.6-16.8c12.8,0,24.8,12.8,24.8,24.8v60l-52.8,37.6c-3.2,2.4-4.8,7.2-1.6,11.2c1.6,2.4,4,3.2,6.4,3.2 "+
				"c1.6,0,3.2-0.8,4.8-1.6l51.2-36.8l17.6,12l63.2,133.6c1.6,3.2,4,4.8,7.2,4.8c0.8,0,2.4,0,3.2-0.8c4-1.6,5.6-6.4,4-10.4l-64-136 "+
				"c-0.8-1.6-1.6-2.4-3.2-3.2l-20-13.6v-60c0-20.8-20-40.8-40.8-40.8c-20,0-39.2,20-39.2,40.8v64 "+
				"C95.82,109.6,99.02,112.8,103.82,112.8z M111.82,48.8h24v14.4c-4,8.8-15.2,16-24,20.8V48.8z "+
      
        "M183.82,271.2V168.8c0-4.8-3.2-8-8-8s-8,3.2-8,8v104c0,0.8,0,1.6,0,2.4l38.4,146.4l-64.8,43.2h-84.8l15.2-143.2l8-64.8 "+
				"V256V120.8c0-4.8-3.2-8-8-8s-8,3.2-8,8v7.2l-31.2,101.6l-31.2,47.2c-2.4,4-1.6,8.8,2.4,11.2c0.8,0,2.4,0.8,4,0.8 "+
				"c2.4,0,4.8-1.6,6.4-3.2l32-48c0.8-0.8,0.8-1.6,1.6-2.4l16-52.8V256l-8,64l-16,152c0,2.4,0.8,4.8,2.4,6.4c1.6,1.6,3.2,2.4,5.6,2.4 "+
				"h96c1.6,0,3.2-0.8,4.8-1.6l72-48c3.2-1.6,4-5.6,3.2-8.8L183.82,271.2z "+
      
        "M71.82,496.8h-32c-4.8,0-8,3.2-8,8s3.2,8,8,8h32c4.8,0,8-3.2,8-8S76.62,496.8,71.82,496.8z "+
      
        "M207.82,456.8l-25.6,19.2c-3.2,2.4-4,8-1.6,11.2c1.6,2.4,4,3.2,6.4,3.2c1.6,0,3.2-0.8,4.8-1.6l25.6-19.2 "+
				"c3.2-2.4,4-8,1.6-11.2C216.62,455.2,211.02,454.4,207.82,456.8z "+
      
        "M343.82,120.8c-4.8,0-8,3.2-8,8v80c0,4.8,3.2,8,8,8h64c4.8,0,8-3.2,8-8v-14.4c18.4-0.8,32-8,39.2-21.6 "+
				"c0.8-1.6,0.8-2.4,0.8-4v-40c0-1.6-0.8-3.2-1.6-4c-0.8-1.6-11.2-16.8-30.4-16.8c-19.2,0-29.6,15.2-30.4,16.8 "+
				"c-0.8,0.8-1.6,2.4-1.6,4v56c0,4,2.4,7.2,6.4,8c0,0,0.8,0,1.6,0.8v8h-48v-72C351.82,124,348.62,120.8,343.82,120.8z M424.62,124 "+
				"c4.8,0,9.6,2.4,12.8,4.8h-26.4C414.22,126.4,418.22,124,424.62,124z M407.82,144.8h32v21.6c-4.8,8-13.6,12-25.6,12 "+
				"c-2.4,0-4.8,0-6.4,0V144.8z "+
      
        "M475.82,218.4l-32-16c-4-1.6-8.8,0-10.4,3.2c-2.4,3.2-0.8,8,3.2,10.4l28.8,14.4l30.4,100.8c0.8,3.2,4,5.6,8,5.6 "+
				"c0.8,0,1.6,0,2.4,0c4-1.6,6.4-5.6,5.6-9.6l-32-104C479.02,220.8,477.42,219.2,475.82,218.4z "+
      
        "M511.02,451.2l-32-38.4l-23.2-76.8l8-78.4c0.8-4-2.4-8-7.2-8.8c-4.8,0-8,2.4-8.8,7.2l-8,80c0,0.8,0,2.4,0,3.2l24,80 "+
				"c0,0.8,0.8,1.6,1.6,2.4l27.2,34.4l-4.8,4.8l-33.6-40.8l-32-55.2c-1.6-3.2-4.8-4.8-8-4s-5.6,3.2-6.4,6.4l-22.4,105.6h-8.8l7.2-128 "+
				"h40c4.8,0,8-3.2,8-8s-3.2-8-8-8h-40v-88c0-4.8-3.2-8-8-8s-8,3.2-8,8v96v7.2l-0.8,16l-26.4-97.6c-0.8-2.4-1.6-4-4-4.8 "+
				"c-1.6-0.8-4-0.8-5.6-0.8l-116,31.2c-4,0.8-6.4,5.6-5.6,9.6l27.2,100.8c0.8,2.4,1.6,4,4,4.8c1.6,0.8,2.4,0.8,4,0.8 "+
				"c0.8,0,1.6,0,2.4,0l116-31.2c1.6-0.8,3.2-1.6,4.8-3.2l-8,110.4c0,2.4,0.8,4,2.4,5.6c1.6,1.6,4,2.4,5.6,2.4h24c4,0,7.2-2.4,8-6.4 "+
				"l20-91.2l21.6,37.6c0,0.8,0.8,0.8,0.8,0.8l40,48c1.6,1.6,3.2,2.4,5.6,3.2c2.4,0,4.8-0.8,6.4-2.4l16-16 "+
				"C513.42,458.4,513.42,454.4,511.02,451.2z M249.42,386.4l-23.2-84.8l100.8-27.2l23.2,84.8L249.42,386.4z "+
      
        "M383.82,496.8h-32c-4.8,0-8,3.2-8,8s3.2,8,8,8h32c4.8,0,8-3.2,8-8S388.62,496.8,383.82,496.8z "+
      
        "M355.02,104h104.8c15.2,0,27.2-12,27.2-27.2V68h0.8c0-15.2-12-27.2-27.2-27.2h-105.6c-15.2,0-27.2,12-27.2,27.2v8.8 "+
				"C327.82,92,339.82,104,355.02,104z M343.82,68.8c0-7.2,4.8-12,11.2-12h104.8c7.2,0,12,4.8,12,12v8c0,6.4-4.8,12-11.2,12h-105.6 "+
        "c-6.4,0-11.2-4.8-11.2-12V68.8z ";
      private planeSvg:string="m2,106h28l24,30h72l-44,-133h35l80,132h98c21,0 21,34 0,34l-98,0 -80,134h-35l43,-133h-71l-24,30h-28l15,-47";
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
      city.radius = 5;
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
  public addGroupOfCountries(name:string,tooltip:string,
    includedCountries:string[],color:string,component?:any,onClick?:Function){
      let series = this.chart.series.push(new am4maps.MapPolygonSeries());
      series.name = name;
      series.useGeodata = true;
      series.include = includedCountries;
      series.fill = am4core.color("#bf2148");
      let mapPolygonTemplate = series.mapPolygons.template;
      // Instead of our custom title, we could also use {name} which comes from geodata  
      mapPolygonTemplate.fill = am4core.color(am4core.color(color));
      mapPolygonTemplate.tooltipText=tooltip+':{name}';
      if(onClick){
        series.events.on("hit",function(){
          onClick(component);
        })
      }
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
        planeImage.path = this.planeSvg;
        planeImage.fill = this.chart.colors.getIndex(2).brighten(-0.2);
        planeImage.strokeOpacity = 0;
        //planeImage.rotation=230
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
      this.label.text = "Even Rose, Gaspar Elodie, Schons Lucie, Dichter Vera, jPingus";
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
      //chart.projection = new am4maps.projections.Mercator;
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
      polygonSeries.mapPolygons.template.tooltipText="{name} ({id})";
      
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
