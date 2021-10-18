///////////////////////////////
/// Global state variables  ///
///////////////////////////////

const settings = {
    camera: {
        pos:    { x: 200 ,  y: 100,     z: -200   }, 
        target: { x: 0 ,    y: 20,      z: 0   } 
    },
    lights:{
        ambientLight: {
            sky:            '#FFFFFF',
            ground:         '#00FF00'
        },
        directionalLight: {
            color:            '#FFFFFF',
        }
    },
    sky: {
        turbidity:          0,
        rayleigh:           0.75,
        mieCoefficient:     0.005,
        mieDirectionalG:    0.7,
        elevation:          5,
        azimuth:            200,
        exposure:           0.5
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
        lights: {
            ambientLight:       null,
            directionalLight:   null
        },
        flock :     null,

    }

}

const state = {
    

}

let scene