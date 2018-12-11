const NOGO = require('node-geocoder')
,__ = require('underscore')
,AXIOS = require('axios')
,MOMENT = require('moment')
;

var options = {
  provider: 'datasciencetoolkit',

  // Optional depending on the providers
  httpAdapter: 'http', // Default
  formatter: null,         // 'gpx', 'string', ...
  "user-agent":'Stalled-NYC-Construction-Bot',
  format:'json'
};

const geocoder = NOGO(options);

const _GEOCODE = async(U,P)=>{

  const j = {"bin":"3424555","borough_name":"Brooklyn","community_board":"313","complaint_number":"3414876","date_complaint_received":"2012-06-12T00:00:00.000","dobrundate":"2018-12-03T00:00:00.000","house_number":"37          ","street_name":"BRIGHTON 2 PLACE                "}
  const a = j.house_number.trim()+" "+j.street_name.trim()+", "+j.borough_name.trim()+", New York"

// const a = j.house_number.trim()+" "+j.street_name.trim()+", "+j.borough_name.trim()+", New York"

// GEOC
//   .geocode({
//     street: j.house_number.trim()+" "+j.street_name.trim(),
//     city: j.borough_name.trim(),
//     state: 'New York'
//   })
//   .then(function(results) {
//     console.log(results.latitude);
//     console.log(results.longitude);
//   })
//   .catch(function(e) {
//     console.log("ERROR",e)
//   });

console.log("a",a)
// Or using Promise
geocoder.geocode(a)
.then(function(res) {
  console.log("res:",res);
})
.catch(function(err) {
  console.log("err:",err);
});

}


const _GET = async(U,P)=>{

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

  let stalledsRaw = await _GET_NYC()
  console.log(stalledsRaw);

}

main();