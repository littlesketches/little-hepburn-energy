import { CameraHelper }  from 'https://unpkg.com/three@0.127.0/build/three.module.js';

import { loadBirds }     from './components/birds/birds.js';
import { loadLandscape } from './components/landscape/landscape.js';
import { createSceneAnimations } from './components/animations.js';
import { createSky }     from './components/sky.js';
import { addFog }     from './components/fog.js';
import { createCamera }  from './components/camera.js';
import { createLights }  from './components/lights.js';
import { createScene }   from './components/scene.js';

import { createCameraHelper }    from './systems/cameraHelper.js';
import { createControls }        from './systems/controls.js';
import { createDatGUI }          from './systems/debug.js';
import { createRenderer }        from './systems/renderer.js';
import { Resizer }               from './systems/Resizer.js';
import { Loop }                  from './systems/Loop.js';

let scene;
let camera;
let controls;
let renderer;
let loop;

let cameraHelper, datGUI;


class World {
  constructor(container) {
    camera = createCamera();
    renderer = createRenderer();
    scene = createScene();
    loop = new Loop(camera, scene, renderer);
    container.append(renderer.domElement);
    controls = createControls(camera, renderer.domElement);

    const { ambientLight, directionalLight } = createLights(datGUI);
    loop.updatables.push(controls);
    scene.add(ambientLight, directionalLight);

    // Helpers
    cameraHelper = createCameraHelper(directionalLight.shadow.camera);
    datGUI = createDatGUI()

    const resizer = new Resizer(container, camera, renderer);
  }

  async init() {
    // Camera
    controls.target.set(settings.camera.target.x, settings.camera.target.y, settings.camera.target.z);                          // Set the orbit controls target
    // Scene elements
    const sky = createSky(renderer, scene, camera, datGUI);
    const fog = addFog(scene, datGUI)    
    const landscape = await loadLandscape();
    const flock = await loadBirds();
    const { animGaleBlades, animGustoBlades, animFlock} = await createSceneAnimations(datGUI);
    scene.add( sky, landscape, flock );

    // Animation (updatables)
    loop.updatables.push( animFlock, animGaleBlades, animGustoBlades );
    for (const bird of flock.children) { loop.updatables.push(bird) }  
  };

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
