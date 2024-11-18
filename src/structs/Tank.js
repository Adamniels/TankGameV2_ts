import { MapObjects } from "./MapObjects.js";
export class Tank extends MapObjects {
    // helper function checking if which_keys is a valid array med keybindings
    valid_which_keys_arr(which_keys) {
        if (which_keys.length != 4) {
            return false;
        }
        const singleLetterRegex = /^[a-z]$/;
        for (let i = 0; i < which_keys.length; i++) {
            if (!singleLetterRegex.test(which_keys[i])) {
                return false;
            }
        }
        // making a set which cannot contain dublicates, therfore the length will not be the same of there is any
        const uniqueKeys = new Set(which_keys);
        if (uniqueKeys.size !== which_keys.length) {
            return false; // Det finns dubbletter
        }
        return true;
    }
    constructor(id, pos_x, pos_y, height, width, which_keys) {
        super(id, pos_x, pos_y, height, width);
        this.keys = { up: false, down: false, left: false, right: false, primary: false };
        this.speed = 10;
        if (!this.valid_which_keys_arr(which_keys)) {
            throw new Error("not a valid keys array");
        }
        else {
            this.which_keys = which_keys;
        }
    }
    draw_tank(context) {
        if (context) {
            context.fillRect(this.getPosition().pos_x, this.getPosition().pos_y, this.getSize().width, this.getSize().height);
        }
    }
    // TODO: måste kolla om jag intersects med någon annan så denna måste ta in worldmap och kolla med alla object om
    //       nästa position intersects
    update_tank(canvas) {
        if (this.keys.up) {
            if (!(this.getPosition().pos_y - this.speed < 0)) {
                this.getPosition().pos_y -= this.speed;
            }
        }
        else if (this.keys.down) {
            if (!(this.getPosition().pos_y + this.getSize().height + this.speed > canvas.height)) {
                this.getPosition().pos_y += this.speed;
            }
        }
        else if (this.keys.left) {
            if (!(this.getPosition().pos_x - this.speed < 0)) {
                this.getPosition().pos_x -= this.speed;
            }
        }
        else if (this.keys.right) {
            if (!(this.getPosition().pos_x + this.getSize().width + this.speed > canvas.width)) {
                this.getPosition().pos_x += this.speed;
            }
        }
    }
    handleKeyDown(event) {
        if (this.which_keys.includes(event.key)) {
            this.keys.up = event.key === this.which_keys[0];
            this.keys.down = event.key === this.which_keys[1];
            this.keys.left = event.key === this.which_keys[2];
            this.keys.right = event.key === this.which_keys[3];
        }
        if (event.key === "q") {
            if (this.keys.primary) {
                return;
            }
        }
    }
    handleKeyUp(event) {
        if (event.key === this.which_keys[0]) {
            this.keys.up = false;
        }
        if (event.key === this.which_keys[1]) {
            this.keys.down = false;
        }
        if (event.key === this.which_keys[2]) {
            this.keys.left = false;
        }
        if (event.key === this.which_keys[3]) {
            this.keys.right = false;
        }
        if (event.key === "q") {
            this.keys.primary = false;
        }
    }
}
