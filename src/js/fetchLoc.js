import GetCountry from './fetchCountry'
const getCountry = new GetCountry()

export default class IssLocation {
  getLatLng () {
    const result = window.fetch('http://api.open-notify.org/iss-now.json?')
      .then(response => response.json())
      .then(data => {
        console.log(data)
        getCountry.getCountry(data.iss_position.latitude, data.iss_position.longitude)
        return data
      })
    return result
  }
}
