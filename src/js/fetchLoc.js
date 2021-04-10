export default class IssLocation {
  getLatLng(){
    const result =  fetch('http://api.open-notify.org/iss-now.json?')
      .then(response => response.json())
      .then(data => {
        return data
      })
      return result
  }
}