import { GLTFLoader } from 'https://unpkg.com/three@0.127.0/examples/jsm/loaders/GLTFLoader.js';

import { setupModel } from './setupModel.js';

async function loadTurbines() {
  const loader = new GLTFLoader();

  const [turbineData] = await Promise.all([
    loader.loadAsync('./assets/models/turbine.glb')
  ]);

  const turbine = setupModel(turbineData);
  turbine.position.set(0, 0, 0);



  return {
    turbine
  };
}

export { loadTurbines};
