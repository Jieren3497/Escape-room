class Stairs{
    constructor(x,y,z, rotation){
        this.obj = document.createElement("a-entity");

        let stepone = document.createElement("a-box");
        stepone.setAttribute("width", 2.5);
        stepone.setAttribute("height", 0.25);
        stepone.setAttribute("depth", 0.5);
        stepone.setAttribute("position", {x:0.25, y:0.125, z:0});
        this.obj.append( stepone );

        let steptwo = document.createElement("a-box");
        steptwo.setAttribute("width", 2.5);
        steptwo.setAttribute("height", 0.5);
        steptwo.setAttribute("depth", 0.5);
        steptwo.setAttribute("position", {x:0.25, y:0.25, z:0.25});
        this.obj.append( steptwo );

        let stepthree = document.createElement("a-box");
        stepthree.setAttribute("width", 2.5);
        stepthree.setAttribute("height", 0.5);
        stepthree.setAttribute("depth", 0.5);
        stepthree.setAttribute("position", {x:0.25, y:0.5, z:0.5});
        this.obj.append( stepthree );

        let stepfour = document.createElement("a-box");
        stepfour.setAttribute("width", 2.5);
        stepfour.setAttribute("height", 0.5);
        stepfour.setAttribute("depth", 0.5);
        stepfour.setAttribute("position", {x:0.25, y:0.75, z:0.75});
        this.obj.append( stepfour );

        let stepfive = document.createElement("a-box");
        stepfive.setAttribute("width", 2.5);
        stepfive.setAttribute("height", 0.5);
        stepfive.setAttribute("depth", 0.5);
        stepfive.setAttribute("position", {x:0.25, y:1, z:1});
        this.obj.append( stepfive );

        let stepsix = document.createElement("a-box");
        stepsix.setAttribute("width", 2.5);
        stepsix.setAttribute("height", 0.5);
        stepsix.setAttribute("depth", 0.5);
        stepsix.setAttribute("position", {x:0.25, y:1.25, z:1.25});
        this.obj.append( stepsix );

        let stepseven = document.createElement("a-box");
        stepseven.setAttribute("width", 2.5);
        stepseven.setAttribute("height", 0.5);
        stepseven.setAttribute("depth", 0.5);
        stepseven.setAttribute("position", {x:0.25, y:1.5, z:1.5});
        this.obj.append( stepseven );

        let stepeight = document.createElement("a-box");
        stepeight.setAttribute("width", 2.5);
        stepeight.setAttribute("height", 0.5);
        stepeight.setAttribute("depth", 0.5);
        stepeight.setAttribute("position", {x:0.25, y:1.75, z:1.75});
        this.obj.append( stepeight );

        let stepnine = document.createElement("a-box");
        stepnine.setAttribute("width", 2.5);
        stepnine.setAttribute("height", 0.5);
        stepnine.setAttribute("depth", 0.5);
        stepnine.setAttribute("position", {x:0.25, y:2, z:2});
        this.obj.append( stepnine );

        let stepten = document.createElement("a-box");
        stepten.setAttribute("width", 2.5);
        stepten.setAttribute("height", 0.5);
        stepten.setAttribute("depth", 0.5);
        stepten.setAttribute("position", {x:0.25, y:2.25, z:2.25});
        this.obj.append( stepten );

        let stepeleven = document.createElement("a-box");
        stepeleven.setAttribute("width", 2.5);
        stepeleven.setAttribute("height", 0.5);
        stepeleven.setAttribute("depth", 0.5);
        stepeleven.setAttribute("position", {x:0.25, y:2.5, z:2.5});
        this.obj.append( stepeleven );

        let steptwelve = document.createElement("a-box");
        steptwelve.setAttribute("width", 2.5);
        steptwelve.setAttribute("height", 0.5);
        steptwelve.setAttribute("depth", 0.5);
        steptwelve.setAttribute("position", {x:0.25, y:2.75, z:2.75});
        this.obj.append( steptwelve );

        let stepthirteen = document.createElement("a-box");
        stepthirteen.setAttribute("width", 2.5);
        stepthirteen.setAttribute("height", 0.5);
        stepthirteen.setAttribute("depth", 0.5);
        stepthirteen.setAttribute("position", {x:0.25, y:3, z:3});
        this.obj.append( stepthirteen );

        let platform = document.createElement("a-box");
        platform.setAttribute("width", 7);
        platform.setAttribute("height", 0.25);
        platform.setAttribute("depth", 3);
        platform.setAttribute("position", {x:-2,y:3.13,z:4.5});
        this.obj.append( platform );

        let s1 = document.createElement("a-box");
        s1.setAttribute("width", 2.5);
        s1.setAttribute("height", 0.25);
        s1.setAttribute("depth", 0.5);
        s1.setAttribute("position", {x:-4.25, y:3.13, z:3});
        this.obj.append( s1 );

        let s2 = document.createElement("a-box");
        s2.setAttribute("width", 2.5);
        s2.setAttribute("height", 0.25);
        s2.setAttribute("depth", 0.5);
        s2.setAttribute("position", {x:-4.25, y:3.38, z:2.75});
        this.obj.append( s2 );

        let s3 = document.createElement("a-box");
        s3.setAttribute("width", 2.5);
        s3.setAttribute("height", 0.25);
        s3.setAttribute("depth", 0.5);
        s3.setAttribute("position", {x:-4.25, y:3.63, z:2.5});
        this.obj.append( s3 );

        let s4 = document.createElement("a-box");
        s4.setAttribute("width", 2.5);
        s4.setAttribute("height", 0.25);
        s4.setAttribute("depth", 0.5);
        s4.setAttribute("position", {x:-4.25, y:3.88, z:2.25});
        this.obj.append( s4 );

        let s5 = document.createElement("a-box");
        s5.setAttribute("width", 2.5);
        s5.setAttribute("height", 0.25);
        s5.setAttribute("depth", 0.5);
        s5.setAttribute("position", {x:-4.25, y:4.13, z:2});
        this.obj.append( s5 );

        let s6 = document.createElement("a-box");
        s6.setAttribute("width", 2.5);
        s6.setAttribute("height", 0.25);
        s6.setAttribute("depth", 0.5);
        s6.setAttribute("position", {x:-4.25, y:4.38, z:1.75});
        this.obj.append( s6 );

        let s7 = document.createElement("a-box");
        s7.setAttribute("width", 2.5);
        s7.setAttribute("height", 0.25);
        s7.setAttribute("depth", 0.5);
        s7.setAttribute("position", {x:-4.25, y:4.63, z:1.5});
        this.obj.append( s7 );

        let s8 = document.createElement("a-box");
        s8.setAttribute("width", 2.5);
        s8.setAttribute("height", 0.25);
        s8.setAttribute("depth", 0.5);
        s8.setAttribute("position", {x:-4.25, y:4.88, z:1.25});
        this.obj.append( s8 );

        let s9 = document.createElement("a-box");
        s9.setAttribute("width", 2.5);
        s9.setAttribute("height", 0.25);
        s9.setAttribute("depth", 0.5);
        s9.setAttribute("position", {x:-4.25, y:5.13, z:1});
        this.obj.append( s9 );

        let s10 = document.createElement("a-box");
        s10.setAttribute("width", 2.5);
        s10.setAttribute("height", 0.25);
        s10.setAttribute("depth", 0.5);
        s10.setAttribute("position", {x:-4.25, y:5.38, z:0.75});
        this.obj.append( s10 );

        let s11 = document.createElement("a-box");
        s11.setAttribute("width", 2.5);
        s11.setAttribute("height", 0.25);
        s11.setAttribute("depth", 0.5);
        s11.setAttribute("position", {x:-4.25, y:5.63, z:0.5});
        this.obj.append( s11 );

        let s12 = document.createElement("a-box");
        s12.setAttribute("width", 2.5);
        s12.setAttribute("height", 0.25);
        s12.setAttribute("depth", 0.5);
        s12.setAttribute("position", {x:-4.25, y:5.88, z:0.25});
        this.obj.append( s12 );

        let s13 = document.createElement("a-box");
        s13.setAttribute("width", 2.5);
        s13.setAttribute("height", 0.25);
        s13.setAttribute("depth", 0.5);
        s13.setAttribute("position", {x:-4.25, y:6.13, z:0});
        this.obj.append( s13 );

        this.obj.setAttribute("position", {x:x, y:y, z:z});
        this.obj.setAttribute("rotation", {x:0, y:rotation, z:0});
        // this.obj.setAttribute("rotation", {x:0, y:90,z:0});
        scene.append( this.obj );

    }
}