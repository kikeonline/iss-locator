import { GEONAMES_USERNAME } from "@env"

const element = document.getElementById('country-label')

export default class GetCountry {
  getCountry(lat, lng){
    fetch(`http://api.geonames.org/countryCodeJSON?lat=${lat}&lng=${lng}&username=${GEONAMES_USERNAME}`)
      .then(response => response.json())
      .then(conuntryResult => {
        // console.log(conuntryResult)
        if (typeof conuntryResult.status === 'undefined') {
          console.log('Country: ' + conuntryResult.countryName)
          element.innerHTML = conuntryResult.countryName
        } else {
          const getOcean = fetch(`http://api.geonames.org/oceanJSON?lat=${lat}&lng=${lng}&username=${GEONAMES_USERNAME}`)
          getOcean.then(response => response.json())
          .then(oceanResult => {
            console.log('Ocean: ' + oceanResult.ocean.name)
            element.innerHTML = oceanResult.ocean.name
          })
        }
      })
  }
}