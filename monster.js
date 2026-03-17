class Monster {

  constructor(x,y,z){

    this.speed = 0.05;
    this.chaseSpeed = 0.1;
    this.turnSpeed = 0.05;

    this.state = "patrol"; // patrol / chase
    this.target = null;

    this.lastSeenTimer = 0;

    this.obj = document.createElement("a-entity");
    this.obj.setAttribute("gltf-model", "#monsterModel");
    this.obj.setAttribute("scale", "1.5 1.5 1.5");
    this.obj.setAttribute("position", {x:x, y:y, z:z});

    scene.append(this.obj);

    this.pickTarget();
  }

  pickTarget(){
    let wp = waypoints[Math.floor(Math.random()*waypoints.length)];
    this.target = wp.object3D.position.clone();
  }

  canSeePlayer(){

  let m = this.obj.object3D.position;
  let p = player.driver.object3D.position;

  let direction = new THREE.Vector3().subVectors(p, m);
  let distance = direction.length();

  // 🔒 MAX VIEW DISTANCE
  if(distance > 15) return false;

  direction.normalize();

  this.raycaster.set(m, direction);

  // 👇 IMPORTANT: include ONLY objects that can block vision
  let intersects = this.raycaster.intersectObjects(scene.object3D.children, true);

  if(intersects.length > 0){

    let hit = intersects[0];

    // 🧍 If first thing hit is the player → visible
    if(hit.object === player.driver.object3D){
      return true;
    }

    // 🧱 Otherwise something (like a wall) is blocking
    return false;
  }

  return false;
}

  update(){

    let pos = this.obj.object3D.position;

    // 👁️ VISION LOGIC (FIXED)
    if(this.canSeePlayer()){
      this.state = "chase";
      this.lastSeenTimer = 120;
      this.target = player.driver.object3D.position.clone();
    } else {
      this.lastSeenTimer--;

      if(this.lastSeenTimer <= 0){
        if(this.state === "chase"){
          this.state = "patrol";
          this.pickTarget(); // ✅ IMPORTANT: new target prevents spinning
        }
      }
    }

    let speed = this.state === "chase" ? this.chaseSpeed : this.speed;

    let dx = this.target.x - pos.x;
    let dz = this.target.z - pos.z;

    let dist = Math.sqrt(dx*dx + dz*dz);

    // 🎯 REACHED TARGET
    if(dist < 0.5){
      if(this.state === "patrol"){
        this.pickTarget(); // move to next hallway point
      }
      return;
    }

    // 🎯 TARGET ANGLE
    let targetAngle = Math.atan2(dx, dz);

    let currentY = this.obj.object3D.rotation.y;

    let diff = targetAngle - currentY;
    diff = Math.atan2(Math.sin(diff), Math.cos(diff));

    // 🔄 ROTATE
    this.obj.object3D.rotation.y += diff * this.turnSpeed;

    // 🛑 TURN FIRST
    if(Math.abs(diff) > 0.2){
      return;
    }

    // 🚶 MOVE FORWARD
    pos.x += Math.sin(this.obj.object3D.rotation.y) * speed;
    pos.z += Math.cos(this.obj.object3D.rotation.y) * speed;

    // 🪜 STAIRS FIX (SMOOTH Y FOLLOW)
    let targetY = this.target.y;

    pos.y += (targetY - pos.y) * 0.1;
  }
}