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
        datGUIFolders:      {},
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


// fetch(`https://api.openweathermap.org/data/2.5/weather?units=metric&lat=-37.4249805&lon=144.116305&appid=2292652bd18a98be70e21278e4c01da5`)
//   .then(response => response.json())
//   .then(data => console.log(data));

const weatherObj = {
    "coord": {
        "lon": 144.1163,
        "lat": -37.425
    },
    "weather": [
        {
            "id": 801,
            "main": "Clouds",
            "description": "few clouds",
            "icon": "02n"
        }
    ],
    "base": "stations",
    "main": {
        "temp": 5.96,
        "feels_like": 4.06,
        "temp_min": 5.1,
        "temp_max": 6.15,
        "pressure": 1011,
        "humidity": 86,
        "sea_level": 1011,
        "grnd_level": 927
    },
    "visibility": 10000,
    "wind": {
        "speed": 2.47,
        "deg": 198,
        "gust": 7.65
    },
    "clouds": {
        "all": 20
    },
    "dt": 1636543276,
    "sys": {
        "type": 2,
        "id": 2003214,
        "country": "AU",
        "sunrise": 1636484913,
        "sunset": 1636535183
    },
    "timezone": 39600,
    "id": 2160341,
    "name": "Leonards Hill",
    "cod": 200
}
