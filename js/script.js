// Adrien CL le bot


/* NAV */
function openNav() {
    document.getElementById("nav-animation").style.width = "100%";
}

function closeNav() {
    document.getElementById("nav-animation").style.width = "0%";
}

function resetNav() {
    document.getElementById("nav-animation").style.width = "auto";
}

/* header */
function headerScroll() {
    window.addEventListener("scroll", callbackFunc);
    function callbackFunc() {
        let y = window.pageYOffset;
        if (y < 80){
            document.getElementById('dynamic').classList.add('headerDown');
        }else{
            document.getElementById('dynamic').classList.remove('headerDown');
        }
        if (y > 80) {
            document.getElementById('dynamic').classList.add('headerUp');
        } else {
            document.getElementById('dynamic').classList.remove('headerUp');
        }
    }
}


function navMobileToComputerPatch() {
    window.addEventListener( 'resize', navMobileToComputerPatch, false );
    const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
    if (vw > 860){
        resetNav();
    }
    if (vw < 860){
        closeNav();
    }
}

/* loader */
function hide_loader(){
    const loader = document.querySelector(".loader");
    loader.className += " hidden";

    document.getElementsByTagName("body")[0]
        .classList.remove("overflow");
       /* .style = 'overflow: visible;' */
}

/* 3D three.js */

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
}


let scene, camera, renderer, model;

function init3D() {
    scene = new THREE.Scene();
    const ambientLight = new THREE.AmbientLight(0xffffff);
    scene.add( ambientLight );

    const horse = document.getElementById('horse');
    document.body.appendChild(horse);

    const ImageLoader = new THREE.TextureLoader();
    scene.background = ImageLoader.load( 'src/backgblur2.jpg' );

    renderer = new THREE.WebGLRenderer({antialias:true},{alpha:true});
    renderer.setSize(window.innerWidth,window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    horse.appendChild(renderer.domElement);

    window.addEventListener( 'wheel', onMouseWheel, false );
    window.addEventListener( 'resize', onWindowResize, false );

    camera = new THREE.PerspectiveCamera(45,window.innerWidth/window.innerHeight);
    camera.position.set(0, 4, 29);

    /* let controls = new THREE.OrbitControls(camera);
    controls .noZoom = true;
    controls.update(); */
}


function load3Dhorse(){
    let gltfLoader = new THREE.GLTFLoader();
    let dracoLoader = new THREE.DRACOLoader();

    gsap.registerPlugin(ScrollTrigger);
    dracoLoader.setDecoderPath( 'src/horse/decoder/' )
    gltfLoader.setDRACOLoader( dracoLoader );

    gltfLoader.load('src/horse/horse-processed.glb',
        function (object){
            model = object.scene;
            model.scale.set( 0.08, 0.08, 0.08 );
            scene.add(model);
            if (model){
                /*
                model.position.y = -10;
                model.position.x = 0;
                model.rotation.y = -50;
                */
            }

            gsap.to(object.scene.rotation, {
                scrollTrigger: {
                    trigger: "#trigger",
                    start: "top top",
                    end: "bottom top",
                    scrub: true,
                    toggleActions: "restart pause resume pause"
                },
                y: Math.PI
            });
            animate();
        });
}

function onMouseWheel( event ) {
    /* on dev */

    // event.preventDefault();
    // camera.position.y -= event.deltaY * 0.01;
    // camera.position.x -= event.deltaY * 0.01;
    if(model) model.rotation.y -= event.deltaY * 0.001;

    // prevent scrolling beyond a min/max value
    // camera.position.clampScalar( 0, 10 );

}

function animate() {
    renderer.render(scene,camera);
    requestAnimationFrame(animate);
}


window.addEventListener("load", function(){
    setTimeout(hide_loader, 500);
    headerScroll();
    navMobileToComputerPatch();
    init3D();
    load3Dhorse();
});

