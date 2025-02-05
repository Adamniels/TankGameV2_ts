import { WorldMap } from "./WorldMap";

export type Position = {
    pos_x: number,
    pos_y: number,
}
type Size = {
    height: number;
    width: number;
}

export class MapObjects{
    // TODO: flytta ut saker hit
    private id: number;
    private size: Size;
    private position: Position;


    constructor(id:number, pos_x: number, pos_y: number, height: number, width: number){
        this.id = id;
        this.position = {pos_x, pos_y};
        this.size = {height, width};
        // TODO: göra alla tester för valid data
    }

    public getSize(): Size{
        return this.size;
    }
    public setSize(width: number, height: number){
        this.size = {height, width};
    }

    public getId(): number{
        return this.id;
    }

    public getPosition(): Position{
        return this.position;
    }

    public setPosition(pos_x: number, pos_y: number){
        this.position = {pos_x, pos_y};
    }

    public objects_intersects(mapObject: MapObjects): boolean{

        const noOverlap = 
        this.position.pos_x + this.size.width <= mapObject.position.pos_x ||  // rect1 till vänster om rect2
        mapObject.position.pos_x + mapObject.size.width <= this.position.pos_x || // rect2 till vänster om rect1
        this.position.pos_y + this.size.height <= mapObject.position.pos_y || // rect1 ovanför rect2
        mapObject.position.pos_y + mapObject.size.height <= this.position.pos_y;  // rect2 ovanför rect1
    
    return !noOverlap;
    }

    
}