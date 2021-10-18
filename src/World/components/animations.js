import { Math as MathUtils } from 'https://unpkg.com/three@0.127.0/build/three.module.js';

async function createSceneAnimations(gui) {

  ///  WIND TURBINE
    settings.wind.turbine.gale.blades.tick = (elapsedTime, delta) => settings.wind.turbine.gale.blades.rotation.z += (delta * Math.PI * 2/ 60)  * settings.wind.turbine.gale.rpm
    settings.wind.turbine.gusto.blades.tick = (elapsedTime, delta) => settings.wind.turbine.gusto.blades.rotation.z += (delta * Math.PI * 2/ 60) * settings.wind.turbine.gusto.rpm

    function windChanged() {
      settings.wind.turbine.gale.rpm
      settings.wind.turbine.gusto.rpm
    }

    const windFolder = gui.addFolder('Wind controls' );
    windFolder.add( settings.wind.turbine.gale, 'rpm', 0, 25.0, 0.1 ).onChange( windChanged )
        .name("Gale RPM")
    windFolder.add( settings.wind.turbine.gusto, 'rpm', 0, 25.0, 0.1 ).onChange( windChanged )
        .name("Gusto RPM")

  // FLOCK OF BIRDS
  settings.elements.flock.tick = (elapsedTime) =>  {
    const degrees = (elapsedTime * Math.PI * 2 ) % 360, 
      radius = 200, elevationDelta = 10
    settings.elements.flock.position.x = Math.sin(MathUtils.degToRad(degrees)) * radius
    settings.elements.flock.position.y = 50 + Math.sin(MathUtils.degToRad(degrees)) * elevationDelta
    settings.elements.flock.position.z = Math.cos(MathUtils.degToRad(degrees)) * radius
    settings.elements.flock.rotation. y = MathUtils.degToRad(degrees + 90)
    return settings.elements.flock.position
  }

  // Reference to animation objects
  return {
    animGaleBlades: settings.wind.turbine.gale.blades,
    animGustoBlades: settings.wind.turbine.gusto.blades,
    animFlock: settings.elements.flock
  };
}

export { createSceneAnimations };
