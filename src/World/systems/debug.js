import { GUI } from 'https://unpkg.com/three@0.127.0/examples/jsm/libs/dat.gui.module.js';

function createDatGUI() {

  const gui = new GUI({name: 'Little Hepburn Energy'});

  const lightFolder = gui.addFolder('Lighting controls')
  const directionalLightFolder = lightFolder.addFolder('Directional light (sun)')
  directionalLightFolder.add(settings.elements.lights.directionalLight, 'intensity', 0, 50, 0.05).name('Intensity')
  directionalLightFolder.addColor(settings.lights.directionalLight, 'color').name('Colour')
    .onChange(() => settings.elements.lights.directionalLight.color.set(settings.lights.directionalLight.color) )

  const hemiLightFolder = lightFolder.addFolder('Hemisphere light')
  hemiLightFolder.add(settings.elements.lights.ambientLight, 'intensity', 0, 20, 0.05).name('Intensity')
  hemiLightFolder.addColor(settings.lights.ambientLight, 'sky').name('Sky colour')
    .onChange(() => settings.elements.lights.ambientLight.color.set(settings.lights.ambientLight.sky) )
  hemiLightFolder.addColor(settings.lights.ambientLight, 'ground').name('Ground colour')
    .onChange(() => settings.elements.lights.ambientLight.groundColor.set(settings.lights.ambientLight.ground) )

  return gui;
}

export { createDatGUI };
