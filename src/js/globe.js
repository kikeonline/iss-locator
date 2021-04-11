import * as THREE from 'three'
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls.js'
import ThreeGlobe from 'three-globe'

class Globe {
  constructor (lat, lng) {
    this.lat = lat
    this.lng = lng

    this.gData = [{
      lat: this.lat,
      lng: this.lng,
      size: 0.1,
      color: 'red'
    }]

    const radiansY = THREE.Math.degToRad(this.gData[0].lng)
    const radiansX = THREE.Math.degToRad(this.gData[0].lat)
    const Globe = new ThreeGlobe({ animateIn: true })
      .globeImageUrl('//unpkg.com/three-globe/example/img/earth-night.jpg')
      .bumpImageUrl('//unpkg.com/three-globe/example/img/earth-topology.png')
      .showAtmosphere(true)
      .showGraticules(true)
      .pointsData(this.gData)
      .pointAltitude('size')
      .pointColor('color')

    this.globe = Globe

    // Rotate to ISS Location
    console.log('radiansY: ' + radiansY)
    console.log('radiansX: ' + radiansX)
    Globe.rotation.y = -radiansY
    Globe.rotation.x = radiansX

    // Setup renderer
    const renderer = new THREE.WebGLRenderer()
    renderer.setSize(window.innerWidth, window.innerHeight)
    document.getElementById('globe').appendChild(renderer.domElement)

    // Setup scene
    const scene = new THREE.Scene()
    scene.add(Globe)
    scene.add(new THREE.AmbientLight(0xbbbbbb))
    scene.add(new THREE.DirectionalLight(0xffffff, 0.2))

    // Setup camera
    const camera = new THREE.PerspectiveCamera()
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    camera.position.z = 300

    // Add camera controls
    const tbControls = new TrackballControls(camera, renderer.domElement)
    tbControls.minDistance = 101
    tbControls.rotateSpeed = 5
    tbControls.zoomSpeed = 0.5;

    // const issX  = gData[0].lat / 3.14;
    // const issX = issLatLng.x * Math.PI
    // const issY = issLatLng.y
    // const issZ = issLatLng.z

    // Globe.rotation.x = -0.5;
    // Globe.rotation.y = issX;
    // Globe.rotation.z = issZ / 100;
    // console.log(issX, issY, issZ);

    // Kick-off renderer
    (function animate () {
      // Frame cycle
      tbControls.update()
      renderer.render(scene, camera)
      requestAnimationFrame(animate)
      Globe.rotation.y -= 0.000005
    })()
  }

  globeUpdate (lat, lng) {
    this.gData.push({
      lat: lat,
      lng: lng,
      size: 0.1,
      color: 'red'
    })

    // const radiansY = THREE.Math.degToRad(this.gData[0].lng)
    // const radiansX = THREE.Math.degToRad(this.gData[0].lat)
    // console.log(radiansX, radiansY)
    // this.globe.rotation.y = -radiansY
    // this.globe.rotation.x = radiansX
    this.globe.pointsData(this.gData)
  }
}

export { Globe }
