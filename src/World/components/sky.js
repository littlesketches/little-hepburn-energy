import { Sky } from 'https://unpkg.com/three@0.127.0/examples/jsm/objects/Sky.js';
import { Vector3, MathUtils } from 'https://unpkg.com/three@0.127.0/build/three.module.js';

let sky, sun;

function createSky(renderer, scene, camera, gui) {

    // Add Sky
    sky = new Sky();
    sky.scale.setScalar( 450000 );
    sun = new Vector3();

    /// GUI Default settings  
    // settings.exposure = renderer.toneMappingExposure 
    function guiChanged() {
      const uniforms = sky.material.uniforms;
      uniforms[ 'turbidity' ].value = settings.sky.turbidity;
      uniforms[ 'rayleigh' ].value = settings.sky.rayleigh;
      uniforms[ 'mieCoefficient' ].value = settings.sky.mieCoefficient;
      uniforms[ 'mieDirectionalG' ].value = settings.sky.mieDirectionalG;

      const phi = MathUtils.degToRad( 90 - settings.sky.elevation );
      const theta = MathUtils.degToRad( settings.sky.azimuth );

      sun.setFromSphericalCoords( 1, phi, theta );
      uniforms[ 'sunPosition' ].value.copy( sun );

      renderer.toneMappingExposure = settings.sky.exposure;
      renderer.render( scene, camera );
    }


    const skyFolder = gui.addFolder('Sky controls' );
    skyFolder.add( settings.sky, 'turbidity', 0.0, 20.0, 0.1 ).onChange( guiChanged );
    skyFolder.add( settings.sky, 'rayleigh', 0.0, 4, 0.001 ).onChange( guiChanged );
    skyFolder.add( settings.sky, 'mieCoefficient', 0.0, 0.1, 0.001 ).onChange( guiChanged );
    skyFolder.add( settings.sky, 'mieDirectionalG', 0.0, 1, 0.001 ).onChange( guiChanged );
    skyFolder.add( settings.sky, 'elevation', 0, 90, 0.1 ).onChange( guiChanged );
    skyFolder.add( settings.sky, 'azimuth', - 180, 180, 0.1 ).onChange( guiChanged );
    skyFolder.add( settings.sky, 'exposure', 0, 1, 0.0001 ).onChange( guiChanged );

    guiChanged();

    return sky
  }


export { createSky };
