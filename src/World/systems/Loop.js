import { Clock } from 'https://unpkg.com/three@0.127.0/build/three.module.js';
import { World } from '../World.js';

const clock = new Clock();
let time = Date.now(), oldElapsedTime = 0

class Loop {
  constructor(camera, scene, renderer, physicsWorld) {
    this.camera = camera;
    this.scene = scene;
    this.renderer = renderer;
    this.physicsWorld = physicsWorld;
    this.updatables = [];
    this.physicsUpdatables = [];
  }

  start() {
    this.renderer.setAnimationLoop(() => {     
      this.tick();
      this.renderer.render(this.scene, this.camera);        // render a frame
    });
  }

  stop() {
    this.renderer.setAnimationLoop(null);
  }

  tick() {
    // Clock
    const elapsedTime = clock.getElapsedTime(),
      currentTime = Date.now(), 
      delta = currentTime - time, 
      deltaTime = elapsedTime - oldElapsedTime    // Previous frame delta for physics timer
    // Update time and oldElapsed time
    time = currentTime     
    oldElapsedTime = elapsedTime


    //  Update physics world objects
    this.physicsWorld.step( 1 / 60, deltaTime, 6 ) // 60fps and 3 frame catchup
    for (const obj of Object.values(this.physicsUpdatables) ){
      obj.mesh.position.copy(obj.body.position)  
    }
    // Update ThreeJS objects
    for (const object of this.updatables) {
      object.tick(elapsedTime, delta/1000);
    }


    settings.gui.stats.update()
  }
}

export { Loop };
