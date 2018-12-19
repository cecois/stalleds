const NOGO = require('node-geocoder')
,__ = require('underscore')
,AXIOS = require('axios')
,MOMENT = require('moment')
,FS=require('fs')
;

var options = {
  provider: 'datasciencetoolkit',

  // Optional depending on the providers
  httpAdapter: 'http',
  formatter: null,         // 'gpx', 'string', ...
  "user-agent":'Stalled-NYC-Construction-Bot',
  format:'json'
};

const GEOC = NOGO(options);

const _PREP = async(RAWS)=>{

  // const j = {"bin":"3424555","borough_name":"Brooklyn","community_board":"313","complaint_number":"3414876","date_complaint_received":"2012-06-12T00:00:00.000","dobrundate":"2018-12-03T00:00:00.000","house_number":"37          ","street_name":"BRIGHTON 2 PLACE                "}
  return new Promise((resolve,reject)=>{
    console.log('mapping...')
    let geocz = __.map(__.first(RAWS,2),async(j,i)=>{
      const a = j.house_number.trim()+" "+j.street_name.trim()+", "+j.borough_name.trim()+", New York"
// console.log("heres where we geocode "+i+":",a)
// let o = j
// o.address=a
// o.location=await _GEOCODE(a,j.borough_name.trim());
return a;
})//map
// const a = j.house_number.trim()+" "+j.street_name.trim()+", "+j.borough_name.trim()+", New York"
resolve(geocz)
})//promise
}

const _GEOCODETEST = async(A,B)=>{

return new Promise((resolve,reject)=>{

let o = {
  street: '33 Lancaster Terrace',
  city: 'Brookline',
  state: 'MA'
}

console.log("o",o)
// Or using Promise
GEOC.geocode(
o
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

const _GEOCODE = async(ALL)=>{

console.log("geocding "+ALL.length+" items...")
return new Promise((resolve,reject)=>{


GEOC.batchGeocode(ALL)
  .then(function(res) {
    // console.log(res);
    resolve(res);
  })
  .catch(function(err) {
    // console.log(err);
    reject(err);
  });

// GEOC.batchGeocode(ALL, function (err, res) {
//   if(err){reject(err);}
//   // Return an array of type {error: false, value: []}
//   resolve(res)
// });

})//promise
}//geocode

const _GET_FAKENYC = async()=>{
  return new Promise((resolve,reject)=>{
    FS.readFile('./T/staticnyc.json',(e,d)=>{
      let j = JSON.parse(d);
      resolve(j);
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
  // console.log(stalledsRaw.length);
  // if(stalledsRaw.length>0){
    let prepped = await _PREP(stalledsRaw);
let geocoded = await _GEOCODE(prepped);
    // let geocoded = await _GEOCODETEST();
    console.log(JSON.stringify(geocoded));
  // }

}

main();
