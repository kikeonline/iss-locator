import * as THREE from 'three';
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls.js';
import ThreeGlobe from 'three-globe';


    // Gen random data
    const gData = [{
      lat: '-51.2532',
      lng: '-154.2825',
      size: 0.1,
      color: 'red'
    }];

    const Globe = new ThreeGlobe({ animateIn: true})
      .globeImageUrl('//unpkg.com/three-globe/example/img/earth-night.jpg')
      .bumpImageUrl('//unpkg.com/three-globe/example/img/earth-topology.png')
      .showAtmosphere(true)
      .showGraticules(true)
      .pointsData(gData)
      .pointAltitude('size')
      .pointColor('color');

    const issLatLng = Globe.getCoords(gData[0].lat, gData[0].lng);

    console.log(issLatLng);

    // Setup renderer
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('globe').appendChild(renderer.domElement);

    // Setup scene
    const scene = new THREE.Scene();
    scene.add(Globe);
    scene.add(new THREE.AmbientLight(0xbbbbbb));
    scene.add(new THREE.DirectionalLight(0xffffff, 0.2));

    // Setup camera
    const camera = new THREE.PerspectiveCamera();
    camera.aspect = window.innerWidth/window.innerHeight;
    camera.updateProjectionMatrix();
    camera.position.z = 300;

    // Add camera controls
    const tbControls = new TrackballControls(camera, renderer.domElement);
    tbControls.minDistance = 101;
    tbControls.rotateSpeed = 5;
    tbControls.zoomSpeed = 0.8;


    // const issX  = gData[0].lat / 3.14;
    const issX  = issLatLng.x * Math.PI;
    const issY  = issLatLng.y;
    const issZ  = issLatLng.z;
    
    Globe.rotation.x = -0.5;
    Globe.rotation.y = issX;
    // Globe.rotation.z = issZ / 100;

    console.log(issX, issY, issZ);

    // Kick-off renderer
    (function animate() {
      // Frame cycle
      tbControls.update();
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
      Globe.rotation.y -= 0.000005;
    })();