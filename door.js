class Door {
  constructor(x, y, z, rotation) {
    this.x = x;
    this.y = y;
    this.z = z;

    this.rotY = rotation;   // store rotation separately
    this.dy = 1.5;            // speed of opening
    this.ndy = -1.5;        // speed of closing
    this.open = false;

    // Create the door box

    this.obj = document.createElement("a-entity");
    this.obj.setAttribute("width", 0.1);
    this.obj.setAttribute("depth", 0.1);
    this.obj.setAttribute("height", 5);

    let doors = document.createElement("a-box");
    doors.setAttribute("width", 2.5);
    doors.setAttribute("height", 5);
    doors.setAttribute("depth", 0.1);
    doors.setAttribute("color", "#6b4423");
    doors.setAttribute("position", {x:-1.25, y:0, z:0});
    doors.setAttribute("static-body", "")
    this.obj.append( doors );

    this.obj.setAttribute("position", { x: this.x, y: this.y, z: this.z });
    this.obj.setAttribute("rotation", { x: 0, y: this.rotY, z: 0 });

    // Add door to the scene
    scene.append(this.obj);
  }
  openDoor() {
    let d = distance(this.obj, player.driver);
    console.log(d);

    // Open door when player is close
    if (d < 4.5 && this.rotY < 90) {

      this.rotY += this.dy;

      if (this.rotY >= 90) {
        this.rotY = 90;
      }

      this.obj.setAttribute("rotation", {x:0, y:this.rotY, z:0});
    }

    // Close door when player walks away
    else if (d >= 4.5 && this.rotY > 0) {

      this.rotY += this.ndy;

      if (this.rotY <= 0) {
        this.rotY = 0;
      }

      this.obj.setAttribute("rotation", {x:0, y:this.rotY, z:0});
    }
  }
}