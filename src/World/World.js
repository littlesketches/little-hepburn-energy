import { CameraHelper }  from 'https://unpkg.com/three@0.127.0/build/three.module.js';

import { loadBirds }     from './components/birds/birds.js';
import { loadLandscape } from './components/landscape/landscape.js';
import { createSceneAnimations } from './components/animations.js';
import { createSky }     from './components/sky.js';
import { createCamera }  from './components/camera.js';
import { createLights }  from './components/lights.js';
import { createScene }   from './components/scene.js';

import { createCameraHelper }    from './systems/cameraHelper.js';
import { createControls }        from './systems/controls.js';
import { createDatGUI }          from './systems/datGUI.js';
import { createRenderer }        from './systems/renderer.js';
import { Resizer }               from './systems/Resizer.js';
import { Loop }                  from './systems/Loop.js';

// let scene;
let camera;
let controls;
let renderer;
let loop;
let light

let cameraHelper, datGUI;


class World {
  constructor(container) {
    camera = createCamera();
    renderer = createRenderer();
    scene = createScene();
    loop = new Loop(camera, scene, renderer);
    container.append(renderer.domElement);
    controls = createControls(camera, renderer.domElement);

    const { ambientLight, mainLight } = createLights();
    light = mainLight

    loop.updatables.push(controls);
    scene.add(ambientLight, mainLight);

    // Helpers
    cameraHelper = createCameraHelper(light.shadow.camera);
    datGUI = createDatGUI()

    const resizer = new Resizer(container, camera, renderer);
  }


  async init() {
    const sky = createSky(renderer, scene, camera, datGUI);
    const { landscape } = await loadLandscape();
    const { parrot, flamingo, stork } = await loadBirds();
    const { galeBlades, gustoBlades} = await createSceneAnimations();


    controls.target.set(0, 20, 0);                          // Set the orbit controls target
    loop.updatables.push(parrot, flamingo, stork, galeBlades, gustoBlades);
    scene.add(sky, landscape, parrot, flamingo, stork);


  }

  render() {
    renderer.render(scene, camera);
  }

  start() {
    loop.start();
  }

  stop() {
    loop.stop();
  }

}

export { World };
