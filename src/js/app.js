import '../styles/styles.css'
import log from './log.js'
import { Globe } from './globe.js'
import IssLocation from './fetchLoc.js'

const issLoc = new IssLocation()

issLoc.getLatLng()
  .then(
    result => {
      console.log(result)
      const { latitude, longitude } = result
      const globe = new Globe(latitude, longitude)

      setInterval(function () {
        issLoc.getLatLng()
          .then(data => {
            globe.globeUpdate(data.latitude, data.longitude)
          })
      }, 30000)
    })

log('EOF')
