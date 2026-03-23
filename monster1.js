class Monster {
  constructor(x, y, z) {
    this.obj = document.createElement("a-entity");
    this.obj.setAttribute("gltf-model", "#monsterModel");
    this.obj.setAttribute("scale", "2.5 2.5 2.5");
    this.obj.setAttribute("position", { x, y, z });
    scene.append(this.obj);

    // SPEEDS
    this.patrolSpeed = 0.06;
    this.chaseSpeed = 0.12;
    this.speed = this.patrolSpeed;

    // STATE
    this.mode = "patrol";

    this.currentNode = null;
    this.targetNode = null;
    this.target = null;
    this.path = [];

    // CHASE SETTINGS
    this.chaseRange = 18;
    this.stopChaseRange = 25;

    setTimeout(() => {
      this.currentNode = this.findClosestNode();
      this.pickRandomTarget();
    }, 500);
  }

  // =========================
  // NODE HELPERS
  // =========================
  findClosestNode() {
    const pos = this.obj.object3D.position;
    let closest = null, minDist = Infinity;

    waypoints.forEach(w => {
      const d = pos.distanceTo(w.pos);
      if (d < minDist) {
        minDist = d;
        closest = w;
      }
    });

    return closest;
  }

  findClosestNodeToPos(worldPos) {
    let closest = null, minDist = Infinity;

    waypoints.forEach(w => {
      const d = worldPos.distanceTo(w.pos);
      if (d < minDist) {
        minDist = d;
        closest = w;
      }
    });

    return closest;
  }

  // =========================
  // BFS PATHFINDING
  // =========================
  bfs(start, goal) {
    if (!start || !goal) return [];
    if (start === goal) return [start];

    const visited = new Set();
    const queue = [[start]];
    visited.add(start);

    while (queue.length > 0) {
      const path = queue.shift();
      const node = path[path.length - 1];

      for (const neighbor of getNeighbors(node)) {
        if (visited.has(neighbor)) continue;

        visited.add(neighbor);
        const newPath = [...path, neighbor];

        if (neighbor === goal) return newPath;

        queue.push(newPath);
      }
    }

    return [];
  }

  // =========================
  // PATROL
  // =========================
  pickRandomTarget() {
    if (!this.currentNode) return;

    let neighbors = getNeighbors(this.currentNode);

    // 🔥 SAFETY FIX
    if (neighbors.length === 0) {
      setTimeout(() => this.pickRandomTarget(), 500);
      return;
    }

    let next = neighbors[Math.floor(Math.random() * neighbors.length)];

    this.targetNode = next;
    this.target = next.pos.clone();
  }

  // =========================
  // CHASE
  // =========================
  repathToPlayer() {
    if (!this.currentNode || !player) return;

    const playerPos = player.obj.object3D.position;
    const playerNode = this.findClosestNodeToPos(playerPos);

    this.path = this.bfs(this.currentNode, playerNode);

    if (this.path.length > 0 && this.path[0] === this.currentNode) {
      this.path.shift();
    }

    // 🔥 SAFETY FIX
    if (this.path.length === 0) {
      setTimeout(() => this.repathToPlayer(), 500);
      return;
    }

    this.targetNode = this.path.shift();
    this.target = this.targetNode.pos.clone();
  }

  // =========================
  // MODE SWITCH
  // =========================
  updateMode() {
    let d = distance(this.obj, player.driver);

    if (this.mode === "patrol" && d < this.chaseRange) {
      this.mode = "chase";
      this.speed = this.chaseSpeed;
      this.repathToPlayer();
    }
    else if (this.mode === "chase" && d > this.stopChaseRange) {
      this.mode = "patrol";
      this.speed = this.patrolSpeed;
      this.pickRandomTarget();
    }
  }

  // =========================
  // UPDATE LOOP
  // =========================
  update() {
    this.updateMode();

    // 🔥 SAFETY: always recover if stuck
    if (!this.target && this.currentNode) {
      if (this.mode === "chase") {
        this.repathToPlayer();
      } else {
        this.pickRandomTarget();
      }
      return;
    }

    if (!this.target || !this.currentNode) return;

    const pos = this.obj.object3D.position;

    let dx = this.target.x - pos.x;
    let dy = this.target.y - pos.y;
    let dz = this.target.z - pos.z;

    let dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

    // =========================
    // SNAP TO NODE
    // =========================
    if (dist < 0.3) {
      pos.copy(this.target);

      if (this.targetNode) {
        this.currentNode = this.targetNode;
      }

      this.targetNode = null;
      this.target = null;

      // 🔥 ALWAYS CONTINUE
      if (this.mode === "chase") {
        this.repathToPlayer();
      } else {
        this.pickRandomTarget();
      }

      return;
    }

    // =========================
    // MOVE
    // =========================
    let dir = new THREE.Vector3(dx, dy, dz);
    dir.normalize();
    dir.multiplyScalar(this.speed);

    pos.x += dir.x;
    pos.y += dir.y;
    pos.z += dir.z;

    // =========================
    // ROTATE
    // =========================
    if (dx !== 0 || dz !== 0) {
      this.obj.object3D.rotation.y = Math.atan2(dx, dz);
    }
  }
}