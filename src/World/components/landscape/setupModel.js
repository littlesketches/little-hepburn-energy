import { Group, Color } from 'https://unpkg.com/three@0.127.0/build/three.module.js';

function setupModel(data) {
  const model = new Group()
    model.name = 'Landscape group'

  const children = [...data.scene.children] 

  /// CONFIGURE AND ADD ALL OBJECTS 
  // a. Set up shadows by object and objects that are in groups
  for (const child of children){
    if(child.type === 'Mesh'){
      child.castShadow = true

      if(child.name === 'Grass') {
        child.receiveShadow = true
      }
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

    // c. Add each object to the model
    model.add(child) 
  }



  return model;
}

export { setupModel };
