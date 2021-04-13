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

    this.gDataPaths = [
      [
        [
          this.lat,
          this.lng
        ]
      ]
    ]

    console.log(this.gDataPaths)

    const Globe = new ThreeGlobe({ animateIn: true })
      .globeImageUrl('//unpkg.com/three-globe/example/img/earth-dark.jpg')
      .bumpImageUrl('//unpkg.com/three-globe/example/img/earth-topology.png')
      .showAtmosphere(true)
      .showGraticules(true)
      .pointsData(this.gData)
      .pointAltitude('size')
      .pointColor('color')
      .pathsData(this.gDataPaths)
      .pathPointAlt(0.1)
      .pathColor(() => ['rgba(174, 252, 148, 1.000)', 'red'])
      .pathDashLength(1)
      .pathDashGap(0)
      .pathDashAnimateTime(100000)

    this.globe = Globe

    // Rotate to ISS Location
    const radiansY = THREE.Math.degToRad(this.gData[0].lng)
    const radiansX = THREE.Math.degToRad(this.gData[0].lat)
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
    scene.add(new THREE.DirectionalLight(0xffffff, 0.5))

    // Setup camera
    const camera = new THREE.PerspectiveCamera()
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    camera.position.z = 250

    // Add camera controls
    const tbControls = new TrackballControls(camera, renderer.domElement)
    tbControls.minDistance = 150
    tbControls.maxDistance = 350
    tbControls.rotateSpeed = 2
    tbControls.zoomSpeed = 0.3

    // Kick-off renderer
    function animate () {
      // Frame cycle
      tbControls.update()
      renderer.render(scene, camera)
      requestAnimationFrame(animate)
      Globe.rotation.y -= 0.000005
    }
    animate()
  }

  globeUpdate (lat, lng) {
    this.gData = [{
      lat: lat,
      lng: lng,
      size: 0.1,
      color: 'red'
    }]

    this.gDataPaths[0].push([
      lat,
      lng
    ])

    this.globe.pointsData(this.gData)
    this.globe.pathsData(this.gDataPaths)

    // Rotate to ISS Location
    const radiansY = THREE.Math.degToRad(this.gData[0].lng)
    const radiansX = THREE.Math.degToRad(this.gData[0].lat)
    this.globe.rotateY = -radiansY
    this.globe.rotateX = radiansX
  }
}

export { Globe }
