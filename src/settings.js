//////////////////////////////////
/// INITIATE GLOBAL VARIABLES  ///
//////////////////////////////////


const world = {}                // Global object for storing the scene
const direction = {}            // Global object for storing the animation direction 
const settings = {              // Global object for settings, references (and state)
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
        exposure:           0.75
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
        fireflies: {
            visible:        true
        }
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
        showGUI:            true,
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


// Heightfield surface built from raycasting in the physics module
const heightfield = {
    sceneWidth:     500
} 


/////////////////////////////////////////////
/// APPLICATION OF QUERY STRING SETTINGS  ///
/////////////////////////////////////////////

applyQuerySettings()

function applyQuerySettings(){
    const params = new URLSearchParams(window.location.search)
    if (params.has('showNorthRoad')) { 
        settings.options.showNorthRoad = params.get('showNorthRoad') === 'true' ? true : false
    }
    if (params.has('show3dText')) { 
        settings.options.show3dText = params.get('show3dText') === 'true' ? true : false
    }
    if (params.has('gui')) { 
        settings.debug.showGUI = params.get('gui') === 'true' ? true : false
    }
};
