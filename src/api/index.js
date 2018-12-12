const NOGO = require('node-geocoder')
,__ = require('underscore')
,AXIOS = require('axios')
,MOMENT = require('moment')
,FS=require('fs')
;

var options = {
  provider: 'datasciencetoolkit',

  // Optional depending on the providers
  httpAdapter: 'https',
  formatter: null,         // 'gpx', 'string', ...
  "user-agent":'Stalled-NYC-Construction-Bot',
  format:'json'
};

const GEOC = NOGO(options);

const _PREP = async(RAWS)=>{

console.log(__.first(RAWS));
  // const j = {"bin":"3424555","borough_name":"Brooklyn","community_board":"313","complaint_number":"3414876","date_complaint_received":"2012-06-12T00:00:00.000","dobrundate":"2018-12-03T00:00:00.000","house_number":"37          ","street_name":"BRIGHTON 2 PLACE                "}
  return new Promise((resolve,reject)=>{

let geocz = __.map(__.first(RAWS[0]),async(j,i)=>{
// console.log(j);
  const a = j.house_number.trim()+" "+j.street_name.trim()
  // +", "+j.borough_name.trim()+", New York"
// console.log("heres where we geocode "+i+":",a)
let o = j
// o.address=await _GEOCODE(a,j.borough_name.trim());
return o;
})//map
// const a = j.house_number.trim()+" "+j.street_name.trim()+", "+j.borough_name.trim()+", New York"
resolve(geocz)
})//promise
}

const _GEOCODE = async(A,B)=>{

// GEOC
//   .geocode({
//     street: A,
//     city: B,
//     state: 'New York'
//   })
//   .then(function(results) {
//     console.log(results.latitude);
//     console.log(results.longitude);
//     resolve()
//   })
//   .catch(function(e) {
//     console.log("ERROR",e)
//   });
return new Promise((resolve,reject)=>{

// console.log("a",a)
// Or using Promise
GEOC.geocode(
  {
      street: A,
      city: B,
      state: 'New York'
    }
)
.then(function(res) {
  console.log("res:",res);
  resolve(res);
})
.catch(function(err) {
  console.log("err:",err);
  reject(err);
});

})//promise
}//geocode

const _GET_FAKENYC = async()=>{
  return new Promise((resolve,reject)=>{
    FS.readFile('./T/staticnyc.json',(e,d)=>{
      resolve(JSON.parse(d));
    })//fs
  })//promise
}//fakenyc

const _GET = async(U,P)=>{
console.log("getting ",U)
  return new Promise((resolve,reject)=>{
   AXIOS.get(U,P)
   .then(function (response) {
     resolve(response);
   })
   .catch(function (error) {
     console.log(error);
     reject(error);
   });
})//promise
}//_GET

const _GET_NYC = async ()=>{
  let uri = "https://data.cityofnewyork.us/resource/m2i4-ujnn.json?$where=dobrundate%20between%20%272018-12-03T00:00:00%27%20and%20%272018-12-04T23:59:59%27&$limit=999999"
  const r = await _GET(uri);
  return new Promise((resolve,reject)=>{

    resolve(r)

})//promise
}

const main = async () =>{

  // let stalledsRaw = await _GET_NYC()
  let stalledsRaw = await _GET_FAKENYC()
  // console.log(stalledsRaw);
  // if(stalledsRaw.length>0){
    let geocoded = await _PREP(stalledsRaw);
    console.log(geocoded);
  // }

}

main();
