import '../styles/styles.css'
import log from './log.js'
import { Globe } from './globe.js'
import IssLocation from './fetchLoc.js'

const issLoc = new IssLocation()

issLoc.getLatLng()
  .then(
    result => {
      console.log(result)
      /* eslint-disable-next-line */
      const { iss_position } = result
      console.log(iss_position)
      const globe = new Globe(iss_position.latitude, iss_position.longitude)

      setInterval(function () {
        issLoc.getLatLng()
          .then(data => {
            // console.log(data)
            globe.globeUpdate(data.iss_position.latitude, data.iss_position.longitude)
          })
      }, 30000)
    })

log('EOF')
