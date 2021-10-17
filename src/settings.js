

///////////////////////////////
/// Global state variables  ///
///////////////////////////////

const settings = {
    sky: {
        turbidity: 0,
        rayleigh: 0.08,
        mieCoefficient: 0.005,
        mieDirectionalG: 0.7,
        elevation: 2,
        azimuth: 15,
        exposure:   0.5
    },
    wind: {
        direction: 0,   // Degrees from North,
        speed: 25,       // Speed in m/s 25 > 17.1, 3.5 > 10
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
    }

}

const state = {
    

}

let scene