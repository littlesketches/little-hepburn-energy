import { DirectionalLight, HemisphereLight } from 'https://unpkg.com/three@0.127.0/build/three.module.js';

function createLights() {
  const ambientLight = new HemisphereLight(
    'white',
    'green',
    0.5,
  );

  const mainLight = new DirectionalLight(0xffffff, 2);
  mainLight.position.set(100, 300, 300);
  mainLight.castShadow = true

  // Set up shadow properties for the light
  mainLight.shadow.mapSize.width = 2048; 
  mainLight.shadow.mapSize.height = 2048; 
  mainLight.shadow.camera.near = 0.5; 
  mainLight.shadow.camera.far = 620; 
  mainLight.shadow.camera.left = -320; 
  mainLight.shadow.camera.right = 300; 
  mainLight.shadow.camera.top = 250; 
  mainLight.shadow.camera.bottom = -200; 
  mainLight.shadow.bias = -0.0005; 


  return { ambientLight, mainLight };
}

export { createLights };
