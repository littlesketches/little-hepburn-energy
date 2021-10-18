import { DirectionalLight, HemisphereLight } from 'https://unpkg.com/three@0.127.0/build/three.module.js';

function createLights() {
  settings.elements.lights.ambientLight = new HemisphereLight(
    'white',
    'green',
    0.5,
  );

  settings.elements.lights.directionalLight = new DirectionalLight(0xffffff, 2);
  settings.elements.lights.directionalLight.position.set(0, 300, 300);
  settings.elements.lights.directionalLight.castShadow = true

  // Set up shadow properties for the light
  settings.elements.lights.directionalLight.shadow.mapSize.height  = 2048; 
  settings.elements.lights.directionalLight.shadow.camera.near     = 0.5; 
  settings.elements.lights.directionalLight.shadow.camera.far      = 620; 
  settings.elements.lights.directionalLight.shadow.camera.left     = -320; 
  settings.elements.lights.directionalLight.shadow.camera.right    = 300; 
  settings.elements.lights.directionalLight.shadow.camera.top      = 250; 
  settings.elements.lights.directionalLight.shadow.camera.bottom   = -200; 
  settings.elements.lights.directionalLight.shadow.bias            = -0.0005; 

  return { 
    ambientLight:     settings.elements.lights.ambientLight, 
    directionalLight: settings.elements.lights.directionalLight 
  };
}

export { createLights };
