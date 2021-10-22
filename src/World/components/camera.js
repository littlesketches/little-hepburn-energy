import { PerspectiveCamera } from 'https://unpkg.com/three@0.127.0/build/three.module.js';

function createCamera() {
  settings.elements.camera.perspective = new PerspectiveCamera(
      settings.camera.fov, 
      1, 
      settings.camera.near, 
      settings.camera.far
    );

  settings.elements.camera.perspective.position.set(settings.camera.pos.x, settings.camera.pos.y, settings.camera.pos.z);

  return settings.elements.camera.perspective;
}

export { createCamera };
