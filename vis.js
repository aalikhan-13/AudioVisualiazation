import * as THREE from 'three';

// setting up a scene, perspective camera, and rederer
const scene = new THREE.scene();
// THREE.PerspectiveCamera(field of view, aspect ratio (width/height), near limit, far limit)
const camera = new THREE.PerpectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
// creates renderer instance and sets the size to the browser window
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
// adds the renderer element to the html canvas
document.body.appendChild(renderer.domElement);

// use BoxGeometry to create a cube (parameters are height, width, depth), set color, texture, and add it to the scene
const gemoetry = new THREE.BoxGeometry(1,1,1);
const material = new THREE.MeshBasicMaterial({color:0x00ff00});
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);
camera.position.z = 5;

// creating an animate function to perform the visualization
function animate() {
    renderer.render(scene, camera);
}
// creating a loop that animates every time the screen is refereshed (60 times/sec)
renderer.setAnimationLoop(animate);