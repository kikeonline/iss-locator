import { GEONAMES_USERNAME } from "@env"

const element = document.getElementById('country-label')

export default class GetCountry {
  getCountry(lat, lng){
    const result =  fetch(`http://api.geonames.org/countryCodeJSON?lat=${lat}&lng=${lng}&radius=200&username=${GEONAMES_USERNAME}`)
      .then(response => response.json())
      .then(data => {
        if (data.status.message === 'no country code found') {
          const getOcean = fetch(`http://api.geonames.org/oceanJSON?lat=${lat}&lng=${lng}&username=${GEONAMES_USERNAME}`)
          getOcean.then(response => response.json())
          .then(data => {
            console.log(data.ocean.name) 
            element.innerHTML = data.ocean.name
          })
        }
        return data.countryName
      })
      return result
  }
}