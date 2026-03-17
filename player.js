class Player{
  constructor(selector){
    this.obj = document.querySelector(selector);
    this.moveStrength = 0.09;
    // this.moveStrength = 0.5;
    this.jumpStrength = 0.25;
    this.jumping = false;
    this.pressed = [];
    this.dy = this.jumpStrength;

    this.driver = document.createElement("a-sphere");
    //this.driver.setAttribute("src","lava2.jpg")
    this.driver.setAttribute("opacity",0);
    this.driver.setAttribute("dynamic-body",{mass:20,angularDamping:0.5,linearDamping:0.01});
    this.driver.setAttribute("radius",0.5);

    this.driver.object3D.position.x = this.obj.object3D.position.x;
    this.driver.object3D.position.y = this.obj.object3D.position.y + 15;
    this.driver.object3D.position.z = this.obj.object3D.position.z;
    scene.append(this.driver);

    window.addEventListener("keyup",(e)=>{
      if(this.pressed[" "]) {}else
        this.driver.removeAttribute("dynamic-body");
      delete this.pressed[e.key];
    });
    window.addEventListener("keydown",(e)=>{
      if(this.pressed[" "]) {}else
        this.driver.setAttribute("dynamic-body",{mass:20,angularDamping:0.5,linearDamping:0.01});
      this.pressed[e.key] = true;
    })
  }

  update(){
    this.processImpulses();  
    this.obj.object3D.position.x = this.driver.object3D.position.x;
    this.obj.object3D.position.y = this.driver.object3D.position.y + 0.5;
    this.obj.object3D.position.z = this.driver.object3D.position.z;
    
  }
  processImpulses(){
    try{
      // this.driver.setAttribute("dynamic-body",{mass:20,angularDamping:0.5,linearDamping:0.01});
      if(this.pressed[" "] && !this.jumping){
        this.jumping = true;
      }
      if(this.jumping){
        if(this.dy > 0){
          this.dy -= 0.002;
          this.driver.object3D.position.y += this.dy;
          this.driver.components["dynamic-body"].syncToPhysics();
        }else{
          this.jumping = false;
          this.dy = this.jumpStrength;         
        }
      }
      
      if(this.pressed["ArrowUp"] || this.pressed["w"] ){
        let theta = this.obj.object3D.rotation.y + Math.PI;
        this.updateDriverPosition(theta);
      }
      if(this.pressed["ArrowDown"] || this.pressed["s"] ){
        let theta = this.obj.object3D.rotation.y;
        this.updateDriverPosition(theta);
      }
      if(this.pressed["ArrowLeft"] || this.pressed["a"] ){
        let theta = this.obj.object3D.rotation.y - Math.PI / 2;
        this.updateDriverPosition(theta);
      }
      if(this.pressed["ArrowRight"] || this.pressed["d"] ){
        let theta = this.obj.object3D.rotation.y + Math.PI / 2;
        this.updateDriverPosition(theta);
      }
      //this.driver.components["dynamic-body"].syncToPhysics();
      
    }catch{}
  }
  updateDriverPosition(theta){
    let dz = this.moveStrength * Math.cos(theta);
    let dx = this.moveStrength * Math.sin(theta);
    this.driver.object3D.position.z += dz;
    this.driver.object3D.position.x += dx;
    // this.driver.components["dynamic-body"].syncToPhysics();
  }
}