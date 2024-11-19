export class MapObjects {
    constructor(id, pos_x, pos_y, height, width) {
        this.id = id;
        this.position = { pos_x, pos_y };
        this.size = { height, width };
        // TODO: göra alla tester för valid data
    }
    getSize() {
        return this.size;
    }
    getId() {
        return this.id;
    }
    getPosition() {
        return this.position;
    }
    setPosition(pos_x, pos_y) {
        this.position = { pos_x, pos_y };
    }
    objects_intersects(mapObject) {
        const noOverlap = this.position.pos_x + this.size.width <= mapObject.position.pos_x || // rect1 till vänster om rect2
            mapObject.position.pos_x + mapObject.size.width <= this.position.pos_x || // rect2 till vänster om rect1
            this.position.pos_y + this.size.height <= mapObject.position.pos_y || // rect1 ovanför rect2
            mapObject.position.pos_y + mapObject.size.height <= this.position.pos_y; // rect2 ovanför rect1
        return !noOverlap;
    }
}
