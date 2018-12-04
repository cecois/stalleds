<template>
<div>

<div id="notmap" class="columns">
  <div id="brand" class="column is-one-quarter">
    ~stalleds~ https://data.cityofnewyork.us/resource/m2i4-ujnn.json?$where=dobrundate%20between%20%272018-12-03T00:00:00%27%20and%20%272018-12-04T23:59:59%27&$limit=999999
  </div>
  <div id="" class="column is-three-quarters has-text-grey-light is-size-7 has-text-right is-lowercase">
    <div style="width:100%;height:80%;">
      <div id="console" v-bind:class="{'is-invisible':(this.temp.msg=='')}">{{this.temp.msg}}</div>
    </div>
    <div style="width:100%;height:20%;">
      <small id="attribution">
      &copy; code:C.C.Miller, &copy; data:<a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, &copy; basemap ({{this.basemap.nom}}): {{this.basemap.source}}
    </small>
    </div>

  </div>
</div>

<div class="has-text-right is-pulled-right" id="bio" v-bind:class="{'is-invisible':(!bio)}">
    {{bio}}
  </div>
      <div id="map" class="map"></div>
<ul id="map-menu" class="columns">
  <li v-for="map in this.basemaps" class="column">
    <div v-tooltip="{
  content: map.nom,
  placement: 'top-center',
  classes: ['info'],
  targetClasses: ['it-has-a-tooltip'],
  offset: 10,
  delay: {
    show:0,
    hide: 50,
  },
}" class="map-menu-item" v-on:click="switchMap(map.key,'loaded')" v-bind:class="{'active':(map.active)}" :style='{ backgroundImage: "url(./static/map-menu-thumbs/" + map.key + ".png)", }'></div>
    </li>
</ul>
</div>
</template>

<script>
const MODE=process.env.MODE

