class Player{
  constructor(selector){
    this.obj = document.querySelector(selector);

    // Movement strength
    // this.moveStrength = 5.5;
    this.moveStrength = 25;
    this.jumpStrength = 0;

    this.jumping = false;
    this.pressed = {};

    // Physics driver
    this.driver = document.createElement("a-sphere");
    this.driver.setAttribute("opacity",0);
    this.driver.setAttribute("radius",0.5);

    // Higher damping prevents sliding
    this.driver.setAttribute("dynamic-body",{
      mass:20,
      angularDamping:0.9,
      linearDamping:0.8
    });
    

    // Start position
    // this.driver.object3D.position.x = this.obj.object3D.position.x + 20;
    // this.driver.object3D.position.y = this.obj.object3D.position.y + 10;
    // this.driver.object3D.position.z = this.obj.object3D.position.z + -25;

    this.driver.object3D.position.x = this.obj.object3D.position.x + -5;
    this.driver.object3D.position.y = this.obj.object3D.position.y +8;
    this.driver.object3D.position.z = this.obj.object3D.position.z;


    scene.append(this.driver);

    // Keyboard input
    window.addEventListener("keyup",(e)=>{
      delete this.pressed[e.key];
    });

    window.addEventListener("keydown",(e)=>{
      this.pressed[e.key] = true;
    });
  }

  update(){
    this.processImpulses();

    // Camera follows physics body
    this.obj.object3D.position.x = this.driver.object3D.position.x;
    this.obj.object3D.position.y = this.driver.object3D.position.y + 0.5;
    this.obj.object3D.position.z = this.driver.object3D.position.z;
  }

  processImpulses(){
    try{

      let body = this.driver.body;
      if(!body) return;

      // --- Jump ---
      if(this.pressed[" "] && !this.jumping){
        body.velocity.y = this.jumpStrength;
        this.jumping = true;
      }

      if(body.velocity.y < -0.1){
        this.jumping = false;
      }

      // --- Movement Vector ---
      let dx = 0;
      let dz = 0;

      let rot = this.obj.object3D.rotation.y;

      // Forward
      if(this.pressed["w"] || this.pressed["ArrowUp"]){
        dz -= Math.cos(rot);
        dx -= Math.sin(rot);
      }

      // Backward
      if(this.pressed["s"] || this.pressed["ArrowDown"]){
        dz += Math.cos(rot);
        dx += Math.sin(rot);
      }

      // Left
      if(this.pressed["a"] || this.pressed["ArrowLeft"]){
        dz += Math.sin(rot);
        dx -= Math.cos(rot);
      }

      // Right
      if(this.pressed["d"] || this.pressed["ArrowRight"]){
        dz -= Math.sin(rot);
        dx += Math.cos(rot);
      }

      // Normalize diagonal movement
      let mag = Math.sqrt(dx*dx + dz*dz);
      if(mag > 0){
        dx /= mag;
        dz /= mag;

        body.velocity.x = dx * this.moveStrength;
        body.velocity.z = dz * this.moveStrength;
      }else{
        // Stop sliding when no keys pressed
        body.velocity.x *= 0.2;
        body.velocity.z *= 0.2;
      }

    }catch(e){}
  }
}