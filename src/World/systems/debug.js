import { GUI } from 'https://unpkg.com/three@0.127.0/examples/jsm/libs/dat.gui.module.js';
import Stats from 'https://unpkg.com/three@0.127.0/examples/jsm/libs/stats.module'

function createDatGUI() {

  // Dat GUI and main folders
  const gui = new GUI({name: 'Little Hepburn Energy'});
  const perfFolder = gui.addFolder("Scene");
  // const cameraFolder =  gui.addFolder("Camera controls")
  const envFolder =  gui.addFolder("Environment controls")


  // 1. Add Stats.js (integrated into Dat GUI)
  settings.gui.stats = Stats()
  document.body.appendChild(settings.gui.stats.dom)

  const perfLi = document.createElement("li"),
    perfContainer = document.createElement("div"),
    perfPropName    = document.createElement("span"),
    perfStatsContainer = document.createElement("span");

  settings.gui.stats.domElement.style.position = "static";
  perfPropName.classList.add('title')
  perfPropName.innerHTML = "Perf. monitor"
  perfLi.appendChild(perfContainer)
  perfContainer.appendChild(perfPropName)
  perfContainer.appendChild(perfStatsContainer)
  perfLi.classList.add("gui-stats")
  perfStatsContainer.appendChild( settings.gui.stats.domElement);
  perfFolder.__ul.appendChild(perfLi);

  // 2. Add Lighting controls (with subfolders for directional and hemisphere lights)
  const lightFolder = envFolder.addFolder('Lighting controls'),
    directionalLightFolder = lightFolder.addFolder('Directional light (sun)'),
    hemiLightFolder = lightFolder.addFolder('Ambient (hemisphere) light')

  directionalLightFolder.add(settings.elements.lights.directionalLight, 'intensity', 0, 50, 0.05).name('Intensity')
    .onChange(() => settings.lights.directionalLight.intensity = settings.elements.lights.directionalLight.intensity)
  directionalLightFolder.addColor(settings.lights.directionalLight, 'color').name('Colour')
    .onChange(() => settings.elements.lights.directionalLight.color.set(settings.lights.directionalLight.color) )

  hemiLightFolder.add(settings.elements.lights.ambientLight, 'intensity', 0, 20, 0.05).name('Intensity')
    .onChange(() => settings.lights.ambientLight.intensity = settings.elements.lights.ambientLight.intensity)
  hemiLightFolder.addColor(settings.lights.ambientLight, 'sky').name('Sky colour')
    .onChange(() => settings.elements.lights.ambientLight.color.set(settings.lights.ambientLight.sky) )
  hemiLightFolder.addColor(settings.lights.ambientLight, 'ground').name('Ground colour')
    .onChange(() => settings.elements.lights.ambientLight.groundColor.set(settings.lights.ambientLight.ground) )


  return gui;
}

export { createDatGUI };
