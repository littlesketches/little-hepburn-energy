import { FontLoader, TextBufferGeometry, MeshNormalMaterial, MeshBasicMaterial, Mesh } from 'https://unpkg.com/three@0.127.0/build/three.module.js';

async function createText() {
  const fontLoader = new FontLoader()
  return fontLoader.load(
    '../../../assets/fonts/helvetiker_regular.typeface.json',
    (font) => {
      console.log('Font loaded')
      const textGeometry  = new TextBufferGeometry(
        'HEPBURN ENERGY', {
            font,
            size:           30,
            height:         5,
            curveSegments:  24,
            bevelEnabled:   true,
            bevelThickness: 0.5,
            bevelSize:      0.5,
            bevelOffset:    0,
            bevelSegments:  10,
        } 
      )
textGeometry.center()
      const textMaterial = new MeshNormalMaterial()

      const text = new Mesh(textGeometry, textMaterial)
      text.centre = true  
      text.position.y = 5  
      text.position.z = -200  
      text.rotation.y = Math.PI * 1.0 
      world.scene.add(text)

      return text
    }
  )


}

export { createText };
