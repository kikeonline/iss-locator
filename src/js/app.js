import '../styles/styles.css'
import log from './log.js'
import { Globe, globeUpdate } from './globe.js'
import IssLocation from './fetchLoc.js'

const issLoc = new IssLocation()

issLoc.getLatLng()
.then(
  result => {
    console.log(result)
    const globe = new Globe(result.iss_position.latitude, result.iss_position.longitude)
    // globe.animate()
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