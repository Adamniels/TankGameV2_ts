export class WorldMap {
    constructor() {
        // Tänkt att den kan innehålla en lista med alla objects på banan
        this.allObjects = [];
        this.canvas = document.querySelector("#canvas");
        if (!this.canvas) {
            throw new Error('Canvas element not found');
        }
        this.context = this.canvas.getContext('2d');
        if (!this.context) {
            throw new Error('2D context could not be created');
        }
    }
    // Metod för att ändra storlek på canvas
    resizeCanvas(height, width) {
        this.canvas.width = width;
        this.canvas.height = height;
    }
    // Offentlig metod för att få tillgång till context
    getContext() {
        return this.context;
    }
    // Offentlig metod för att få tillgång till canvas
    getCanvas() {
        return this.canvas;
    }
    getAllObjects() {
        return this.allObjects;
    }
    addMapObject(mapObject) {
        this.allObjects.push(mapObject);
    }
}
