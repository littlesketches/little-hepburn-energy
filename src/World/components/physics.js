import { Group, Mesh, SphereGeometry, PlaneGeometry, BoxGeometry, SphereBufferGeometry, CylinderGeometry, BufferGeometry,  MeshBasicMaterial, MeshStandardMaterial, Vector3 } from 'https://unpkg.com/three@0.127.0/build/three.module.js';
import { bodyToMesh } from './threeCannonUtils.js'
import * as CANNON from  'https://cdn.jsdelivr.net/npm/cannon-es@0.18.0/dist/cannon-es.js'


function addPhysics(world, scene) {
  const physicsUpdatables = {}
  // Physics materials
  const defaultMaterial = new CANNON.Material('default')
  const defaultContactMaterial = new CANNON.ContactMaterial(
    defaultMaterial,
    defaultMaterial,
    {
      friction:       0.1,
      restitution:    0.9
    }
  )
  world.addContactMaterial(defaultContactMaterial)
  world.defaultContactMaterial = defaultContactMaterial

  // Test sphere
  const radius = 10
  const defaultMeshMaterial = new MeshStandardMaterial({color: '#fff'})
  const ballMaterial = new MeshStandardMaterial({color: '#ee9900'})
  const sphere  = new Mesh(
    new SphereBufferGeometry(radius, 32, 32),
    ballMaterial,
  )
  sphere.position.y = 100
  // scene.add(sphere)

  const sphereBody = new CANNON.Body({
    name:       'Ball',
    mass:       1,
    position:   new CANNON.Vec3(0, sphere.position.y, 0),
    shape:      new CANNON.Sphere(radius),
  })

  // world.addBody(sphereBody)

  // physicsUpdatables.sphere = {
  //   mesh:   sphere,
  //   body:   sphereBody
  // }

  // Heightfield for ground
      const sizeX = 15
      const sizeZ = 15
      const width = 500 + sizeX * 2 

      const heightMatrix = [  // Manually constructed height matrix
        [ // Westside: south to north
            -21.8, -21.7, -22.7, -21.5, -21.1,
            -22.3, -19.8, -20.5, -18.7, -16.8, 
            -16.3, -17.2, -14.57, -17.0, -19.3               
        ],
        [
            -20.2, -19.0, -18.6, -18.5, -16.3,
            -18.5, -16.8, -16.5, -16.2, -18.5, 
            -18.8, -19.7, -18.8, -19.2, -16.9               
        ],
        [
            -12.9, -11.1, -9.7, -8.4,  -10.1,               
            -12.4, -13.6, -12.9, -10.5, -12.1,              
            -18.1, -18.8, -18.5, -16.5, -12.6               
        ],
        [
            -10.6, -10.0, -9.2,  -7.6, -6.1,               
            -7.2, -8.8, -9.5, -10.6, -11.0,              
            -13.7, -18.5, -20.8, -15.6, -12.7               
        ],
        [
            -10.6, -10.2, -8.9 -6.6, -4.0,               
            -2.6, -1.6, -2.8, -9.00, -10.4,              
            -11.7, -16.0, -18.7, -13.8, -13.3               
        ],
        [  
            -9.7, -9.2, -7.7,  -4.6,  -1.7,               
            -0.2,  0.5,  1.6,  -0.5,  -1.9,              
            -6.1, -10.9, -13.4, -12.3,  -13.4              
        ],
        [
            -8.2,  -7.9,  -6.4,  -2.9,  -0.3,               
            1.1,    2.5,   6.5,  8.2,    9.2,              
            1.0,  -5.4,   -9.4, -12.1, -12.6               
        ],
        [ 
            -6.8,  -6.5,  -4.4,  -0.7,  0.7,               
            -4.4,   6.0,   7.2,   8.1,  9.0,              
            0.9,   -6.6,  -12.1, -13.1, -12.1              
        ],
        [ 
            -5.8,  -5.8,  -3.1,   1.7,  3.9,
            4.3,    7.4,    7.7,  8.4,  5.7,  
            -5.5,  -13.3, -17.4, -16.7, -12.5              
        ],
        [
            -5.2,  -5.1,  -4.1,  -0.7,  0.7,
            3.8,  6.9,    7.4,   7.0,  -3.1, 
            -9.9, -17.3, -21.6, -20.6, -14.9               
        ],
        [
            -4.8,  -4.5,  -4.1,  -3.4,  -1.5,               
            -2.6,  -0.5,   1.4,   0.6,  -6.6,              
            -9.9, -17.3, -22.6, -21.3, -17.7            
        ],
        [
            -6.0,  -5.6,  -4.5,  -3.8,  -3.9,               
            -4.8,  -4.4,  -3.0,  -4.9,  -7.0,              
            -16.7, -22.5, -22.0, -18.9, -16.6               
        ],
        [
            -6.7,  -6.7,  -6.0,  -4.6,  -5.3,               
            -6.7,  -6.5,  -5.0,  -6.3,  -10.4,              
            -15.2, -18.3, -16.1, -13.2, -13.4              
        ],
        [
            -4.4,  -5.4,  -6.6,  -5.3,  -4.8,               
            -6.1,  -6.4,  -5.7,  -6.4,  -8.4,              
            -11.2, -12.4, -12.2, -11.8, -11.5               
        ],
        [
            -2.7,  -4.4,  -6.5,  -5.5, -4.0,               
            -4.5,  -5.1,  -5.2,  -5.8,  -7.0,              
            -8.2,  -9.3,  -10.5, -11.2, -11.7               
        ]
      ]

      const heightfieldShape = new CANNON.Heightfield(heightMatrix, {
        elementSize: width / sizeX,
      })
      const heightfieldBody = new CANNON.Body({ 
        mass: 0,
        material: defaultContactMaterial
      })

      heightfieldBody.addShape(heightfieldShape)
      heightfieldBody.position.set(
        -(sizeX * heightfieldShape.elementSize) / 2 + ( width / sizeX /2),
        0,
        (sizeZ * heightfieldShape.elementSize) / 2 - ( width / sizeZ /2)
      )
      heightfieldBody.quaternion.setFromEuler(-Math.PI / 2, 0, 0)

      world.addBody(heightfieldBody)

      // Add heightfield mesh for scene testing
      // const mesh = bodyToMesh(heightfieldBody, defaultMeshMaterial)
      // mesh.position.y = 0
      // scene.add(mesh)



  const floorBody = new CANNON.Body({
    name:       'Plane',
    mass:       0,
    shape:      new CANNON.Plane(),
    position:   new CANNON.Vec3(0, 0, 0),
  })  
  floorBody.quaternion.setFromAxisAngle(
      new CANNON.Vec3(-1, 0, 0),
      Math.PI * 0.5
  )
   world.addBody(floorBody)


  return physicsUpdatables
}


export { addPhysics };


