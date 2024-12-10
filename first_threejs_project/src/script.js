import * as THREE from "three";

const canvas = document.querySelector("canvas.webgl");

// * Scene
const scene = new THREE.Scene();

/**
 * Objects
 */

const group = new THREE.Group();
group.position.y = 1;
group.scale.y = 2;
group.rotation.y = 1;

scene.add(group);

const cube1 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: 0xff0000 }),
);

const cube2 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: 0x00ff00 }),
);

cube2.position.x = -2;

const cube3 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: 0x0000ff }),
);

cube3.position.x = 2;

group.add(cube1, cube2, cube3);

// const geometry = new THREE.BoxGeometry(1, 1, 1);
// const material = new THREE.MeshBasicMaterial({
//     color: "red",
//     //   wireframe: true,
// });
// const mesh = new THREE.Mesh(geometry, material);
// scene.add(mesh);

// // mesh.position.x = 0.7;
// // mesh.position.y = -0.6;
// // mesh.position.z = 1;

// // ? This lets you change all positions at once
// mesh.position.set(0.7, -0.6, 1);

// // * SCALE
// // mesh.scale.x = 2;
// // mesh.scale.y = 0.5;
// // mesh.scale.z = 0.5;
// mesh.scale.set(2, 0.5, 0.5);

// // * ROTATION

// mesh.rotation.reorder("YXZ");
// mesh.rotation.x = Math.PI * 0.25;
// mesh.rotation.y = Math.PI * 0.25;

// AXES HELPER
const axesHelper = new THREE.AxesHelper();
scene.add(axesHelper);

// ? This will reduce the vector length to 1
// mesh.position.normalize();
// console.log(mesh.position.length());

//Sizes
const sizes = {
    width: 800,
    height: 600,
};

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 3;
// camera.position.set(1, 1, 3);
scene.add(camera);

// ? This will help you to look an object with the camera, we can use the mesh itself to focus it
// camera.lookAt(mesh.position);
// console.log(mesh.position.distanceTo(camera.position));

//Renderer
const renderer = new THREE.WebGLRenderer({ canvas });

renderer.setSize(sizes.width, sizes.height);

renderer.render(scene, camera);
