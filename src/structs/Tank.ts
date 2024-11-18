import { MapObjects } from "./MapObjects.js";


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


export class Tank extends MapObjects{
    private keys: Keys = { up: false, down: false, left: false, right: false, primary: false };
    private which_keys: Array<string>;
    private speed: number = 10;

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

    constructor(id: number, pos_x: number, pos_y: number, height: number, width: number, which_keys:Array<string>){
        super(id, pos_x, pos_y, height, width);


        if(!this.valid_which_keys_arr(which_keys)){
            throw new Error("not a valid keys array")
        }else{
            this.which_keys = which_keys;
        }
        
    }
    

    public draw_tank(context: CanvasRenderingContext2D){
        if (context) {
            context.fillRect(this.getPosition().pos_x, this.getPosition().pos_y, this.getSize().width, this.getSize().height);
        }
    }
    
    // TODO: måste kolla om jag intersects med någon annan så denna måste ta in worldmap och kolla med alla object om
    //       nästa position intersects

    public update_tank(canvas: HTMLCanvasElement){
        if(this.keys.up){
            if(!(this.getPosition().pos_y - this.speed < 0)){
                this.getPosition().pos_y -= this.speed;
            }
        }else if(this.keys.down){
            if(!(this.getPosition().pos_y + this.getSize().height + this.speed > canvas.height)){
                this.getPosition().pos_y += this.speed;
            }
        }else if(this.keys.left){
            if(!(this.getPosition().pos_x - this.speed < 0)){
                this.getPosition().pos_x -= this.speed;
            }
        }else if(this.keys.right){
            if(!(this.getPosition().pos_x + this.getSize().width + this.speed > canvas.width)){
                this.getPosition().pos_x += this.speed;
            }
        }

    }



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
}