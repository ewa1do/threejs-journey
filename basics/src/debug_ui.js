import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import gsap from "gsap";
import GUI from "lil-gui";

/**
 * DEBUG
 */

const gui = new GUI({
    width: 340,
    title: "Nice debug UI",
    closeFolders: true,
});
// gui.hide();

window.addEventListener("keypress", (e) => {
    if (e.key === "h") {
        gui.show(gui._hidden);
    }
});

const debugObj = {};

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

debugObj.color = "#a778d8";

const geometry = new THREE.BoxGeometry(1, 1, 1, 2, 2, 2);
const material = new THREE.MeshBasicMaterial({ color: debugObj.color, wireframe: true });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

const cubeTweaks = gui.addFolder("Awesome cube");
// cubeTweaks.close();

cubeTweaks.add(mesh.position, "y").min(-3).max(3).step(0.01).name("elevation");

cubeTweaks.add(mesh, "visible");
cubeTweaks.add(material, "wireframe");
// cubeTweaks.addColor(material, "color").onChange((value) => {
cubeTweaks.addColor(debugObj, "color").onChange(() => {
    material.color.set(debugObj.color);
});

debugObj.spin = () => {
    gsap.to(mesh.rotation, { duration: 1, y: mesh.rotation.y + Math.PI * 2 });
};

cubeTweaks.add(debugObj, "spin");

debugObj.subdivision = 2;

cubeTweaks
    .add(debugObj, "subdivision")
    .min(1)
    .max(20)
    .step(1)
    .onFinishChange(() => {
        mesh.geometry = new THREE.BoxGeometry(
            1,
            1,
            1,
            debugObj.subdivision,
            debugObj.subdivision,
            debugObj.subdivision,
        );
    });

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
camera.position.z = 2;
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