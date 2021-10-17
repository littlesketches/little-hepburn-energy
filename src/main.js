import { World } from './World/World.js';

let scene
async function main() {

  const container = document.querySelector('#scene-container');   // Get a reference to the container element
  const world = new World(container);      // create a new world

  await world.init();         // complete async tasks
  world.start();              // start the animation loop
}

main().catch((err) => {
  console.error(err);
});
