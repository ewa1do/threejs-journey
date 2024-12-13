import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

/**
 * Cursors
 */

const cursor = {
    x: 0,
    y: 0,
};

window.addEventListener("mousemove", (event) => {
    const { clientX, clientY } = event;

    cursor.x = clientX / sizes.width - 0.5;
    cursor.y = -(clientY / sizes.height - 0.5);
});

/**
 * Base
 */

const canvas = document.querySelector("canvas.webgl");

// Sizes
const sizes = {
    width: 800,
    height: 600,
};

// Scene
const scene = new THREE.Scene();

// Object
const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1, 5, 5, 5),
    new THREE.MeshBasicMaterial({ color: 0xff0000 }),
);
scene.add(mesh);

// Camera
const aspectRatio = sizes.width / sizes.height;
const camera = new THREE.PerspectiveCamera(75, aspectRatio, 0.1, 100);
// const camera = new THREE.OrthographicCamera(-1 * aspectRatio, 1 * aspectRatio, 1, -1, 0.1, 100);
// camera.position.set(2, 2, 2);
camera.position.z = 3;
camera.lookAt(mesh.position);

console.log(camera.position.length());

scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

// controls.target.y = 2;
// controls.update();

// Renderer
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(sizes.width, sizes.height);

// Time
const clock = new THREE.Clock();

// Animations
const tick = () => {
    const elapsedTime = clock.getElapsedTime();

    //Update Objects
    // mesh.rotation.y = elapsedTime;

    // Update Camera
    // camera.position.x = cursor.x * 10;
    // camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 3;
    // camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 3;
    // camera.position.y = cursor.y * Math.PI * 2;
    // camera.position.y = cursor.y * 10;
    // camera.lookAt(mesh.position);

    // Update Controls
    controls.update();

    // Render
    renderer.render(scene, camera);
    window.requestAnimationFrame(tick);
};

tick();
