import { MapObjects } from "./MapObjects.js"; // behöver ta borrt .js när jag testa??
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
    constructor(image, id, pos_x, pos_y, height, width, which_keys) {
        super(id, pos_x, pos_y, height, width);
        this.keys = { up: false, down: false, left: false, right: false, primary: false };
        this.speed = 10;
        this.direction = "up";
        this.image = image;
        if (!this.valid_which_keys_arr(which_keys)) {
            throw new Error("not a valid keys array");
        }
        else {
            this.which_keys = which_keys;
        }
    }
    getDirectionAngle() {
        switch (this.direction) {
            case "right":
                return 0;
            case "down":
                return Math.PI / 2;
            case "left":
                return Math.PI;
            case "up":
                return (3 * Math.PI) / 2;
            default:
                throw new Error("Invalid direction");
        }
    }
    draw_tank(worldMap) {
        const context = worldMap.getContext();
        if (context) {
            context.fillStyle = this.image;
            context.fillRect(this.getPosition().pos_x, this.getPosition().pos_y, this.getSize().width, this.getSize().height);
            // Rita pilen från tankens mittpunkt
            const arrowStartX = this.getPosition().pos_x + this.getSize().width / 2; // Startpunkt X (centrum av tanken)
            const arrowStartY = this.getPosition().pos_y + this.getSize().height / 2; // Startpunkt Y (centrum av tanken)
            // Pilen ska vara lite längre än tankens storlek
            const arrowLength = Math.max(this.getSize().width, this.getSize().height) * 0.5; // Dynamisk längd baserat på tankens storlek
            // Bestäm riktningen (vinkeln) för pilen
            const angle = this.getDirectionAngle(); // Returnerar riktningen i radianer (0, π/2, π, 3π/2)
            // Beräkna pilens slutpunkt baserat på riktningen
            const arrowEndX = arrowStartX + Math.cos(angle) * arrowLength;
            const arrowEndY = arrowStartY + Math.sin(angle) * arrowLength;
            // Rita linjen (pilen)
            context.beginPath();
            context.moveTo(arrowStartX, arrowStartY); // Startpunkten
            context.lineTo(arrowEndX, arrowEndY); // Slutpunkten
            context.strokeStyle = "red"; // Pilens färg
            context.lineWidth = 2; // Pilens tjocklek
            context.stroke();
            // Rita pilhuvudet
            const arrowHeadLength = 10; // Längden på pilhuvudet
            context.beginPath();
            context.moveTo(arrowEndX, arrowEndY);
            context.lineTo(arrowEndX - arrowHeadLength * Math.cos(angle - Math.PI / 6), arrowEndY - arrowHeadLength * Math.sin(angle - Math.PI / 6));
            context.lineTo(arrowEndX - arrowHeadLength * Math.cos(angle + Math.PI / 6), arrowEndY - arrowHeadLength * Math.sin(angle + Math.PI / 6));
            context.lineTo(arrowEndX, arrowEndY);
            context.fillStyle = "red"; // Pilhuvudets färg
            context.fill();
        }
    }
    // TODO: måste kolla om jag intersects med någon annan så denna måste ta in worldmap och kolla med alla object om
    //       nästa position intersects
    update_tank(worldMap) {
        const canvas = worldMap.getCanvas();
        // make a dummy postion depending on what key is pressed then set the new position last
        let new_pos_x = this.getPosition().pos_x;
        let new_pos_y = this.getPosition().pos_y;
        let new_direction = this.direction;
        if (this.keys.up) {
            if (!(this.getPosition().pos_y - this.speed < 0)) {
                new_pos_y -= this.speed;
                new_direction = "up";
            }
        }
        else if (this.keys.down) {
            if (!(this.getPosition().pos_y + this.getSize().height + this.speed > canvas.height)) {
                new_pos_y += this.speed;
                new_direction = "down";
            }
        }
        else if (this.keys.left) {
            if (!(this.getPosition().pos_x - this.speed < 0)) {
                new_pos_x -= this.speed;
                new_direction = "left";
            }
        }
        else if (this.keys.right) {
            if (!(this.getPosition().pos_x + this.getSize().width + this.speed > canvas.width)) {
                new_pos_x += this.speed;
                new_direction = "right";
            }
        }
        // check if the dummy position intersects with any other object on the map, otherwise set the new position
        let newPos = new MapObjects(this.getId(), new_pos_x, new_pos_y, this.getSize().height, this.getSize().width);
        for (const mapObject of worldMap.getAllObjects()) {
            if (this != mapObject && mapObject.objects_intersects(newPos)) {
                // intersect with another object, do nothing
                return;
            }
        }
        this.setPosition(new_pos_x, new_pos_y);
        this.direction = new_direction;
    }
    //private rotateTank()
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
    /////////// For testing ///////////////
    setKeysToTrue(direction) {
        if (direction === "up") {
            this.keys.up = true;
        }
        else if (direction === "down") {
            this.keys.down = true;
        }
        else if (direction === "left") {
            this.keys.left = true;
        }
        else if (direction === "right") {
            this.keys.right = true;
        }
    }
    restoreKeys() {
        this.keys.up = false;
        this.keys.down = false;
        this.keys.left = false;
        this.keys.right = false;
    }
}
