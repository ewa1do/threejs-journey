import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

/**
 * Textures
 */

// Native javascript

// const image = new Image();
// const texture = new THREE.Texture(image);
// texture.colorSpace = THREE.SRGBColorSpace;

// image.onload = () => {
//     texture.needsUpdate = true;
// };

// image.onload = () => (texture.needsUpdate = true);
// image.addEventListener("load", () => (texture.needsUpdate = true));

// image.src = "/textures/door/color.jpg";

// Loading Manager
const loadingManager = new THREE.LoadingManager();

// loadingManager.onStart = () => {
//     console.log("onStart");
// };

// loadingManager.onLoad = () => {
//     console.log("onLoad");
// };

// loadingManager.onProgress = () => {
//     console.log("onProgress");
// };

// loadingManager.onError = () => {
//     console.log("onError");
// };

// Texture Loader
const textureLoader = new THREE.TextureLoader(loadingManager);

// const colorTexture = textureLoader.load("/textures/door/color.jpg");
// const colorTexture = textureLoader.load("/textures/checkerboard-1024x1024.png");
// const colorTexture = textureLoader.load("/textures/checkerboard-8x8.png");
const colorTexture = textureLoader.load("/textures/minecraft.png");
colorTexture.colorSpace = THREE.SRGBColorSpace;

const alphaTexture = textureLoader.load("/textures/door/alpha.jpg");
alphaTexture.colorSpace = THREE.SRGBColorSpace;

const heightTexture = textureLoader.load("/textures/door/height.jpg");
heightTexture.colorSpace = THREE.SRGBColorSpace;

const normalTexture = textureLoader.load("/textures/door/normal.jpg");
normalTexture.colorSpace = THREE.SRGBColorSpace;

const ambientOcclusionTexture = textureLoader.load("/textures/door/ambientOcclusion.jpg");
ambientOcclusionTexture.colorSpace = THREE.SRGBColorSpace;

const metalnessTexture = textureLoader.load("/textures/door/metalness.jpg");
metalnessTexture.colorSpace = THREE.SRGBColorSpace;

const roughness = textureLoader.load("/textures/door/roughness.jpg");
roughness.colorSpace = THREE.SRGBColorSpace;

//Texture transformations

// Repeat
// colorTexture.repeat.x = 2;
// colorTexture.repeat.y = 3;
// colorTexture.wrapS = THREE.RepeatWrapping;
// colorTexture.wrapT = THREE.RepeatWrapping;
// colorTexture.wrapS = THREE.MirroredRepeatWrapping;
// colorTexture.wrapT = THREE.MirroredRepeatWrapping;

// colorTexture.offset.x = 0.5;
// colorTexture.offset.y = 0.5;

// colorTexture.rotation = Math.PI * 0.25;
// colorTexture.center.x = 0.5;
// colorTexture.center.y = 0.5;

// Filtering and Mipmapping
// * When we're using NearestFilter we don't need to use mipmapping
colorTexture.generateMipmaps = false;
colorTexture.minFilter = THREE.NearestFilter;
colorTexture.magFilter = THREE.NearestFilter;

/**
 * Base
 */
// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/**
 * Object
 */
const geometry = new THREE.BoxGeometry(1, 1, 1);
// console.log(geometry.attributes.uv);
const material = new THREE.MeshBasicMaterial({ map: colorTexture });
// const material = new THREE.MeshBasicMaterial({ map: alphaTexture });
// const material = new THREE.MeshBasicMaterial({ map: heightTexture });
// const material = new THREE.MeshBasicMaterial({ map: normalTexture });
// const material = new THREE.MeshBasicMaterial({ map: ambientOcclusionTexture });
// const material = new THREE.MeshBasicMaterial({ map: metalnessTexture });
// const material = new THREE.MeshBasicMaterial({ map: roughness });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
};

window.addEventListener("resize", () => {
    // Update sizes
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    // Update camera
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();

    // Update renderer
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
camera.position.x = 1;
camera.position.y = 1;
camera.position.z = 1;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
    const elapsedTime = clock.getElapsedTime();

    // Update controls
    controls.update();

    // Render
    renderer.render(scene, camera);

    // Call tick again on the next frame
    window.requestAnimationFrame(tick);
};

tick();
