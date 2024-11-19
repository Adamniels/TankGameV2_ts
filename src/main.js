import { Tank } from "./structs/Tank.js";
import { WorldMap } from "./structs/WorldMap.js";
const debug_mode = true;
function debug(world_map) {
    let context = world_map.getContext();
    context.font = "30px Arial";
    context.fillStyle = "black";
    context.fillText("green square: ", 100, 900);
}
window.addEventListener('load', () => {
    const world_map = new WorldMap();
    //Resizing
    world_map.resizeCanvas(1000, 1200);
    let first_tank = new Tank("blue", 1, 50, 50, 100, 50, ["w", "s", "a", "d"]);
    let second_tank = new Tank("green", 1, 150, 150, 100, 50, ["i", "k", "j", "l"]);
    world_map.addMapObject(first_tank);
    world_map.addMapObject(second_tank);
    addEventListener("keydown", (event) => first_tank.handleKeyDown(event));
    addEventListener("keyup", (event) => first_tank.handleKeyUp(event));
    addEventListener("keydown", (event) => second_tank.handleKeyDown(event));
    addEventListener("keyup", (event) => second_tank.handleKeyUp(event));
    function animation_loop() {
        requestAnimationFrame(animation_loop);
        world_map.getContext().clearRect(0, 0, 1200, 1000);
        first_tank.update_tank(world_map);
        first_tank.draw_tank(world_map);
        second_tank.update_tank(world_map);
        second_tank.draw_tank(world_map);
        if (debug_mode) {
            debug(world_map);
        }
    }
    animation_loop();
});
