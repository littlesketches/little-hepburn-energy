import { Group, Color, MeshBasicMaterial, MeshStandardMaterial } from 'https://unpkg.com/three@0.127.0/build/three.module.js';

function setupModel(data) {
  const model = new Group()
  model.name = 'Model group'
  const children = [...data.scene.children]

  /// CONFIGURE AND ADD ALL OBJECTS 
  // a. Set up shadows by object (meshes, meshes in paths / applied modifiers in Object3Ds) and objects that are in groups
  for (const child of children){
    if(child.type === 'Mesh'){
      child.castShadow = true
      if(child.name === 'Grass' || child.name === 'Carpark-01' || child.name === 'Carpark-02' ) {
        child.castShadow = false
        child.receiveShadow = true
      }
    }

    if(child.name === 'Track-path'|| child.name === 'RoadPath-01' ||child.name === 'RoadPath-02' ){
      child.children[0].receiveShadow = true
    }

    if(child.type === 'Group' ){
      const group = new Group() 
      for (const mesh of child.children){
        mesh.castShadow = true
      }
    }

    // b. Store meshs to be animated programatically 
    const bladeNames = {
      bladesAndHub001:  'gale',
      motor001:         'gale',
      bladesAndHub002:  'gusto',
      motor002:         'gusto'
    }

    if(Object.keys(bladeNames).indexOf(child.name) > -1){
      if(child.name.slice(0, 6) === 'blades'){    
        if(typeof settings.elements.turbine[bladeNames[child.name]] === 'undefined'){
          settings.elements.turbine[bladeNames[child.name]] = {} 
        }
        settings.elements.turbine[bladeNames[child.name]].blades = child
      }

      if(child.name.slice(0, 5) === 'motor'){
        if(typeof settings.elements.turbine[bladeNames[child.name]] === 'undefined'){
          settings.elements.turbine[bladeNames[child.name]] = {} 
        }
        settings.elements.turbine[bladeNames[child.name]].motor = child
      }
    }

    // c. Store solar array items
    if(child.name.slice(0, 11) === 'solar-array') settings.elements.solar.arrays.push(child)
    if(child.name === 'solar-fence')  settings.elements.solar.fence = child
    if(child.name === 'power-station-solar')  settings.elements.solar.station = child

    // d. Store storage array items
    if(child.name === 'battery-storage')  settings.elements.storage.battery = child
    if(child.name === 'power-station-storage')  settings.elements.storage.station = child
    // e. Add each object to the model
    model.add(child) 
  }

  return model;
}

export { setupModel };
