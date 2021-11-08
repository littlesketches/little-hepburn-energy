//////////////////////////////////
/// INITIATE GLOBAL VARIABLES  ///
//////////////////////////////////

// Global object for storing the scene
const world = {}
const direction = {}
// Global object for settings and references
const settings = {
    camera: {
        type:           'perspective',
        pos:            { x: -120 ,  y: 80,     z: -200   }, 
        target:         { x: 0 ,    y: 50,      z: 0   }, 
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
        turbidity:          6,
        rayleigh:           1,
        mieCoefficient:     0.03,
        mieDirectionalG:    0.7,
        elevation:          4,
        azimuth:            305,
        exposure:           0.8
    },
    fog: {
        color:              'rgb(30, 30, 30)',
        density:            0,
    },
    wind: {
        direction:          320,      // Degrees from North,
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
        flock :         null,
        fog:            null,
        turbine:        {},
        solar:          {
            visible:        true,
            arrays:      []
        },
        storage:           {
            visible:        true
        },
        text:           {
            visible:        true
        },
    },     
    physics:{
        heightData:         [],
        objMap:             {},
        material:           {},
        contactMaterial:    {}
    },
    gui: {
        stats:      null
    },
    debug: {
        showGUI:            false,
        showHeightfield:    false,
        showAnimationCam:   false,
    },    
    options: {
        simulatePhysics:    true,
        showNorthRoad:      true,
        show3dText:         true,
        animationMode:      false
    }
}
 
// Heightfield surface data manually extracted from model and used for physics ground plane
const heightfield = {
    sceneWidth:     500,
    matrix: [  // Manually constructed height matrix, setup to be square 15 x 15
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
            -10.6, -10.2, -8.9, -6.6, -4.0,               
            -2.6, -1.6, -2.8, -9.0, -10.4,              
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
            4.4,   6.0,   7.2,   8.1,  9.0,              
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
}


//////////////////////////////////////////////
/// APPLYICATION OF QUERY STRING SETTINGS  ///
////////////////////////////////////////////

applyQuerySettings()

function applyQuerySettings(){
    const params = new URLSearchParams(window.location.search)
    if (params.has('showNorthRoad')) { 
        settings.options.showNorthRoad = params.get('showNorthRoad') === 'true' ? true : false
    }
    if (params.has('show3dText')) { 
        settings.options.show3dText = params.get('show3dText') === 'true' ? true : false
    }
};
