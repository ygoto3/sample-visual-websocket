import {
  Mesh,
  CubeGeometry,
  MeshLambertMaterial,
  Vector3
} from "three";
import {
  createRenderer,
  createCamera,
  createScene,
  createLight,
  createText
} from "./utils/three";
import { createWebSocket } from "./utils/websocket";

const styles = require("./index.css");

const canvas = document.getElementById("canvas-frame");
canvas.className = styles.canvas;

const renderer = createRenderer(canvas);
const camera = createCamera(
  45,
  canvas.clientWidth / canvas.clientHeight,
  new Vector3(100, 20, 150),
  new Vector3(0, 0, 1)
);
const scene = createScene();

const light = createLight( new Vector3(100, 100, 200) );
scene.add(light);

let textMesh: THREE.Mesh;

const ws = createWebSocket((e: MessageEvent) => {
  if (textMesh) {
    scene.remove(textMesh);
    textMesh.geometry.dispose();
    textMesh.material.dispose();
  }

  textMesh = createText(e.data);
  scene.add(textMesh);
  textMesh.position.set(0, 0, 0);
  renderer.render(scene, camera);
});
const inputText = document.getElementById("inputText") as HTMLInputElement;
const sendButton = document.getElementById("sendButton");
sendButton.addEventListener("click", () => {
  if (!inputText.value) return;
  ws.send(inputText.value);
  inputText.value = "";
}, false);

renderer.clear();
