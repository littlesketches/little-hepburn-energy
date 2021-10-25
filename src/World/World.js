import { CameraHelper }         from 'https://unpkg.com/three@0.127.0/build/three.module.js';

import { loadBirds }            from './components/birds/birds.js';
import { loadLandscape }        from './components/landscape/landscape.js';
import { createSceneAnimations} from './components/animations.js';
import { createSky }            from './components/sky.js';
import { addFog }               from './components/fog.js';
import { addPhysics }           from './components/physics.js';
import { createCamera }         from './components/camera.js';
import { createLights }         from './components/lights.js';
import { createScene }          from './components/scene.js';
import { createText }           from './components/text.js';

import { createCameraHelper }    from './systems/cameraHelper.js';
import { createControls }        from './systems/controls.js';
import { createDatGUI }          from './systems/debug.js';
import { createRenderer }        from './systems/renderer.js';
import { createPhysicsWorld }    from './components/physicsWorld.js';
import { Resizer }               from './systems/Resizer.js';
import { Loop }                  from './systems/Loop.js';


let cameraHelper, datGUI;

class World {
  constructor(container) {
    world.camera = createCamera();
    world.renderer = createRenderer();
    world.scene = createScene();
    world.physicsWorld =  createPhysicsWorld(world.scene);
    world.loop = new Loop( world.camera,  world.scene,  world.renderer,  world.physicsWorld);
    world.controls = createControls( world.camera,  world.renderer.domElement);

    container.append( world.renderer.domElement);

    const { ambientLight, directionalLight } = createLights();
    world.loop.updatables.push(world.controls);
    world.scene.add(ambientLight, directionalLight);

    // Helpers
    cameraHelper = createCameraHelper(directionalLight.shadow.camera);
    const resizer = new Resizer(container,  world.camera,  world.renderer);
  }

  async init() {
    console.log('Init scene')
    datGUI = createDatGUI()
    // Camera
    world.controls.target.set(settings.camera.target.x, settings.camera.target.y, settings.camera.target.z);                          // Set the orbit controls target

    // Add scene elements
    addFog(world.scene, datGUI)   
    const sky = createSky(world.renderer, world.scene, world.camera, datGUI);
    const landscape = await loadLandscape();
    const flock = await loadBirds();
    const text = await createText(world.scene);
console.log(text)
    world.scene.add( sky, landscape, flock );

    // Add Physics simulation
    world.loop.physicsUpdatables = await addPhysics(world.physicsWorld,  world.scene)
    
    // Add objects to animation loop (updatables)
    const { animGaleBlades, animGustoBlades, animFlock} = await createSceneAnimations(datGUI);
    world.loop.updatables.push( animFlock, animGaleBlades, animGustoBlades );
    for (const bird of flock.children) { world.loop.updatables.push(bird) }  
  };

  render() {
    renderer.render(world.scene, world.camera);
  }

  start() {
    world.loop.start();
  }

  stop() {
    world.loop.stop();
  }

}

export { World };
