import * as THREE from 'three';

console.log('shits working');
// setting up a scene, perspective camera, and rederer
const scene = new THREE.Scene();
// THREE.PerspectiveCamera(field of view, aspect ratio (width/height), near limit, far limit)
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
// creates renderer instance and sets the size to the browser window
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
// adds the renderer element to the html canvas
document.body.appendChild(renderer.domElement);


// use BoxGeometry to create a cube (parameters are height, width, depth), set color, texture, and add it to the scene
const geometry = new THREE.BoxGeometry(1,1,1);
const material = new THREE.MeshBasicMaterial({color:0x00ff00});
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// Move the camera further back
camera.position.z = 3;

// Animate function to rotate the cube
function animate() {
    cube.rotation.x += 0.01; // Rotate the cube on the x-axis
    cube.rotation.y += 0.01; // Rotate the cube on the y-axis
    renderer.render(scene, camera); // Render the scene with the camera
}
renderer.setAnimationLoop(animate); // Set the animation loop