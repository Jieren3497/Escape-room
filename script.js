let rnd = (l,u) => Math.random() * (u-l) + l;
let scene,player, monster;
let doors = [];
let waypoints = [];

window.addEventListener("DOMContentLoaded",function() {
  scene = document.querySelector("a-scene");
  camera = document.querySelector("a-camera");
  player = new Player("a-camera");

  waypoints = document.querySelectorAll(".nav")

  doors.push(new Door(35.75, 9.25, -33, 0));
  doors.push(new Door(31.95, 9.25, -27.5, 90));
  doors.push(new Door(37, 9.25, -25, 270));
  doors.push(new Door(31.95, 9.25, -13, 90));
  doors.push(new Door(28.5, 9.25, -5.5, 0));
  doors.push(new Door(-10, 9.25, 17.5, 90));
  doors.push(new Door(-25, 16.25, 5.5, 180));
  doors.push(new Door(-22.5, 16.25, -4.5, 0));
  doors.push(new Door(-40, 16.25, -4.5, 0));
  doors.push(new Door(-46.5, 16.25, -16, 90));
  doors.push(new Door(-22.5, 16.25, 60.5, 180));
  doors.push(new Door(-38, 16.25, 60.5, 180));

  monster = new Monster(10,7,-12);

  let stairs = new Stairs(-4.5, 6.75, 30.75, 0);
  let basementstairs = new Stairs(-4.5, 0, 30.75, 0);
  
  setTimeout(loop,100);
  
})

function loop(){
  player.update();
  for (let i = 0; i < doors.length; i++) {
  doors[i].openDoor();
  }
  
  if(monster) monster.update();

  window.requestAnimationFrame(loop);

}

function distance(obj1,obj2){
  let x1 = obj1.object3D.position.x;
  let y1 = obj1.object3D.position.y;
  let z1 = obj1.object3D.position.z;
  let x2 = obj2.object3D.position.x;
  let y2 = obj2.object3D.position.y;
  let z2 = obj2.object3D.position.z;

  let d = Math.sqrt(Math.pow(x1-x2,2) + Math.pow(y1-y2,2) + Math.pow(z1-z2,2));
  return d;
}