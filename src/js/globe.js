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

    const radiansY = THREE.Math.degToRad(this.gData[0].lng)
    const radiansX = THREE.Math.degToRad(this.gData[0].lat)
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
      .pathDashLength(0.02)
      .pathDashGap(0.01)
      .pathDashAnimateTime(100000)

    this.globe = Globe

    // Rotate to ISS Location
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
    camera.position.z = 300

    // Add camera controls
    const tbControls = new TrackballControls(camera, renderer.domElement)
    tbControls.minDistance = 101
    tbControls.rotateSpeed = 5
    tbControls.zoomSpeed = 0.5;

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
    // this.gData.push({
    //   lat: lat,
    //   lng: lng,
    //   size: 0.1,
    //   color: 'red'
    // })

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
    console.log(this.gDataPaths)
    this.globe.pointsData(this.gData)
    this.globe.pathsData(this.gDataPaths)
  }
}

export { Globe }
