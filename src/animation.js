import { gsap } from "https://unpkg.com/gsap@3.8.0/src/gsap-core.js";
import { Vector3, CatmullRomCurve3, BufferGeometry,  LineBasicMaterial, Line, SphereBufferGeometry, MeshBasicMaterial, Mesh, Sphere } from 'https://unpkg.com/three@0.127.0/build/three.module.js';


////////////////////////////////
/// HEPBURN ENERGY STORY    ////
////////////////////////////////

    world.animation = {
        tl:  gsap.timeline()
    }

    direction.scene = {            
        '00_reset' : {      // Starting camera position
            overlay:        {
                config: () => {
                    setTimeout( () => {document.querySelector('.overlay-background').classList.remove('black') }, 500)
                    settings.elements.solar.visible = true
                    settings.elements.storage.visible = true
                    direction.methods.toggleSolar(0)
                    direction.methods.toggleStorage(0)
                },
                logo: {
                    position:           'he-center',
                    visible_he:         false,
                    visible_fp:         false
                }
            },
            environment: {
                turbidity:          20,
                rayleigh:           0,
                mieCoefficient:     0.07,
                mieDirectionalG:    0.075,
                exposure:           0.5,
                fogDensity:         0.025
            }, 
            timing:        {
                scene: {
                    duration:       1000
                },
                overlay: {
                    delay:          0,
                    duration:       0,
                    transition:     'inOut'
                }
            },
            camera: {   
                target:     {x: 0, y: 30, z: 100}
            },
        },
        '01_opening' : {
            overlay: {
                narrative:  {
                    text:       "<div>At Hepburn Wind, we've been providing community energy for more than a decade</div>",
                    anchor:     'middle',
                    position:   'grid-area: 5 / 2 / 6 / 7'
                }
            },
            environment: {
                turbidity:          settings.sky.turbidity,
                rayleigh:           settings.sky.rayleigh,
                mieCoefficient:     settings.sky.mieCoefficient,
                mieDirectionalG:    settings.sky.mieDirectionalG,
                exposure:           settings.sky.exposure,
                fogDensity:         settings.fog.density
            }, 
            timing: {
                scene: {
                    duration:       8000
                },
                overlay: {
                    delay:          0,
                    duration:       6500,
                    transition:     'inOut'
                }
            },
            camera: {
                target:     {x: 25, y: 30, z: 50}
            },   
        },
        '01_opening_a' : {
            overlay: {
                narrative:  {
                    text:       "<div>And now to support our shire's transition to 100% net zero energy by 2025 - we're making some changes!</div>",
                    anchor:     'middle',
                    position:   'grid-area: 4 / 2 / 5 / 7'
                }
            },
            timing: {
                scene: {
                    duration:       9000
                },
                overlay: {
                    delay:          0,
                    duration:       8000,
                    transition:     'inOut'
                }
            },
            environment: {
                turbidity:          10,
                rayleigh:           0.5,
                mieCoefficient:     0.035,
                mieDirectionalG:    0.075,
                exposure:           0.5,
                fogDensity:         0
            }, 
            camera: {
                target:     {x: 50, y: 30, z: 50}
            },   
        },
        '02_hepburnSolar' : {
            overlay: {
                config: () => {
                    direction.methods.toggleSolar()
                    direction.methods.toggleStorage()
                },
                narrative:  {
                    text:       "<div>We're adding solar!</div>",
                    anchor:     'middle',
                    position:   'grid-area: 2 / 2 / 3 / 7'
                },
            },
            timing: {
                scene: {
                    duration:       4000
                },
                overlay: {
                    delay:          1000,
                    duration:       3000,
                    transition:     'in'
                }
            },
            environment: {
                turbidity:          5,
                rayleigh:           0.5,
                mieCoefficient:     0.0005,
                mieDirectionalG:    1,
                exposure:           0.8,
                fogDensity:         0
            }, 
            camera: {      

                target:     {x: 25, y: 30, z: 30}
            }            
        },
        '03_hepburnBattery' : {
            overlay: {
                narrative:  {
                    text:       "<div>We're adding solar! And we're looking into battery storage too!</div>",
                    anchor:     'middle',
                    position:   'grid-area: 2 / 2 / 3 / 7'
                },
            },
            timing: {
                scene: {
                    duration:       6000
                },
                overlay: {
                    delay:          0,
                    duration:       4000,
                    transition:     'out'
                }
            },
            environment: {
                turbidity:          5,
                rayleigh:           0.5,
                mieCoefficient:     0.0005,
                mieDirectionalG:    1,
                exposure:           0.8,
                fogDensity:         0
            }, 
            camera: {      
                target:     {x: 0, y: 30, z: 50}
            }            
        },
        '04_newName_a' : {
            overlay: {
                narrative:  {
                    text:       "<div>So we’re updating our name to reflect this big vision..</div>",
                    anchor:     'middle',
                    position:   'grid-area: 2 / 2 / 3 / 7'
                },
                logo: {
                    position:           'he-lower',
                    visible_he:          false,
                    visible_fp:          false
                }
            },
            timing: {
                scene: {
                    duration:       6000
                },
                overlay: {
                    delay:          0,
                    duration:       5000,
                    transition:     'inOut'
                }
            },
            environment: {
                turbidity:          5,
                rayleigh:           0.5,
                mieCoefficient:     0.0005,
                mieDirectionalG:    1,
                exposure:           0.8,
                fogDensity:         0
            }, 
            camera: {      
                target:     {x: 0, y: 30, z: 0}
            }            
        },
        '05_newName_b' : {
            overlay: {
                narrative:  {
                    text:       "<div>Hepburn Wind is now</div>",
                    anchor:     'middle',
                    position:   'grid-area: 2 / 2 / 3 / 7'
                },
                logo: {
                    position:           'he-center',
                    visible_he:          true,
                    visible_fp:          false
                }
            },
            timing: {
                scene: {
                    duration:       8000
                },
                overlay: {
                    delay:          0,
                    duration:       6000,
                    transition:     'inOut'
                },
                logo: {
                    delay:          1500
                }
            },
            camera: {      
                target:     {x: 0, y: 30, z: 0}
            }            
        },
        '06_newProduct' : {
            overlay: {
                narrative:  {
                    text:       "<div>To celebrate we're launching an innovative new community retailing offer</div>",
                    anchor:     'middle',
                    position:   'grid-area: 6 / 2 / 8 / 7'
                },
                logo: {
                    position:           'he-center',
                    visible_he:          true,
                    visible_fp:          false
                }
            },
            timing: {
                scene: {
                    duration:       6000
                },
                overlay: {
                    delay:          0,
                    duration:       5000,
                    transition:     'inOut'
                }
            },
            camera: {      
                target:     {x: 0, y: 30, z: 0}
            }            
        },
        '07_newPartner' : {
            overlay: {
                title:      {
                    text:       '',
                    anchor:     'left',
                    position:   'grid-area: 6 / 1 / 7 / 8'
                },
                narrative:  {
                    text:       "<div>We're partnering with Flow Power to provide a new way to buy low cost, local renewable electricity</div>",
                    anchor:     'middle',
                    position:   'grid-area: 6 / 2 / 8 / 7'
                },
                logo: {
                    position:           'top',
                    visible_he:          true,
                    visible_fp:          true
                }
            },
            timing: {
                scene: {
                    duration:       10000
                },
                overlay: {
                    delay:          500,
                    duration:       8000,
                    transition:     'inOut'
                }
            },
            camera: {      
                target:     {x: 0, y: 30, z: 0}
            }            
        },
        '08_productDetails-1' : {
            overlay: {
                narrative:  {
                    text:       "<div>This product is available to residents, businesses, commercial and industrial customers</div>",
                    anchor:     'middle',
                    position:   'grid-area: 6 / 2 / 8 / 7'
                },
                logo: {
                    position:           'top',
                    visible_he:          true,
                    visible_fp:          true
                }
            },
            timing: {
                scene: {
                    duration:       8000
                },
                overlay: {
                    delay:          0,
                    duration:       6000,
                    transition:     'inOut'
                }
            },
            camera: {      
                target:     {x: 0, y: 30, z: 0}
            }            
        },
        '09_productDetails-2' : {
            overlay: {
                narrative:  {
                    text:       "<div>You’ll be connected to our generation via the new app/platform</div>",
                    anchor:     'middle',
                    position:   'grid-area: 6 / 2 / 8 / 7'
                },
                logo: {
                    position:           'top',
                    visible_he:          true,
                    visible_fp:          true
                }
            },
            timing: {
                scene: {
                    duration:       8000
                },
                overlay: {
                    delay:          0,
                    duration:       6000,
                    transition:     'inOut'
                }
            },
            camera: {      
                target:     {x: 0, y: 30, z: 0}
            }    
        },
        '10_productDetails-3' : {
            overlay: {
                narrative:  {
                    text:       "<div>Not a great fan of technology? You’ll still get a great rate as our standard prices reward you for our shire’s abundant renewable energy</div>",
                    anchor:     'middle',
                    position:   'grid-area: 6 / 2 / 8 / 7'
                },
                logo: {
                    position:           'top',
                    visible_he:          true,
                    visible_fp:          true
                }
            },
            timing: {
                scene: {
                    duration:       8000
                },
                overlay: {
                    delay:          0,
                    duration:       6000,
                    transition:     'inOut'
                }
            },
            environment: {
                turbidity:          20,
                rayleigh:           4,
                mieCoefficient:     0.001,
                mieDirectionalG:    1,
                exposure:           0.2,
                fogDensity:         settings.fog.density
            }, 
            camera: {      
                target:     {x: 0, y: 30, z: 0}
            }    
        },
        '10_moreInformation' : {
            overlay: {
                narrative:      {
                    text:       '<div>Find out more at www.hepburnwind.com.au</div> ',
                    anchor:     'middle',
                    position:   'grid-area: 6 / 1 / 7 / 8'
                },
                logo: {
                    position:           'center',
                    visible_he:         true,
                    visible_fp:         true
                }
            },
            timing: {
                scene: {
                    duration:       10000
                },
                overlay: {
                    delay:          0,
                    duration:       10000,
                    transition:     'inOut'
                }
            }, 
            camera: {      
                target:     {x: 0, y: 40, z: 0}
            }    
        }
    }

    direction.camera = {
        pathPoints: [
            {x: -300,   y: -25,  z: -220},
            {x: -120,   y: 10,   z: 0},
            {x: -30,    y: 30,   z: 140},
            {x: 150,    y: 30,   z: 120},
            {x: 200,    y: 50,   z: -20},
            {x: 100,    y: 80,   z: -170},
            {x: -50,    y: 20,   z: -180},
            {x: -90,    y: 20,   z: -150},
            {x: -80,    y: 50,   z: -178},
        ],
        moveOnPath(duration, cameraPath, target, camera = world.camera, orbit = world.controls){
            // Move camera
           const vertexArray = cameraPath.geometry.attributes.position.array,
                noPoints = cameraPath.geometry.attributes.position.count,
                pointDuration = (duration / 1000) / (noPoints+ 1 )
            for (let i = 0; i < noPoints; i++){
                const camPosTween = gsap.to( camera.position, {
                        duration:   pointDuration,
                        ease: 'linear',
                        x:  vertexArray[(i * 3) + 0], 
                        y:  vertexArray[(i * 3) + 1], 
                        z:  vertexArray[(i * 3) + 2]
                    })  
                world.animation.tl.add(camPosTween, `<+=${i === 0 ? 0 : pointDuration}`)
            }
        },
        moveTarget(duration, targetPos, startTime, ease = 'linear', orbit = world.controls ) {
            const camTargetTween =  gsap.to( orbit.target, {
                    duration: duration / 1000,
                    ease,
                    x: targetPos.x, 
                    y: targetPos.y, 
                    z: targetPos.z 
                }
            )
             world.animation.tl.add(camTargetTween, startTime /1000)     
        },
        updateEnvironment(duration, envObj, startTime,  ease = 'linear'){
            if(typeof envObj !== 'undefined'){
                duration = duration/1000
                startTime = startTime/1000
                const turbidityTween        =  gsap.to(world.sky.material.uniforms.turbidity, { duration, ease, value: envObj.turbidity })
                const rayleighTween         =  gsap.to(world.sky.material.uniforms.rayleigh, { duration, ease, value: envObj.rayleigh  })
                const mieCoefficientTween   =  gsap.to(world.sky.material.uniforms.mieCoefficient, { duration, ease, value: envObj.mieCoefficient  })
                const mieDirectionalGTween  =  gsap.to(world.sky.material.uniforms.mieDirectionalG, { duration, ease, value: envObj.mieDirectionalG  })
                const exposureTween         =  gsap.to(world.renderer, {duration,ease, toneMappingExposure: envObj.exposure  })
                const fogTween              =  gsap.to(world.scene.fog, {duration, ease, density: envObj.fogDensity  })

                world.animation.tl.add(turbidityTween,  startTime)     
                world.animation.tl.add(rayleighTween, startTime)     
                world.animation.tl.add(mieCoefficientTween, startTime)     
                world.animation.tl.add(mieDirectionalGTween, startTime)     
                world.animation.tl.add(exposureTween, startTime)     
                world.animation.tl.add(fogTween, startTime)   
            }
        }
    }

    direction.methods = {
        addSceneOverlay(name){
            const sceneObj = direction.scene[name]
            // Transition overlays
            if(sceneObj.overlay){
                const sceneStart =  sceneObj.timing.scene.start / 1000,
                    overlayDelay = sceneObj.timing.overlay ? sceneObj.timing.overlay.delay / 1000 : 0,
                    logoDelay = sceneObj.timing.logo ? sceneObj.timing.logo.delay / 1000 : 0,
                    overlayDuration  = sceneObj.timing.overlay ? sceneObj.timing.overlay.duration/ 1000 : 0            

                world.animation.tl.call( () => {  
                    console.log(`***** ${name} ******`)
                    console.log(`'Start: ${sceneStart} for duration of ${sceneObj.timing.scene.duration}`)
                    console.log(`'Overlay at: ${sceneStart + overlayDelay} for ${overlayDuration}`)                    
                }, null, sceneStart)

                // 1. Custom config called at scene start
                if( sceneObj.overlay.config){ 
                    world.animation.tl.call( () => {  
                        sceneObj.overlay.config() 
                    }, null, sceneStart)
                } 

                // Logo visibility and positioning
                if( sceneObj.overlay.logo){
                    world.animation.tl.call( () => {   
                        const logoContainer = document.querySelector('.logo-container'),
                            heLogo = document.querySelectorAll('.he-logo'),
                            fpLogo = document.querySelector('.fp-logo')
                        logoContainer.className = ''
                        logoContainer.classList.add('logo-container', sceneObj.overlay.logo.position)

                        if(sceneObj.overlay.logo.visible_he){ 
                            for(const el of heLogo){ el.classList.remove('hidden') }
                        } else {
                            for(const el of heLogo){ el.classList.add('hidden') }
                        }
                        if(sceneObj.overlay.logo.visible_fp){ 
                            fpLogo.classList.remove('hidden')
                        } else {
                            fpLogo.classList.add('hidden')
                        }
                    }, null, sceneStart  +  logoDelay)
                }

                // Title
                if(sceneObj.overlay.title){
                    world.animation.tl.call( () => {
                        const title = document.querySelector('.title')
                        title.classList.remove('hidden')
                        title.setAttribute("style", sceneObj.overlay.title.position)
                        title.innerHTML = sceneObj.overlay.title.text
                    }, null, sceneStart  + overlayDelay)
                }

                // Narrative
                if(sceneObj.overlay.narrative){
                    const narrative = document.querySelector('.narrative')
                    world.animation.tl.call( () => {
                        narrative.setAttribute("style", sceneObj.overlay.narrative.position)
                        narrative.innerHTML = sceneObj.overlay.narrative.text
                        if( sceneObj.timing.overlay.transition.slice(0,2) === 'in'){
                            narrative.classList.remove('enter-top')
                        }
                    }, null, `<+=${overlayDelay}`) 

                    world.animation.tl.call( () => {
                        if( sceneObj.timing.overlay.transition === 'inOut' || sceneObj.timing.overlay.transition === 'out'){
                        narrative.classList.add('exit-bottom')
                            setTimeout( () => {
                                narrative.classList.remove('exit-bottom')
                                narrative.classList.add('enter-top')
                            }, 1000)
                        }
                    }, null, sceneStart  + overlayDelay + overlayDuration)

                }
            }
        },
        toggleSolar(duration = 3, solarArrays = settings.elements.solar.arrays, fence = settings.elements.solar.fence, station = settings.elements.solar.station){
            const solarObjects = solarArrays.concat(fence).concat(station),
                yOffset = settings.elements.solar.visible ? "-=2.75" : "+=2.75" 

            for( const obj of solarObjects) {
                gsap.to( obj.position, {
                    duration: duration,
                    ease: "power2.inOut",
                    y:  yOffset
                })
            }
            settings.elements.solar.visible = !settings.elements.solar.visible
        },
        toggleStorage(duration = 3, battery = settings.elements.storage.battery, station = settings.elements.storage.station){
            const storageObjects = [battery].concat(station),
                yOffset = settings.elements.storage.visible ? "-=4.75" : "+=4.75" 

            for( const obj of storageObjects) {
                gsap.to( obj.position, {
                    duration: duration,
                    ease: "power2.inOut",
                    y:  yOffset
                })
            }
            settings.elements.storage.visible = !settings.elements.storage.visible
        },
        calculateCameraPath(){
            // a. Camera path and markers
            const camPathPoints = direction.camera.pathPoints.map( d =>  new Vector3(d.x, d.y, d.z)),
                camPathCurve = new CatmullRomCurve3( camPathPoints ),
                trackDivisions = 100,
                trackPoints = camPathCurve.getPoints( trackDivisions ),
                trackMaterial = new LineBasicMaterial( { color : 0xff0055}),
                trackFullGeometry = new BufferGeometry().setFromPoints( trackPoints );

            // Track and camera point markers
            if(settings.debug.showAnimationCam){
                const camPointMaterial = new MeshBasicMaterial( { color : 0xff0055}),
                    camPointGeometry = new SphereBufferGeometry(1, 12, 12)

                // Add camera points
                for (const vec3 of camPathPoints){
                    const curveMarkerObj = new Mesh(camPointGeometry, camPointMaterial)
                    curveMarkerObj.position.set(vec3.x, vec3.y, vec3.z)
                    world.scene.add(curveMarkerObj)
                }
            }
            // Scene start markers
            const noScenes = Object.keys(direction.scene).length,
                sceneDurations = Object.values(direction.scene).map( d => d.timing.scene.duration), 
                sceneStartTime = sceneDurations.map((elem, index) => sceneDurations.slice(0,index + 1).reduce((a, b) => a + b)),
                sceneTotalDuration = sceneDurations.reduce((a,v) => a + v ,0),
                sceneStartTrackPointIdx = [0].concat(sceneStartTime.slice(0, noScenes - 1).map(d => Math.round(d / sceneTotalDuration* trackDivisions)) )
            
            world.animation.sceneDurations = sceneDurations 
            world.animation.sceneStart = sceneStartTime 
            world.animation.length = sceneTotalDuration 

            // Add scene marker points and segments
            for (let i = 0; i < sceneStartTrackPointIdx.length; i++){
                const startIDX =  sceneStartTrackPointIdx[i],
                    endIDX = i < (sceneStartTrackPointIdx.length - 1) ? sceneStartTrackPointIdx[i + 1] : trackDivisions,
                    curvePoint = trackPoints[startIDX],
                    trackSegmentGeometry = new BufferGeometry().setFromPoints( trackPoints.slice(startIDX, endIDX + 1) ),
                    trackPathSegment = new Line( trackSegmentGeometry, trackMaterial );

                if(settings.debug.showAnimationCam){
                    const sceneMarkerMaterial = new MeshBasicMaterial( { color : 0x00ddff}),
                        sceneMarkerGeometry = new SphereBufferGeometry(4, 12, 12),
                        sceneMarkerObj = new Mesh(sceneMarkerGeometry, sceneMarkerMaterial)

                    sceneMarkerObj.position.set(curvePoint.x, curvePoint.y, curvePoint.z)
                    world.scene.add(sceneMarkerObj)
                    world.scene.add(trackPathSegment)
                }
                Object.values(direction.scene)[i].camera.path = trackPathSegment
                Object.values(direction.scene)[i].timing.scene.start = i === 0 ? 0 : sceneStartTime[i -1]
            }
        },
        buildAnimation(){
            // for( const logoEl of document.querySelectorAll('.logo')) { logoEl.classList.add('hidden') }

            world.animation.tl.clear()
            world.animation.tl.call( () => {
                document.querySelector('.overlay-background').classList.add('black')
            }, null, 0)

            for (const sceneObj of Object.values(direction.scene) ) {
                direction.camera.moveOnPath(sceneObj.timing.scene.duration, sceneObj.camera.path, sceneObj.camera.target)
            }
            for (const sceneObj of Object.values(direction.scene) ) {
                direction.camera.moveTarget(sceneObj.timing.scene.duration, sceneObj.camera.target, sceneObj.timing.scene.start)
                direction.camera.updateEnvironment(sceneObj.timing.scene.duration, sceneObj.environment, sceneObj.timing.scene.start)
            }
            Object.entries(direction.scene).forEach( ([name, sceneObj]) => {
                direction.methods.addSceneOverlay(name)     
            })


            world.animation.tl.pause()
        }
    }


direction.methods.calculateCameraPath()
direction.methods.buildAnimation()

// KEYBOARD EVENT LISTENERS (FOR TESTING)
document.addEventListener("keydown", (event) => {
    // handle keydown

    switch (event.keyCode){
        case 16:
            world.animation.tl.restart() 
            break
        case 32:
            if(world.animation.tl.isActive()) {
                world.animation.tl.pause()
            } else{
                world.animation.tl.play() 
            }
           
            break
        case 72:

            break
        case 83:    // "s"
            direction.methods.toggleSolar()
            break
        case 66:    // "b"
            direction.methods.toggleStorage()
            break
    }
});