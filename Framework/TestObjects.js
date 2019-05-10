/*jshint esversion: 6 */
// @ts-check

/**
 * CS559 3D World Framework Code
 * 
 * Test Objects - these examples are for use in testing the framework
 * and are less generally useful
 *  
 */

 /** @module TestObjects */

// we need to have the BaseClass definition
import { GrObject } from "./GrObject.js";

// a global variable to keep track of how many objects we create
// this allows us to give unique names
let testobjsctr = 0;

// these four lines fake out TypeScript into thinking that THREE
// has the same type as the T.js module, so things work for type checking
// type inferencing figures out that THREE has the same type as T
// and then I have to use T (not THREE) to avoid the "UMD Module" warning
/**  @type typeof import("./../THREE/threets/index"); */
let T;
// @ts-ignore
T = THREE;

function degreesToRadians(deg) {
    return deg * Math.PI / 180;
}

/**
 * A simple object that is like a dump truck (with a hinge), but just made of 
 * boxes.
 * A simple way to test a parametric object
 */
export class HingeCube extends GrObject {
    constructor() {
        let group = new T.Group();
        let box = new T.BoxGeometry(1,0.5,1);
        let mesh1 = new T.Mesh(box,new T.MeshStandardMaterial({color:0xA0A000}));
        mesh1.position.y = 0.25;
        group.add(mesh1);

        let mesh2 = new T.Mesh(box,new T.MeshStandardMaterial({color:0xFFFF00}));
        // set group with origin at pivot point
        let g2 = new T.Group();
        g2.position.set(0,0.5,-0.5);
        g2.add(mesh2);
        mesh2.position.y = 0.25;
        mesh2.position.z = 0.5;
        group.add(g2);

        super(`DumpCube-${testobjsctr++}`,group,
              [ ['x',-5,5,2],['z',-5,5,2],['theta',-180,180,0],
                ['tilt',0,90,0]
              ]);
        
        this.group = group;
        this.mesh1 = mesh1;
        this.mesh2 = mesh2;
        this.g2 = g2;
    }

    update(paramValues) {
        this.group.position.x = paramValues[0];
        this.group.position.z = paramValues[1];
        this.group.rotation.y = degreesToRadians(paramValues[2]);
        this.g2.rotation.x = degreesToRadians(-paramValues[3]);
    }
}


// for faking deferred loading
// from https://flaviocopes.com/javascript-sleep/
const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
};

/**
 * test for an object that is created slowly (like loading an OBJ)
 * 
 * the catch is that we need to have an object to install in the world
 * (since we can't defer that), but we don't have "the" object
 * 
 * the trick: make a Group - when the deferred object finally arrives,
 * stick it in the group
 * 
 * here, we fake OBJ loading with sleep
 */
export class DelayTest extends GrObject {
    constructor() {
        let group = new T.Group();
        super("Delay-Test", group);
        this.group = group;
        // use sleep, rather than OBJ loader
        sleep(1500).then(function() {
            group.add(new T.Mesh(new T.TorusKnotGeometry(), new T.MeshStandardMaterial({color:"red"})));
        });
    }
}
  
/**
 * Better delayed object - put a proxy object in its place, and then remove it
 */
export class BetterDelayTest extends GrObject {
    constructor() {
        let group = new T.Group();
        super("Delay-Test", group);
        this.group = group;
        // make a cube that will be there temporarily
        let tempCube = new T.Mesh(new T.BoxGeometry(), new T.MeshStandardMaterial());
        group.add(tempCube);
        // use sleep, rather than OBJ loader
        sleep(2000).then(function() {
            group.remove(tempCube);
            group.add(new T.Mesh(new T.TorusKnotGeometry(), new T.MeshStandardMaterial({color:"purple"})));
        });
    }
}

/**
 * test for changing an object's material
 */
export class MaterialDelayTest extends GrObject {
    constructor() {
        let group = new T.Group();
        super("Delay-Test", group);
        this.material = new T.MeshStandardMaterial({color:"white"});
        this.geometry = new T.TorusGeometry();
        this.mesh = new T.Mesh(this.geometry,this.material);
        let self=this;
        group.add(this.mesh);
        group.position.x = -3;
        // use sleep, rather than OBJ loader
        sleep(1000).then(function() {
            // note: we can't use "this" because this isn't lexically scoped
            self.material.setValues({color:"red"});
            self.material.needsUpdate = true;
        });
    }
}
