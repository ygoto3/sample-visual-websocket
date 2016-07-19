import {
  WebGLRenderer,
  PerspectiveCamera,
  Scene,
  DirectionalLight,
  Vector3,
  MeshPhongMaterial,
  TextGeometry,
  Mesh,
  Font
} from "three";
import {
  assign
} from "lodash";

const font = require("../../node_modules/three/examples/fonts/helvetiker_bold.typeface.json");

export function createRenderer(elm: HTMLElement): THREE.WebGLRenderer {
  const renderer = new WebGLRenderer({ antialias: true });
  renderer.setSize(elm.clientWidth, elm.clientHeight);
  elm.appendChild(renderer.domElement);
  renderer.setClearColor(0xffffff, 1.0);
  return renderer;
}

export function createCamera(fov: number, aspect: number, position: THREE.Vector3, up: THREE.Vector3): THREE.PerspectiveCamera {
  const camera = new PerspectiveCamera(fov, aspect, 1, 10000);
  assign(camera.position, position);
  assign(camera.up, up);
  camera.lookAt( new Vector3(0, 0, 0) );
  return camera;
}

export function createScene(): THREE.Scene {
  return new Scene();
}

export function createLight(position: THREE.Vector3): THREE.DirectionalLight {
  const light = new DirectionalLight(0xffffff, 1.0);
  light.position.set(position.x, position.y, position.z);
  return light;
}

export function createText(text: string): THREE.Mesh {
  const geometry = new TextGeometry(text, {
    font: new Font(font),
    size:40, 
    height: 15,
    curveSegments: 3,
    bevelEnabled: false,
    bevelThickness: 2, 
    bevelSize: 2
  });
  const material = new MeshPhongMaterial({
    color: 0xff0000
  });
  return new Mesh(geometry, material);
}
