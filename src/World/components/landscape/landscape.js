import { GLTFLoader } from 'https://unpkg.com/three@0.127.0/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'https://unpkg.com/three@0.127.0/examples/jsm/loaders/DRACOLoader.js';
import { setupModel } from './setupModel.js';

async function loadLandscape() {
  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath('https://unpkg.com/three@0.127.0/examples/js/libs/draco/')

  const gltfLoader = new GLTFLoader();
  gltfLoader.setDRACOLoader(dracoLoader)


  const [landscapeData] = await Promise.all([
    gltfLoader.loadAsync('./assets/models/little-hepburn-energy-draco.glb')
  ]);

  const landscape = setupModel(landscapeData);
  landscape.position.set(0, 0, 0);
  
  return {
    landscape
  };
}

export { loadLandscape};
