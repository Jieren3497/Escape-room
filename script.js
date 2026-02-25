let rnd = (l,u) => Math.random() * (u-l) + l;
let scene;

window.addEventListener("DOMContentLoaded",function() {
  scene = document.querySelector("a-scene");
  camera = document.querySelector("a-camera");

  let stairs = new Stairs(-4.5, 10, 31, 0);
  
})