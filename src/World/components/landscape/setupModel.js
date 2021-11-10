import { Group, Color, MeshBasicMaterial, MeshStandardMaterial, Vector3, Ray, Raycaster } from 'https://unpkg.com/three@0.127.0/build/three.module.js';

function setupModel(data) {
  const model = new Group()
  model.name = 'Model group'
  const children = [...data.scene.children]

  /// CONFIGURE AND ADD ALL OBJECTS 
  // a. Set up shadows by object (meshes, meshes in paths / applied modifiers in Object3Ds) and objects that are in groups
  for (const child of children){
    if(child.type === 'Mesh'){
      child.castShadow = true
      if(child.name === 'Grass' || child.name === 'Carpark-01' || child.name === 'Carpark-02' || child.name === 'Pond-water' ) {
        child.castShadow = false
        child.receiveShadow = true
      }
      if(child.name === 'Grass') {
        settings.elements.grass = child
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

    // e. Add each object to the model UNLESS from an excluded list
    const northRoadObjs = ['RoadPath-02', 'Powerline-02-a', 'Powerline-02-b', 'electrical-poles-north']
    if(settings.options.showNorthRoad === false && northRoadObjs.indexOf(child.name) === -1){
      model.add(child) 
    } else if(settings.options.showNorthRoad){
      model.add(child) 
    } 

  }

  // f. Create the heighfield map from the grass object
  heightfield.matrix = []
  const rayOrigin = new Vector3()
  rayOrigin.y = 200
  const ray = new Ray()
  ray.direction = new Vector3(0, -1, 0).normalize()
  const raycaster = new Raycaster()
  const divisions = 15

  for(let i = 0; i < divisions; i++){
    heightfield.matrix.push([])
    for(let j = 0; j < divisions; j++){
      rayOrigin.x = i * heightfield.sceneWidth / (divisions + 1) - heightfield.sceneWidth * 0.5  + (i === 0 ? 1: i === (divisions - 1) ? -1.25 : 0)
      rayOrigin.z = (divisions - j) * heightfield.sceneWidth / (divisions + 1)  - heightfield.sceneWidth * 0.5 + (j === 0 ? 1: j ===  (divisions - 1) ? -1.25 : 0)
      ray.origin = rayOrigin
      raycaster.ray = ray
      const intersects = raycaster.intersectObject( settings.elements.grass, false)
      heightfield.matrix [i][j] = intersects.length > 0 ? rayOrigin.y - intersects[0].distance + 2 : 0
    }
  }


  return model;
}

export { setupModel };