export default {
  name: 'Default',
  data () {
    return {
      basemaps:[
      {baseline:"#eafafa",highlight:"#de39ac",source:"carto.com",key:"dark_all",nom:"Carto Dark",uri:"http://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}@2x.png",active:true}
      ,{baseline:"#464646",highlight:"#9572eb",source:"carto.com",key:"light_all",nom:"Carto Light",uri:"http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}@2x.png",active:false}
      ,{baseline:"#3300b4",highlight:"#156e16",source:"esri",key:"esri_natgeo",nom:"Esri National Geographic",uri:"http://services.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}",active:false}
      ,{baseline:"#777b49",highlight:"#db5848",source:"wmflabs.org",key:"mapnik_bw",nom:"Mapnik B/W",uri:"http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png",active:false}
      ,{baseline:"#7b3025",highlight:"#efd3da",source:"stamen.com",key:"stamen_toner",nom:"Stamen Toner",uri:"http://tile.stamen.com/toner/{z}/{x}/{y}.png",active:false}
      ,{baseline:"#70753a",highlight:"#31bf69",source:"stamen.com",key:"stamen_toner_lite",nom:"Stamen Toner Light",uri:"http://tile.stamen.com/toner-lite/{z}/{x}/{y}.png",active:false}
      ,{baseline:"#5a5c58",highlight:"#26a9c8",source:"stamen.com",key:"stamen_watercolor",nom:"Stamen Watercolor",uri:"http://tile.stamen.com/watercolor/{z}/{x}/{y}.jpg",active:false}
      ,{baseline:"#f8601b",highlight:"#798fc2",source:"waze.com",key:"waze_us",nom:"Waze US",uri:"https://livemap-tiles3.waze.com/tiles/{z}/{x}/{y}.png",active:false}
      ,{baseline:"#404040",highlight:"#2e688d",source:"yandex.net",key:"yandex",nom:"Yandex",uri:"http://vec01.maps.yandex.net/tiles?l=map&x={x}&y={y}&z={z}",active:false}
      ,{baseline:"#562c24",highlight:"#9d86ce",active:false,nom:"AJ Ashton's Pencil",source:"mapbox.com",key:"mapbox_ashton_pencil",uri:"http://{s}.tiles.mapbox.com/v4/aj.03e9e12d/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejdueG92YjAwZHUzMnA5ZWIyMW1zcDQifQ.acDRLVcqW0LZfWQXvC3-pw"}
,{baseline:"#de6662",highlight:"#28660b",active:false,nom:"Pinterest by Stamen",source:"stamen.com",key:"stamen_pinterest",uri:"http://{s}.tiles.mapbox.com/v3/pinterest.map-ho21rkos/{z}/{x}/{y}.png"}
,{baseline:"#02050b",highlight:"#584f18",active:false,nom:"Woodcut by Eleanor Lutz",source:"mapbox.com",key:"mapbox_lutz_woodcut",uri:"http://{s}.tiles.mapbox.com/v4/mapbox.b0v97egc/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejdueG92YjAwZHUzMnA5ZWIyMW1zcDQifQ.acDRLVcqW0LZfWQXvC3-pw"}
,{baseline:"#7094b7",highlight:"#9effcf",active:false,nom:"Space Station by Eleneor Lutz",source:"mapbox.com",key:"mapbox_lutz_spacestation",uri:"http://{s}.tiles.mapbox.com/v3/eleanor.ipncow29/{z}/{x}/{y}.png"}
,{baseline:"#b57027",highlight:"#ec9992",active:false,nom:"MapBox Financial Times",source:"mapbox.com",key:"mapbox_financialtimes",uri:"http://{s}.tiles.mapbox.com/v3/financialtimes.map-w7l4lfi8/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiZHVuY2FuZ3JhaGFtIiwiYSI6IlJJcWdFczQifQ.9HUpTV1es8IjaGAf_s64VQ"}
,{baseline:"#d15b13",highlight:"#e3e7dc",active:false,nom:"MapBox InfoAmazonia (Color)",source:"mapbox.com",key:"mapbox_infoamazonia_color",uri:"http://{s}.tiles.mapbox.com/v3/infoamazonia.map-ihpa46c3/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiZHVuY2FuZ3JhaGFtIiwiYSI6IlJJcWdFczQifQ.9HUpTV1es8IjaGAf_s64VQ"}
,{baseline:"#802816",highlight:"#75b0aa",active:false,nom:"Mapnik Mono",source:"wmflabs.org",key:"mapnik_mono",uri:"http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png"}
,{baseline:"#89baa9",highlight:"#c8cdcc4",active:false,nom:"Blueprint by Amy Lee Walton",source:"mapbox.com",key:"mapbox_mslee_blueprint",uri:"http://api.mapbox.com/styles/v1/mslee/ciellcr9y001g5pknxuqwjhqm/tiles/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoibXNsZWUiLCJhIjoiclpiTWV5SSJ9.P_h8r37vD8jpIH1A6i1VRg"}
,{baseline:"#707171",highlight:"#bee1e6",active:false,nom:"Winter by Amy Lee Walton",source:"mapbox.com",key:"mapbox_mslee_winter",uri:"http://api.mapbox.com/styles/v1/mslee/cij1zoclj002y8rkkdjl69psd/tiles/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoibXNsZWUiLCJhIjoiclpiTWV5SSJ9.P_h8r37vD8jpIH1A6i1VRg"}
,{baseline:"#5a6059",highlight:"#73327c",active:false,nom:"Standard Oil by Saman Bemel Benrud",source:"mapbox.com",key:"mapbox_saman_standardoil",uri:"http://api.mapbox.com/styles/v1/saman/cif61g3y602sju1m5b02255c9/tiles/{z}/{x}/{y}?access_token=pk.eyJ1Ijoic2FtYW4iLCJhIjoiS1ptdnd0VSJ9.19qza-F_vXkgpnh80oZJww"}
,{baseline:"#e9a071",highlight:"#9db194",active:false,nom:"Camouflage by Eden Halperin",source:"mapbox.com",key:"mapbox_edenhalperin_camouflage",uri:"http://api.mapbox.com/styles/v1/edenhalperin/cifq0r0e5000q85m0d293k6mq/tiles/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiZWRlbmhhbHBlcmluIiwiYSI6IlFRZG0zMWMifQ.QUNKx4tIMjZfwmrE8SE6Bg"}
,{baseline:"#8e300b",highlight:"#91aac5",active:false,nom:"MapBox Comic!",source:"mapbox.com",key:"mapbox_comic",uri:"https://{s}.tiles.mapbox.com/v4/mapbox.comic/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiYmVydHQiLCJhIjoiaWFvN1Z4USJ9.k04Q6CVms4Gx7KDZxvAx2A"}
,{baseline:"#6c4f18",highlight:"#585c46",active:false,nom:"MapBox Emerald",source:"mapbox.com",key:"mapbox_emerald",uri:"https://{s}.tiles.mapbox.com/v4/mapbox.emerald/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiYmVydHQiLCJhIjoiaWFvN1Z4USJ9.k04Q6CVms4Gx7KDZxvAx2A"}
,{baseline:"#c405cc",highlight:"#cc78b2",active:false,nom:"MapBox High Contrast",source:"mapbox.com",key:"mapbox_contrast",uri:"https://{s}.tiles.mapbox.com/v4/mapbox.high-contrast/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiYmVydHQiLCJhIjoiaWFvN1Z4USJ9.k04Q6CVms4Gx7KDZxvAx2A"}
,{baseline:"#4a3c33",highlight:"#fcf5f3",active:false,nom:"MapBox Outdoors",source:"mapbox.com",key:"mapbox_outdoors",uri:"https://{s}.tiles.mapbox.com/v4/mapbox.outdoors/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiYmVydHQiLCJhIjoiaWFvN1Z4USJ9.k04Q6CVms4Gx7KDZxvAx2A"}
,{baseline:"#ffffff",highlight:"#1ec477",active:false,nom:"MapBox Wheatpaste",source:"mapbox.com",key:"mapbox_wheatpaste",uri:"https://{s}.tiles.mapbox.com/v4/mapbox.wheatpaste/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiYmVydHQiLCJhIjoiaWFvN1Z4USJ9.k04Q6CVms4Gx7KDZxvAx2A"}
      ],
      lot: null,
      bio: null,
      slug: null,
      supply:null,
      map: null,
  tileLayer: null,
  lots: null,
      "temp": {
        msg:""
  }
}
  },
  computed: {
//     palette:function(){
// let k = this.$_.findWhere(this.basemaps, {active:true})

// return k.colors;
//     }
// ,
basemap:function(){
  // return this.basemaps[0];
  return this.$_.findWhere(this.basemaps, {active:true});
}
  },
  watch: {
  tileLayer: function() {this.routize();this.lrender()}
    ,lot: function() {this.routize();this.lrender();}
  //,slug: function() {this.routize();}
  ,supply: function() {this.lrender();}
  // ,basemaps: function() {this.lrender();}
    },
  created() {
    // this.basemap=(typeof this.$route.params.basemap !== 'undefined')?this.switchMap(this.$route.params.basemap):this.$_.findWhere(this.basemaps, {active:true});
  if(typeof this.$route.params.map !== 'undefined' && this.$route.params.map!==null){this.switchMap(this.$route.params.map)}
  },
  mounted() {
    // this.color_active=(typeof this.$route.params.hue !== 'undefined')?this.$route.params.hue:'yellow'
this.lot=(typeof this.$route.params.lot !== 'undefined')?this.$route.params.lot:null
    // this.slug=(typeof this.$route.params.slug !== 'undefined')?this.$route.params.slug:null

    this.initMap()
    this.initLayers()
    this.substyle()
},
  methods: {
    switchMap(n,l){
      this.$_.each(this.basemaps,(b)=>{
        if(b.key==n){b.active=true}else{b.active=false}
      })
      if(l){
      this.reDraw()
    }
    },
    reDraw(){

// if(typeof this.map !== null && typeof this.map !=='undefined'){
this.map.removeLayer(this.tileLayer);

this.tileLayer = L.tileLayer(
  this.$_.findWhere(this.basemaps, {active:true}).uri,
  {
    maxZoom: 18
    ,isBaseMap:true
  }
).addTo(this.map);

// }

  }
    ,defaultStyle(){
var that=this;
return {
      fill:true
      ,color:that.color_default
      ,fillColor:that.color_default
      ,fillOpacity:.5
      ,opacity:.5
            }
    },
    getHue(w){
let k = this.$_.findWhere(this.basemaps, {active:true})
let c = null
switch(w) {
    case 'active':
c = k.highlight
        break;
    default:
c = k.baseline
}

let style = {
      fill:true
      ,color:c
      ,fillColor:c
      ,fillOpacity:.7
            }
            return style
    }
    ,activeStyle(){
var that=this;
let p = this.palette
return  {
      fill:true
      ,color:p.active
      ,fillColor:p.active
      ,fillOpacity:.7
            }
    },
    substyle(){
var that = this;
this.lots.eachLayer(function (layergrouplayer) {

layergrouplayer.eachLayer(function(f){

  if(f.feature.properties.objectid==that.lot){
    f.setStyle(
     that.getHue('active')
      )
    that.bio=f.feature.properties.bio
    that.map.fitBounds(f.getBounds())
  } else {
    f.setStyle(that.getHue())
  }
  f.bindPopup(f.feature.properties.siteaddres+", "+f.feature.properties.sitecity);
  f.on('click',function(e){
    that.lot=e.sourceTarget.feature.properties.objectid
  })
})
});

    },
    routize(){
      //this.$router.push({ params:{lot:this.lot,slug:this.slug,map:this.basemap.key,bbox:this.map.getBounds().toBBoxString() }})
      this.$router.push({ params:{map:this.basemap.key,bbox:this.map.getBounds().toBBoxString(),lot:this.lot }})
    },
    lrender(){
this.lots.clearLayers();
this.lots.addLayer(L.geoJson(this.supply, {style:this.getHue()}));

this.substyle();
}
     ,prepBbox(b){
       let a = b.split(",")
       if(a.length<4){return "invalid bbox string"}else{
         return [
           [a[1],a[0]]
           ,[a[3],a[2]]
         ]
       }
     }
    ,initMap() {
      let bbox =(typeof this.$route.params.bbox !== 'undefined')?this.prepBbox(this.$route.params.bbox):[[33.64197541854496,-84.84937816858294],[33.86519744005887,-83.85168224573135]]
// a little of ye ol that=this
      var that=this
      this.map = L.map('map').fitBounds(bbox)
      .on('moveend',function(e){
that.routize()
      })

this.tileLayer = L.tileLayer(
  this.$_.findWhere(this.basemaps, {active:true}).uri,
  {
    maxZoom: 18
  }
);

this.lots = L.layerGroup(null).addTo(this.map)


this.tileLayer.addTo(this.map);

this.temp.msg="fetching lots..."
axios.get('https://cecmcgee.carto.com/api/v2/sql?format=GeoJSON&q=SELECT * FROM atl_tax_parcel_parking')
    .then(response => {
      // JSON responses are automatically parsed.
      this.temp.msg=""
      this.supply = response.data
    })
    .catch(e => {
    this.temp.msg="fetch from carto.com failed :-( refresh?"
      this.errors.push(e)
    })
// }


    },
  initLayers() {},
    add_client_addl(){
this.clients.related.push({})
    }
  ,test(){
    console.info("test method")
}
  }// methods
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
/** --------------------------------------------- tooltip ----------------- **/
.tooltip {
  display: block !important;
  z-index: 10000;
}

.tooltip .tooltip-inner {
  background: black;
  opacity: .5;
  color: white;
  border-radius: 3px;
  padding: 5px 10px 4px;
}

.tooltip .tooltip-arrow {
  width: 0;
  height: 0;
  border-style: solid;
  position: absolute;
  margin: 5px;
  border-color: black;
  z-index: 1;
}

.tooltip[x-placement^="top"] {
  margin-bottom: 5px;
}

.tooltip[x-placement^="top"] .tooltip-arrow {
  border-width: 5px 5px 0 5px;
  border-left-color: transparent !important;
  border-right-color: transparent !important;
  border-bottom-color: transparent !important;
  opacity:.5;
  bottom: -5px;
  left: calc(50% - 5px);
  margin-top: 0;
  margin-bottom: 0;
}

.tooltip[x-placement^="bottom"] {
  margin-top: 5px;
}

.tooltip[x-placement^="bottom"] .tooltip-arrow {
  border-width: 0 5px 5px 5px;
  border-left-color: transparent !important;
  border-right-color: transparent !important;
  border-top-color: transparent !important;
  top: -5px;
  left: calc(50% - 5px);
  margin-top: 0;
  margin-bottom: 0;
}

.tooltip[x-placement^="right"] {
  margin-left: 5px;
}

.tooltip[x-placement^="right"] .tooltip-arrow {
  border-width: 5px 5px 5px 0;
  border-left-color: transparent !important;
  border-top-color: transparent !important;
  border-bottom-color: transparent !important;
  left: -5px;
  top: calc(50% - 5px);
  margin-left: 0;
  margin-right: 0;
}

.tooltip[x-placement^="left"] {
  margin-right: 5px;
}

.tooltip[x-placement^="left"] .tooltip-arrow {
  border-width: 5px 0 5px 5px;
  border-top-color: transparent !important;
  border-right-color: transparent !important;
  border-bottom-color: transparent !important;
  right: -5px;
  top: calc(50% - 5px);
  margin-left: 0;
  margin-right: 0;
}

.tooltip.popover .popover-inner {
  background: #f9f9f9;
  color: black;
  padding: 24px;
  border-radius: 5px;
  box-shadow: 0 5px 30px rgba(black, .1);
}

.tooltip.popover .popover-arrow {
  border-color: #f9f9f9;
}

.tooltip[aria-hidden='true'] {
  visibility: hidden;
  opacity: 0;
  transition: opacity .15s, visibility .15s;
}

.tooltip[aria-hidden='false'] {
  visibility: visible;
  opacity: 1;
  transition: opacity .15s;
}
/** ------------------------- /tooltip ----------------- **/

#brand{
  font-size:2.6em;
  font-weight:800;
  font-family: 'Slabo 27px', serif;
  letter-spacing:0px;
    padding:.5% 3%;
}
#app{
  padding:0;
  margin:0;
}
#lot{
  color:yellow;
}
#bio{
  padding:.5% 3%;
  background-color:rgba(255,255,255,.9);
  letter-spacing: -2px;
  font-size:2em;
  height:100%;
  width:90%;
}
#copy{
  color:yellow;
  font-weight:800;
}
#map{
  height:90vh;
  width:100%;
  position:absolute;
  margin:0;padding:0;
  z-index:-1;
}
#map-menu{
  height:40px;
  /*width:30%;*/
  position:absolute;
  /*margin:0;padding:0 2%;*/
  margin:0;
  padding:.5% .5%;
  bottom:0;
  border-top-right-radius:5%;
  background-color:rgba(255,255,255,.8);
  /*z-index:-98;*/
}

#map-menu > li{padding:0 3px;}

  #map-menu > li > .map-menu-item{
    background-color:white;
    padding: 0px;
/* line-height: 34px; */
border-radius:50%;
    /* margin-right:1%; */
    border-color:white;
    border-style: solid;
    border-width:1px;
    height:27px;
    width:27px;
  }
  #map-menu > li > .map-menu-item:hover{
    border-color:rgb(0,0,0);
      box-shadow: 0px 0px 2px 1px rgba(0,0,0, .2)
  }
    #map-menu > li > .map-menu-item.active{
      border-color:rgb(0,0,0);
      box-shadow: 0px 0px 2px 1px rgba(0,0,0, .8)
    }
#notmap{
  background-color:white;
  height:10vh;
  z-index:0;
  position:relative;
  width:100%;
  margin:0;padding:0;
}

#attribution >a{
  color:inherit;text-decoration:none;
}
#console{
  font-family: 'Slabo 27px', serif;
  letter-spacing:3px;
  font-weight:800;
}

</style>