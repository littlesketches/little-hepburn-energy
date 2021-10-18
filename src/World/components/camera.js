import { PerspectiveCamera } from 'https://unpkg.com/three@0.127.0/build/three.module.js';

function createCamera() {
  const camera = new PerspectiveCamera(35, 1, 0.1, 2000);

  camera.position.set(settings.camera.pos.x, settings.camera.pos.y, settings.camera.pos.z);

  return camera;
}

export { createCamera };
