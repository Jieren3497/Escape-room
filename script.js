let rnd = (l,u) => Math.random() * (u-l) + l;

let moneyCollected = 0;
const totalMoney = 20;

let scene, player, monster;
let doors = [];
let waypoints = [];

// =========================
// BUILD NAV GRAPH
// =========================
function buildNavGraph(){
  let navEls = document.querySelectorAll(".nav");

  waypoints = []; // reset

  navEls.forEach(el => {
    waypoints.push({
      el: el,
      pos: el.object3D.position.clone(),
      isElevator: el.classList.contains("elevator")
    });
  });

  console.log("Nav nodes:", waypoints.length);
}

// =========================
// GET NEIGHBORS (GRID LOGIC)
// =========================
function getNeighbors(node) {
  let neighbors = [];

  waypoints.forEach(other => {
    if (node === other) return;

    let dx = node.pos.x - other.pos.x;
    let dy = node.pos.y - other.pos.y;
    let dz = node.pos.z - other.pos.z;

    let dist = Math.sqrt(dx*dx + dz*dz);

    if (Math.abs(dy) < 1 && dist > 5 && dist < 30) {
      neighbors.push(other);
    }

    if (node.isElevator && other.isElevator) {
      if (dist < 3 && Math.abs(dy) > 2 && Math.abs(dy) < 20) {
        neighbors.push(other);
      }
    }
  });

  return neighbors;
}

// =========================
// START GAME
// =========================
window.addEventListener("DOMContentLoaded", function() {

  scene = document.querySelector("a-scene");
  camera = document.querySelector("a-camera");

  player = new Player("a-camera");

  // ⚠️ IMPORTANT: build nav AFTER scene loads
  setTimeout(buildNavGraph, 500);

  // doors
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

  window.addEventListener("click", (e) => {
  // e.target is the A-Frame entity clicked
  if (e.target.classList && e.target.classList.contains("money-bag") && e.target.getAttribute("visible") !== false) {
    e.target.setAttribute("visible", false); // hide this bag
    moneyCollected++;

    // update HUD
    const hudText = document.querySelector("#moneyHUD a-text");
    hudText.setAttribute("value", `${moneyCollected}/${totalMoney}`);
  }
 });

  // monster spawn
  monster = new Monster(-6, -8, 17);

  let stairs = new Stairs(-4.5, 6.75, 30.75, 0);
  let basementstairs = new Stairs(-4.5, 0, 30.75, 0);

  setTimeout(loop,100);
});

// =========================
// GAME LOOP
// =========================
function loop(){
  player.update();

  for (let i = 0; i < doors.length; i++) {
    doors[i].openDoor();
  }
  if(monster) monster.update();

  window.requestAnimationFrame(loop);
}

// =========================
// DISTANCE HELPER
// =========================
function distance(obj1,obj2){
  let x1 = obj1.object3D.position.x;
  let y1 = obj1.object3D.position.y;
  let z1 = obj1.object3D.position.z;

  let x2 = obj2.object3D.position.x;
  let y2 = obj2.object3D.position.y;
  let z2 = obj2.object3D.position.z;

  return Math.sqrt(
    Math.pow(x1-x2,2) +
    Math.pow(y1-y2,2) +
    Math.pow(z1-z2,2)
  );
}