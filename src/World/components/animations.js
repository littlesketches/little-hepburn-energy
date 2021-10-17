import { Math } from 'https://unpkg.com/three@0.127.0/build/three.module.js';


async function createSceneAnimations() {

  /// CONFIGURE PROGRAMMABLE ANIMATIONS (wind turbine)
  settings.wind.turbine.gale.blades.tick = (delta) => settings.wind.turbine.gale.blades.rotation.z += Math.degToRad(1/6) * settings.wind.turbine.gale.rpm
  settings.wind.turbine.gusto.blades.tick = (delta) => settings.wind.turbine.gusto.blades.rotation.z += Math.degToRad(1/6) * settings.wind.turbine.gusto.rpm
// settings.wind.turbine.gale.blades.rotation.y =  Math.degToRad(-90)
  const galeBlades = settings.wind.turbine.gale.blades
  const gustoBlades = settings.wind.turbine.gusto.blades

  return {
    galeBlades,
    gustoBlades
  };
}

export { createSceneAnimations };
