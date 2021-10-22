///////////////////////////////
/// Global state variables  ///
///////////////////////////////

const settings = {
    camera: {
        type:   'perspective',
        pos:    { x: 200 ,  y: 100,     z: -200   }, 
        target: { x: 0 ,    y: 20,      z: 0   }, 
        perspective: {  
            fov:        35,
            near:       0.1,
            far:        2000
        }
    },
    lights:{
        ambientLight: {
            sky:            '#FFFFFF',
            ground:         '#FFFFFF',  
            intensity:      0.5
        },
        directionalLight: {
            color:          '#FFFFFF',
            intensity:      2.0
        }
    },
    sky: {
        turbidity:          3,
        rayleigh:           0.2,
        mieCoefficient:     0.005,
        mieDirectionalG:    0.7,
        elevation:          5,
        azimuth:            305,
        exposure:           0.7
    },
    fog: {
        color:              '#FFFFFF',
        density:            0,
    },
    wind: {
        direction:          0,      // Degrees from North,
        speed:              25,     // Speed in m/s 25 > 17.1, 3.5 > 10
        turbine: {
            gale: {
                rpm:        17.1,
                blades:     null,
                motor:      null
            },
            gusto: {
                rpm:        8.5,
                blades:     null,
                motor:      null
            }
        }
    },
    elements: {
        camera: {
            perspective:        null
        },
        lights: {
            ambientLight:       null,
            directionalLight:   null
        },
        flock :     null,
        fog:        null

    },         
    gui: {
        stats:      null
    }

}

const state = {
    

}

let scene