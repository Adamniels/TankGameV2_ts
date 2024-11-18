import { MapObjects } from "./MapObjects";

export class WorldMap{
    private canvas: HTMLCanvasElement;
    private context: CanvasRenderingContext2D;
    // Tänkt att den kan innehålla en lista med alla objects på banan
    private allObjects: Array<MapObjects> = []; 

    constructor(){
        this.canvas = document.querySelector("#canvas") as HTMLCanvasElement;
        if (!this.canvas) {
            throw new Error('Canvas element not found');
        }

        this.context = this.canvas.getContext('2d') as CanvasRenderingContext2D;
        if (!this.context) {
            throw new Error('2D context could not be created')
        }
    }

    // Metod för att ändra storlek på canvas
    public resizeCanvas(height: number, width: number): void {
        this.canvas.width = width;
        this.canvas.height = height;
    }

    // Offentlig metod för att få tillgång till context
    public getContext(): CanvasRenderingContext2D {
        return this.context;
    }

    // Offentlig metod för att få tillgång till canvas
    public getCanvas(): HTMLCanvasElement {
        return this.canvas;
    }

    public getAllObjects(): Array<MapObjects> {
        return this.allObjects;
    }

    public addMapObject(mapObject: MapObjects): void {
        this.allObjects.push(mapObject)
    }
}