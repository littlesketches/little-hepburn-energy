import { AnimationMixer } from 'https://unpkg.com/three@0.127.0/build/three.module.js';

function setupModel(data) {
  const model = data.scene.children[0];

  // Play animation clip 
  const clip = data.animations[0];
  const mixer = new AnimationMixer(model);
  const action = mixer.clipAction(clip);
  action.play();
  model.tick = (elapsedTime, delta) => mixer.update(delta);
  return model;
}

export { setupModel };
