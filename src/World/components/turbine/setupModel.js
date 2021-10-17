import { Group } from 'https://unpkg.com/three@0.127.0/build/three.module.js';

function setupModel(data) {
  const model = new Group()
  const children = [...data.scene.children] 

  for (const child of children){
     model.add(child) 
  }
  return model;
}

export { setupModel };
