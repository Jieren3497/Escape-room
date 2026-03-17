class Monster {
  constructor(x,y,z){
    this.obj = document.createElement("a-entity");
    this.obj.setAttribute("gltf-model","#monsterModel");
    this.obj.setAttribute("scale","3 3 3");
    this.obj.setAttribute("position",{x:x,y:y,z:z});
    scene.append(this.obj);

    this.speed = 0.05;        // patrol speed
    this.chaseSpeed = 0.1;    // chase speed
    this.turnSpeed = 0.05;

    this.state = "patrol";
    this.target = null;
    this.lastSeenTimer = 0;

    this.floorY = y;          // keep track of original floor height

    this.pickTarget();
  }

  pickTarget(){
    let wp = waypoints[Math.floor(Math.random()*waypoints.length)];
    this.target = wp.object3D.position.clone();
    this.isStairsTarget = wp.dataset.stairs === "true"; // only climb if stair point
  }

  canSeePlayer(){
    if(!player || !player.driver) return false;
    let m = this.obj.object3D.position;
    let p = player.driver.object3D.position;
    let dx = p.x - m.x;
    let dz = p.z - m.z;
    let dy = p.y - m.y;
    let dist = Math.sqrt(dx*dx + dz*dz + dy*dy);
    return dist < 15; // vision range
  }

  update(){
    let pos = this.obj.object3D.position;

    // ---- state ----
    if(this.canSeePlayer()){
      this.state = "chase";
      this.lastSeenTimer = 120;
      this.target = player.driver.object3D.position.clone();
      this.isStairsTarget = false; // never climb stairs while chasing
    } else {
      this.lastSeenTimer--;
      if(this.lastSeenTimer <= 0 && this.state==="chase"){
        this.state="patrol";
        this.pickTarget();
      }
    }

    if(!this.target) return;

    let dx = this.target.x - pos.x;
    let dz = this.target.z - pos.z;
    let dy = this.target.y - pos.y;
    let dist = Math.sqrt(dx*dx + dz*dz);

    if(dist < 0.5 && this.state==="patrol"){
      this.pickTarget();
      return;
    }

    // ---- rotate toward target ----
    let targetAngle = Math.atan2(dx,dz);
    let diff = targetAngle - this.obj.object3D.rotation.y;
    diff = Math.atan2(Math.sin(diff), Math.cos(diff));
    this.obj.object3D.rotation.y += diff * this.turnSpeed;

    // ---- move forward ----
    let speed = this.state==="chase"?this.chaseSpeed:this.speed;
    let vx = Math.sin(this.obj.object3D.rotation.y) * speed;
    let vz = Math.cos(this.obj.object3D.rotation.y) * speed;

    // vertical movement only for patrol on stair points
    let vy = 0;
    if(this.state==="patrol" && this.isStairsTarget){
      vy = dy * 0.05; // climb stairs smoothly
    }

    // ---- raycast collision ahead ----
    let origin = new THREE.Vector3(pos.x,pos.y,pos.z);
    let dir = new THREE.Vector3(vx,vy,vz).normalize();
    let raycaster = new THREE.Raycaster(origin,dir,0,0.5);
    let intersects = raycaster.intersectObjects(scene.object3D.children,true);
    let blocked = intersects.some(i=>i.object.userData.static);

    if(!blocked){
      pos.x += vx;
      pos.z += vz;
      pos.y += vy;

      // always snap y to floor for chase
      if(this.state==="chase"){
        pos.y = this.floorY;
      }
    } else {
      this.pickTarget();
    }
  }
}