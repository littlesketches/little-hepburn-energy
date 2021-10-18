import { Clock } from 'https://unpkg.com/three@0.127.0/build/three.module.js';

const clock = new Clock();
let time = Date.now()

class Loop {
  constructor(camera, scene, renderer) {
    this.camera = camera;
    this.scene = scene;
    this.renderer = renderer;
    this.updatables = [];
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
    const elapsedTime = clock.getElapsedTime(),
      currentTime = Date.now(), 
      delta = currentTime - time
    time = currentTime

    for (const object of this.updatables) {
      object.tick(elapsedTime, delta/1000);
    }

    
  }
}

export { Loop };
