import '../styles/styles.css'
import log from './log.js'
import globe from './globe'

fetch('http://api.open-notify.org/iss-now.json?')
  .then(response => response.json())
  .then(data => console.log(data));

log('EOF')