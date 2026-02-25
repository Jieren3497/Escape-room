class Building{
    constructor(x,y,z){
        this.obj = document.createElement("a-entity");

        let frontwall = document.createElement("a-box");
        frontwall.setAttribute("width", 30);
        frontwall.setAttribute("height", 20);
        frontwall.setAttribute("depth", 0.2);
        frontwall.setAttribute("position", {x:0, y:7.5, z:-14.9});
        this.obj.append( frontwall );

        let rightwall = document.createElement("a-box");
        rightwall.setAttribute("width", 30);
        rightwall.setAttribute("height", 20);
        rightwall.setAttribute("depth", 0.2);
        rightwall.setAttribute("rotation", {x:0, y:90, z:0});
        rightwall.setAttribute("position", {x:14.9, y:7.5, z:0});
        this.obj.append( rightwall );

        let leftwall = document.createElement("a-box");
        leftwall.setAttribute("width", 30);
        leftwall.setAttribute("height", 20);
        leftwall.setAttribute("depth", 0.2);
        leftwall.setAttribute("rotation", {x:0,y:-90,z:0})
        leftwall.setAttribute("position", {x:-14.9, y:7.5, z:0});
        this.obj.append( leftwall );

        let backwall = document.createElement("a-box");
        backwall.setAttribute("width", 30);
        backwall.setAttribute("height", 20);
        backwall.setAttribute("depth", 0.2);
        backwall.setAttribute("rotation", {x:0, y:0, z:0});
        backwall.setAttribute("position", {x:0, y:7.5, z:14.9});
        this.obj.append( backwall );

        this.obj.setAttribute("position",{x:x, y:y, z:z});
        this.obj.setAttribute("static-body", "");
        scene.append( this.obj );
    }
}