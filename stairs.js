class Stairs {
    constructor(x, y, z, rotation) {
        this.obj = document.createElement("a-entity");

        // Step 1
        let stepone = document.createElement("a-box");
        stepone.setAttribute("width", 2.5);
        stepone.setAttribute("height", 0.25);
        stepone.setAttribute("depth", 0.5);
        stepone.setAttribute("position", { x: 0.25, y: 0.125, z: 0 });
        stepone.setAttribute("material", "src: #black-slate; repeat: 2 2");
        this.obj.append(stepone);

        // Ascending steps
        for (let i = 0.25; i < 0.25 * 14; i += 0.25) {
            let steptwo = document.createElement("a-box");
            steptwo.setAttribute("static-body", "");
            steptwo.setAttribute("width", 2.5);
            steptwo.setAttribute("height", 0.5);
            steptwo.setAttribute("depth", 0.5);
            steptwo.setAttribute("position", { x: 0.25, y: i, z: i });
            steptwo.setAttribute("material", "src: #black-slate; repeat: 2 2");
            this.obj.append(steptwo);
        }

        // Platform
        let platform = document.createElement("a-box");
        platform.setAttribute("width", 7);
        platform.setAttribute("height", 0.25);
        platform.setAttribute("depth", 3);
        platform.setAttribute("position", { x: -2, y: 3.37, z: 4.75 });
        platform.setAttribute("static-body", "");
        platform.setAttribute("material", "src: #black-slate; repeat: 4 2");
        this.obj.append(platform);

        // Descending steps
        for (let i = 0; i < 0.25 * 14; i += 0.25) {
            let s1 = document.createElement("a-box");
            s1.setAttribute("width", 2.5);
            s1.setAttribute("static-body", "")
            s1.setAttribute("height", 0.25);
            s1.setAttribute("depth", 0.5);
            s1.setAttribute("position", { x: -4.25, y: 3.37 + i, z: 3.25 - i });
            s1.setAttribute("material", "src: #black-slate; repeat: 2 2");
            this.obj.append(s1);
        }

        // Position & rotation
        this.obj.setAttribute("position", { x: x, y: y, z: z });
        this.obj.setAttribute("rotation", { x: 0, y: rotation, z: 0 });

        scene.append(this.obj);
    }
}