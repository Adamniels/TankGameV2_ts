type Position = {
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

    public getId(): number{
        return this.id;
    }

    public getPosition(): Position{
        return this.position;
    }

    public objects_intersects(other: MapObjects): boolean{
        // TODO:
        return false;

    }
    
}