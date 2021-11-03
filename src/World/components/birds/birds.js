import { GLTFLoader } from 'https://unpkg.com/three@0.127.0/examples/jsm/loaders/GLTFLoader.js';
import { Group, Object3D } from 'https://unpkg.com/three@0.127.0/build/three.module.js';
import { setupModel } from './setupModel.js';

async function loadBirds() {
  const loader = new GLTFLoader();

  const [parrotData, flamingoData, storkData] = await Promise.all([
    loader.loadAsync('./assets/models/Parrot.glb'),
    loader.loadAsync('./assets/models/Flamingo.glb'),
    loader.loadAsync('./assets/models/Stork.glb'),
  ])

  // Setup each bird with flight animation clip
  const parrot1 = setupModel(parrotData);
  const parrot2 = setupModel(parrotData);
  const flamingo1 = setupModel(flamingoData); 
  // const flamingo2 = setupModel(flamingoData); 
  const stork1 = setupModel(storkData);
  // const stork2 = setupModel(storkData);

  parrot1.position.set(0, 0, 0);
  flamingo1.position.set(-5, 0, -10);
  stork1.position.set(5, 0, -10);

  parrot2.position.set(-10, 0, -15);
  // flamingo2.position.set(0, 0, -15);
  // stork2.position.set(10, 0, -15);

  // Add all birds to a flock group
  settings.elements.flock = new Group()
  settings.elements.flock.add(parrot1)
  settings.elements.flock.add(parrot2)
  settings.elements.flock.add(flamingo1)
  // settings.elements.flock.add(flamingo2)
  settings.elements.flock.add(stork1)
  // settings.elements.flock.add(stork2)

  return settings.elements.flock
      
}

export { loadBirds };
