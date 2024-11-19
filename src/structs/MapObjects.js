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
    setPosition(postion) {
        this.position = postion;
    }
    objects_intersects(other) {
        // TODO:
        return false;
    }
}
