import '../styles/styles.css'
import log from './log.js'
import { Globe, globeUpdate } from './globe.js'
import IssLocation from './fetchLoc.js'
import GetCountry from './fetchCountry'

const issLoc = new IssLocation()
const getCountry = new GetCountry()

issLoc.getLatLng()
.then(
  result => {
    const { iss_position } = result
    const country = getCountry.getCountry(iss_position.latitude, iss_position.longitude)
    const globe = new Globe(iss_position.latitude, iss_position.longitude)
    })

  // setInterval(function(){ 
  // fetch('http://api.open-notify.org/iss-now.json?')
  // .then(response => response.json())
  // .then(data => {
  //   console.log(data)
  //   globeUpdate(data.iss_position.latitude,data.iss_position.longitude)
  // })
  // }, 10000)


log('EOF')