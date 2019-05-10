/*jshint esversion: 6 */
// @ts-check

/**
 * Minimal Starter Code for the QuadCopter assignment
 */

import {onWindowOnload} from "./Libs/helpers.js";

// these four lines fake out TypeScript into thinking that THREE
// has the same type as the T.js module, so things work for type checking
// type inferencing figures out that THREE has the same type as T
// and then I have to use T (not THREE) to avoid the "UMD Module" warning
/**  @type typeof import("./THREE/threets/index"); */
let T;
// @ts-ignore
T = THREE;
// Colors for using later
let Colors = {
    red: 0xF25346,
    white: 0xD8D0D1,
    brown: 0x59332E,
    pink: 0xF5986E,
    brownDark: 0x23190F,
    blue: 0x68C3C0,
    gray: 0xD5D8DC,
    grayDark: 0x808B96
};
// Create the shape of airplane
function Airplane() {
    let airplane = new T.Group();
    let geoCockpit = new T.BoxGeometry(6, 3, 3, 1, 1, 1);
    let mCockpit = new T.MeshPhongMaterial({color: Colors.red});
    let cockpit = new T.Mesh(geoCockpit, mCockpit);
    airplane.add(cockpit);
    let geoEngine = new T.BoxGeometry(2, 3, 3, 1, 1, 1);
    let mEngine = new T.MeshPhongMaterial({color: Colors.white});
    let engine = new T.Mesh(geoEngine, mEngine);
    engine.position.x = 4;
    airplane.add(engine);
    let geoTail = new T.BoxGeometry(1.5, 2, 1, 1, 1);
    let mTail = new T.MeshPhongMaterial({color: Colors.red});
    let tail = new T.Mesh(geoTail, mTail);
    tail.position.set(-3.5, 2.5, 0);
    airplane.add(tail);
    let geoWing = new T.BoxGeometry(1, 0.8, 10, 1, 1, 1);
    let mWing = new T.MeshPhongMaterial({color: Colors.red});
    let wing = new T.Mesh(geoWing, mWing);
    airplane.add(wing);
    let geoPropeller = new T.BoxGeometry(2, 1, 1, 1, 1, 1);
    let mPropeller = new T.MeshPhongMaterial({color: Colors.gray});
    let propeller = new T.Mesh(geoPropeller, mPropeller);
    propeller.position.x = 5;
    airplane.add(propeller);
    let propeller2 = new T.Mesh(geoPropeller, mPropeller);
    propeller2.position.set(-3.5, 3.5, 0);
    propeller2.rotateZ(90 * Math.PI / 180);
    airplane.add(propeller2);
    let propeller3 = new T.Mesh(geoPropeller, mPropeller);
    propeller3.position.set(0, 0.7, 5);
    propeller3.rotateZ(Math.PI / 2);
    airplane.add(propeller3);
    let propeller4 = new T.Mesh(geoPropeller, mPropeller);
    propeller4.position.set(0, 0.7, -5);
    propeller4.rotateZ(Math.PI / 2);
    airplane.add(propeller4);
    let geoBlade = new T.BoxGeometry(0.1, 7, 2, 1, 1, 1);
    let mBlade = new T.MeshPhongMaterial({color: Colors.grayDark, specular: Colors.grayDark});
    let blade = new T.Mesh(geoBlade, mBlade);
    blade.position.x = 5;
    blade.scale.set(0.8, 0.8, 0.8);
    airplane.add(blade);
    let blade2 = new T.Mesh(geoBlade, mBlade);
    blade2.position.set(-3.5, 3.5, 0);
    blade2.rotateZ(90 * Math.PI / 180);
    blade2.scale.set(0.8, 0.8, 0.8);
    airplane.add(blade2);
    airplane.scale.set(.15, .15, .15);
    airplane.position.set(-3, 3, -1);
    let blade3 = new T.Mesh(geoBlade, mBlade);
    blade3.position.set(0, 0.7, 5);
    blade3.rotateZ(Math.PI / 2);
    blade3.scale.set(0.6, 0.6, 0.6);
    airplane.add(blade3);
    let blade4 = new T.Mesh(geoBlade, mBlade);
    blade4.position.set(0, 0.7, -5);
    blade4.rotateZ(Math.PI / 2);
    blade4.scale.set(0.6, 0.6, 0.6);
    airplane.add(blade4);
    return airplane;
};
// Create the shape of radar
function Radar() {
    let radar = new T.Group(),
        radar_fund = new T.Group(),
        radar_probe = new T.Group();
    let radar_material = new T.MeshPhongMaterial({color: "#CCD1D1", side: T.DoubleSide});
    radar_material.specular.set("#CCD1D1");
    let geoFund = new T.BoxGeometry(0.8, 0.2, 0.5, 1, 1, 1);
    let fund1 = new T.Mesh(geoFund, radar_material);
    fund1.position.set(0, 0.1, 0);
    radar_fund.add(fund1);
    let fund2 = new T.Mesh(geoFund, radar_material);
    fund2.position.set(0, 0.25, 0);
    fund2.scale.set(0.6, 0.6, 0.6);
    radar_fund.add(fund2);
    let geoFund2 = new T.CylinderGeometry(0.08, 0.08, 0.55, 32, 32);
    let fund3 = new T.Mesh(geoFund2, radar_material);
    fund3.position.set(0, 0.5, 0);
    radar_fund.add(fund3);
    let geoProbe = new T.CylinderGeometry(0.03, 0.03, 0.5, 32, 32);
    let f1 = new T.Mesh(geoProbe, radar_material);
    f1.position.set(0, 0.4, -0.15);
    f1.rotateX(20 * Math.PI / 180);
    radar_probe.add(f1);
    let f2 = new T.Mesh(geoProbe, radar_material);
    f2.position.set(0, 0.4, -0.15);
    f2.rotateX(-20 * Math.PI / 180);
    f2.position.set(0, 0.4, 0.15);
    radar_probe.add(f2);
    let f3 = new T.Mesh(geoProbe, radar_material);
    f3.position.set(0.15, 0.4, 0);
    f3.rotateZ(20 * Math.PI / 180);
    radar_probe.add(f3);
    let f4 = new T.Mesh(geoProbe, radar_material);
    f4.position.set(-0.15, 0.4, 0);
    f4.rotateZ(-20 * Math.PI / 180);
    radar_probe.add(f4);
    let geoProbe2 = new T.SphereGeometry(0.12, 32, 32);
    let f5 = new T.Mesh(geoProbe2, radar_material);
    f5.position.set(0, 0.6, 0);
    radar_probe.add(f5);
    radar_probe.position.set(0, 1, -0.15);
    radar_probe.scale.set(0.8, 0.8, 0.8);
    radar_probe.position.set(0, 0.9, 0);
    let points = [];
    points.push(new T.Vector2(0, 0.7));
    points.push(new T.Vector2(0.3, 0.8));
    points.push(new T.Vector2(0.4, 0.9));
    points.push(new T.Vector2(0.5, 1));
    points.push(new T.Vector2(0.6, 1.2));
    let geoDish = new T.LatheGeometry(points, 30, 0, Math.PI * 2);
    let dish = new T.Mesh(geoDish, radar_material);
    dish.position.set(-0.05, -0.85, 0);
    radar_probe.add(dish);
    radar.add(radar_fund);
    radar.add(radar_probe);
    return radar;
};
function quadcopter() {
    let renderer = new T.WebGLRenderer();
    renderer.setSize(600,400);
    document.body.appendChild(renderer.domElement);
    renderer.shadowMap.enabled = true;
    let scene = new T.Scene();
    let camera = new T.PerspectiveCamera(40, renderer.domElement.width / renderer.domElement.height, 1,1000);

    camera.position.z = 10;
    camera.position.y = 5;
    camera.position.x = 5;
    camera.lookAt(0,0,0);
 
    // since we're animating, add OrbitControls
    let controls = new T.OrbitControls(camera,renderer.domElement);

    scene.add(new T.AmbientLight("white",0.2));

    // two lights - both a little off white to give some contrast
    let dirLight1 = new T.DirectionalLight(0xF0E0D0,1);
    dirLight1.position.set(1,1,0);
    scene.add(dirLight1);

    let dirLight2 = new T.DirectionalLight(0xD0E0F0,1);
    dirLight2.position.set(-1,1,-.2);
    scene.add(dirLight2);

    // make a ground plane
    let groundBox = new T.BoxGeometry(10,0.1,10);
    let groundMesh = new T.Mesh(groundBox,new T.MeshStandardMaterial( {color:0x88B888, roughness:.9}));
    // put the top of the box at the ground level (0)
    groundMesh.position.y = -.05;
    groundMesh.receiveShadow = true;
    scene.add(groundMesh);

    // this is the part the student should change
    //** GET RID OF THIS SILLY DONUT! Replace it with an aircraft*/
    let airplane = Airplane();
    scene.add(airplane);
    // cast shadow
    for (let i = 0; i < airplane.children.length; i++) {
        airplane.children[i].castShadow = true;
    }
    let radar = Radar();
    scene.add(radar);
    let airplane2 = Airplane();
    // change color for another airplane
    for (let i = 0; i < 4; i++) {
        if (i != 1)
            //@ts-ignore
            airplane2.children[i].material.color.setHex(Colors.blue);
    }
    // cast shadow
    for (let i = 0; i < airplane2.children.length; i++) {
        airplane2.children[i].castShadow = true;
    }
    airplane2.scale.set(0.1, 0.1, 0.1);
    airplane2.position.set(4, 2, 4);
    scene.add(airplane2);
    let radar2 = Radar();
    radar2.position.set(2, 0, 2);
    scene.add(radar2);
    // add two spotlight for each airplane
    let spot1 = new T.SpotLight("#F4F6F7", 1, 0, Math.PI / 10);
    let spot2 = new T.SpotLight(Colors.pink, 1, 0, Math.PI / 15);
    spot1.position.set(0, 7, 0);
    spot1.castShadow = true;
    scene.add(spot1);
    spot2.position.set(0, 6, 0);
    spot2.castShadow = true;
    scene.add(spot2);
    function animateLoop() {
        //** EXAMPLE CODE - STUDENT SHOULD REPLACE */
        // move in a circle 
        let theta = performance.now() / 1000;
        let x = 3 * Math.cos(theta);
        let z = 3 * Math.sin(theta);
        // moving speed for another airplane
        let theta2 = performance.now() / 900;
        // rotate blades
        airplane.children[8].rotateOnWorldAxis(new T.Vector3(1, 0, 0), 0.5);
        airplane.children[9].rotateOnWorldAxis(new T.Vector3(0, 1, 0), 0.5);  
        airplane.children[10].rotateOnWorldAxis(new T.Vector3(0, 1, 0), 0.5);  
        airplane.children[11].rotateOnWorldAxis(new T.Vector3(0, 1, 0), 0.5);  
        airplane.position.x = x;
        airplane.position.z = z;
        // rotate blades
        airplane2.children[8].rotateOnWorldAxis(new T.Vector3(1, 0, 0), 0.5);
        airplane2.children[9].rotateOnWorldAxis(new T.Vector3(0, 1, 0), 0.5);  
        airplane2.children[10].rotateOnWorldAxis(new T.Vector3(0, 1, 0), 0.5);  
        airplane2.children[11].rotateOnWorldAxis(new T.Vector3(0, 1, 0), 0.5); 
        airplane2.position.x = -3 * Math.cos(theta2);
        airplane2.position.z = -3 * Math.sin(theta2);
        spot1.target = airplane;
        spot1.position.x = airplane.position.x;
        spot1.position.z = airplane.position.z;
        spot2.target = airplane2;
        spot2.position.x = airplane2.position.x;
        spot2.position.z = airplane2.position.z;
        airplane.lookAt(0, 3, 0);
        airplane2.lookAt(0, 2, 0);
        // radars track airplanes
        radar.children[1].lookAt(-airplane.position.x, airplane.position.y, -airplane.position.z);
        radar2.children[1].lookAt(2 - airplane2.position.x, airplane2.position.y + 2, 2 - airplane2.position.z);
        renderer.render(scene,camera);
        window.requestAnimationFrame(animateLoop);
    }
    animateLoop();
}
onWindowOnload(quadcopter);
