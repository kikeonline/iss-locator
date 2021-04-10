import GetCountry from './fetchCountry'
const getCountry = new GetCountry()

export default class IssLocation {
  getLatLng () {
    const result = window.fetch('https://api.wheretheiss.at/v1/satellites/25544')
      .then(response => response.json())
      .then(data => {
        console.log(data)
        getCountry.getCountry(data.latitude, data.longitude)
        return data
      })
    return result
  }
}
