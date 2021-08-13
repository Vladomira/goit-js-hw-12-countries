

// export default function fetchMap(county){
//     return fetch( `https://pcmiler.alk.com/apis/rest/v1.0/Service.svc/polygons/${county}`)
//       .then(response => response.json())
//       .then(maps => maps)
//       .catch(error => error)  
// }

https://pcmiler.alk.com/apis/rest/v1.0/service.svc/map
export default function fetchMap(county){
    return fetch( `https://pcmiler.alk.com/apis/rest/v1.0/service.svc/${map}`)
      .then(response => response.json())
      .then(maps => maps)
      .catch(error => error)  
}