import { GEONAMES_USERNAME } from '@env'

const element = document.getElementById('country-label')

export default class GetCountry {
  getCountry (lat, lng) {
    window.fetch(`https://secure.geonames.org/countryCodeJSON?lat=${lat}&lng=${lng}&username=${GEONAMES_USERNAME}`)
      .then(response => response.json())
      .then(conuntryResult => {
        if (typeof conuntryResult.status === 'undefined') {
          console.log('Country: ' + conuntryResult.countryName)
          element.innerHTML = conuntryResult.countryName
        } else {
          const getOcean = window.fetch(`https://secure.geonames.org/oceanJSON?lat=${lat}&lng=${lng}&username=${GEONAMES_USERNAME}`)
          getOcean.then(response => response.json())
            .then(oceanResult => {
              console.log('Ocean: ' + oceanResult.ocean.name)
              element.innerHTML = oceanResult.ocean.name
            })
        }
      })
  }
}
