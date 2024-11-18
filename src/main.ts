import { Tank } from "./structs/Tank.js";
import { WorldMap } from "./structs/WorldMap.js";

window.addEventListener('load', () =>{
    const world_map = new WorldMap();

    //Resizing
    world_map.resizeCanvas(1000, 1200);

    let first_tank: Tank = new Tank(1, 50, 50, 100, 50, ["w", "s", "a", "d"]);
    let second_tank: Tank = new Tank(1, 50, 50,  100, 50, ["i", "k", "j", "l"]);

    addEventListener("keydown", (event) => first_tank.handleKeyDown(event));
    addEventListener("keyup", (event) => first_tank.handleKeyUp(event));

    addEventListener("keydown", (event) => second_tank.handleKeyDown(event));
    addEventListener("keyup", (event) => second_tank.handleKeyUp(event));

    function animation_loop(): void{
        requestAnimationFrame(animation_loop);
        world_map.getContext().clearRect(0, 0, 1200, 1000);
        first_tank.update_tank(world_map.getCanvas());
        first_tank.draw_tank(world_map.getContext());
        second_tank.update_tank(world_map.getCanvas());
        second_tank.draw_tank(world_map.getContext());
    }
    animation_loop();
})
