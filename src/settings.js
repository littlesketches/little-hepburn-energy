///////////////////////////////
/// GLOBAL VARIABLES  ///
///////////////////////////////

let world = {}
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
        color:              '#DDD',
        density:            0,
    },
    wind: {
        direction:          45,      // Degrees from North,
        speed:              12,     // Speed in m/s 25 > 17.1, 3.5 > 10
        turbine_performance: {
            windSpeed_min:      3.5,
            windSpeed_max:      25,
            bladeRPM_min:       10,   
            bladeRPM_max:       17.1   
        },
        turbine: {
            gale: {
                rpm:        null,
                blades:     null,
                motor:      null,
                factor:     1,   // Proportional (discount) factor converting wind to blade speed 
            },
            gusto: {
                rpm:        null,
                blades:     null,
                motor:      null,
                factor:     0.9,
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
        fog:        null,
        turbine:    {},
    },     
    physics:{
        heightData:     [],
        objMap:         {}
    },
    gui: {
        stats:      null
    }
}

const state = {
}
