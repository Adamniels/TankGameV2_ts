import { MapObjects, Position } from "./MapObjects.js"; // behöver ta borrt .js när jag testa??
import { WorldMap } from "./WorldMap.js";


/***
 * A type representing the keys that are pressed with the help of a boolean
 * @param up - if the up key is pressed
 * @param down - if the down key is pressed
 * @param left - if the left key is pressed
 * @param right - if the right key is pressed
 * @param primary - if the "primary fire" is pressed
 * @invariant each param must be set to false in the beginning
 * @invariant no more than one can be true at a time
 */
type Keys = {
    up: boolean,
    down: boolean,
    left: boolean,
    right: boolean,
    primary: boolean
};

type Direction =  "up" | "down" | "left" | "right";

 


export class Tank extends MapObjects{
    private keys: Keys = { up: false, down: false, left: false, right: false, primary: false };
    private which_keys: Array<string>;
    private speed: number = 10;
    private direction: Direction = "up";
    private image;

    // helper function checking if which_keys is a valid array med keybindings
    private valid_which_keys_arr(which_keys:Array<string>): boolean{
        if(which_keys.length != 4){
            return false;
        }
        const singleLetterRegex = /^[a-z]$/;

        for (let i: number = 0; i < which_keys.length; i++) {
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

    constructor(image: string, id: number, pos_x: number, pos_y: number, height: number, width: number, which_keys:Array<string>){
        super(id, pos_x, pos_y, height, width);

        this.image = image;

        if(!this.valid_which_keys_arr(which_keys)){
            throw new Error("not a valid keys array")
        }else{
            this.which_keys = which_keys;
        }
        
    }
    
    private getDirectionAngle(): number {
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

    public draw_tank(worldMap: WorldMap){
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
            context.lineTo(
                arrowEndX - arrowHeadLength * Math.cos(angle - Math.PI / 6),
                arrowEndY - arrowHeadLength * Math.sin(angle - Math.PI / 6)
            );
            context.lineTo(
                arrowEndX - arrowHeadLength * Math.cos(angle + Math.PI / 6),
                arrowEndY - arrowHeadLength * Math.sin(angle + Math.PI / 6)
            );
            context.lineTo(arrowEndX, arrowEndY);
            context.fillStyle = "red"; // Pilhuvudets färg
            context.fill();
        }

    }
    
    // TODO: måste kolla om jag intersects med någon annan så denna måste ta in worldmap och kolla med alla object om
    //       nästa position intersects

    public update_tank(worldMap: WorldMap){
  
        const canvas = worldMap.getCanvas();

        // make a dummy postion depending on what key is pressed then set the new position last
        let new_pos_x = this.getPosition().pos_x
        let new_pos_y = this.getPosition().pos_y
        let new_direction: Direction = this.direction;

        if(this.keys.up){
            if(!(this.getPosition().pos_y - this.speed < 0)){
                new_direction = "up";
            }
        }else if(this.keys.down){
            if(!(this.getPosition().pos_y + this.getSize().height + this.speed > canvas.height)){
                new_direction = "down";
            }
        }else if(this.keys.left){
            if(!(this.getPosition().pos_x - this.speed < 0)){
                new_direction = "left";
            }
        }else if(this.keys.right){
            if(!(this.getPosition().pos_x + this.getSize().width + this.speed > canvas.width)){
                new_direction = "right";
            }
        }

        let new_width = this.getSize().width;
        let new_height = this.getSize().height;
        if((this.direction === "left" || this.direction === "right") && (new_direction === "up" || new_direction === "down")){
            // should go from horizontal to vertical
            let temp = new_width;
            new_width = new_height;
            new_height = temp;

            // fix so it rotatates around the middle not the top left corner
            new_pos_x = new_pos_x - (new_width - new_height) / 2;
            new_pos_y = new_pos_y + (new_width - new_height) / 2;

        }else if((this.direction === "up" || this.direction === "down") && (new_direction === "left" || new_direction === "right")){
            // from vertical to horizontal
            let temp = new_width;
            new_width = new_height;
            new_height = temp;

            // fix so it rotatates around the middle not the top left corner
            new_pos_x = new_pos_x - (new_width - new_height) / 2;
            new_pos_y = new_pos_y + (new_width - new_height) / 2;
        }

        if(this.keys.up){
            if(!(new_pos_y - this.speed < 0)){
                new_pos_y -= this.speed;
            }
        }else if(this.keys.down){
            if(!(new_pos_y + new_height + this.speed > canvas.height)){
                new_pos_y += this.speed;
            }
        }else if(this.keys.left){
            if(!(new_pos_x - this.speed < 0)){
                new_pos_x -= this.speed;
            }
        }else if(this.keys.right){
            if(!(new_pos_x + new_width + this.speed > canvas.width)){
                new_pos_x += this.speed;
            }
        }

        // check if the dummy position intersects with any other object on the map, otherwise set the new position
        let newPos = new MapObjects(this.getId(), new_pos_x, new_pos_y, new_height, new_width);
        for (const mapObject of worldMap.getAllObjects()) {
            if (this != mapObject && mapObject.objects_intersects(newPos)) {
                // intersect with another object
                // TODO: but how much forward can i go, i want to go as much forward as possible
                // TODO: or how can i make the rotation possible
                // TODO: do i need to add something to the tank, might be easier to add a mode vertical | horizontal
                return;
            }
        }
        this.setPosition(new_pos_x, new_pos_y);
        this.setSize(new_width, new_height);
        this.direction = new_direction;
    }
    
    //private rotateTank()



    public handleKeyDown(event: KeyboardEvent): void {   
        
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
    public handleKeyUp(event: KeyboardEvent): void {
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
    public setKeysToTrue(direction: string){
        if(direction === "up"){
            this.keys.up = true;
        }else if(direction === "down"){
            this.keys.down = true;
        }else if(direction === "left"){
            this.keys.left = true;
        }else if(direction === "right"){
            this.keys.right = true;
        }
    }
    public restoreKeys(){
        this.keys.up = false;
        this.keys.down = false;
        this.keys.left = false;
        this.keys.right = false;
    }
}