import { Tank } from '../structs/Tank';
import { WorldMap } from '../structs/WorldMap';
import { MapObjects } from '../structs/MapObjects';

describe('Tank Initialization', () => {
    it('should initialize a tank with valid parameters', () => {
        const tank = new Tank("white", 0, 50, 50, 50, 50, ["w", "s", "a", "d"]);
        expect(tank).toBeDefined(); // Ensure the tank is successfully created
    });

    it('should throw an error for duplicate keys', () => {
        const createInvalidTank = () => {
            new Tank("white", 1, 50, 50, 50, 50, ["w", "a", "s", "s"]); // Duplicates
        };
        expect(createInvalidTank).toThrow("not a valid keys array");
    });

    it('should throw an error for too many keys', () => {
        const createInvalidTank = () => {
            new Tank("white", 2, 50, 50, 50, 50, ["a", "b", "c", "d", "e"]); // Too many keys
        };
        expect(createInvalidTank).toThrow("not a valid keys array");
    });

    it('should throw an error for invalid key characters', () => {
        const createInvalidTank = () => {
            new Tank("white", 3, 50, 50, 50, 50, ["a", "b", "c", "2"]); // Invalid key
        };
        expect(createInvalidTank).toThrow("not a valid keys array");
    });
});


describe('Tank Movement', () => {
    let tank: Tank;
    let mockWorldMap: jest.Mocked<WorldMap>;

    beforeEach(() => {
        // Mock the WorldMap
        mockWorldMap = {
            getCanvas: jest.fn().mockReturnValue({
                width: 500,
                height: 500,
            }),
            getAllObjects: jest.fn().mockReturnValue([]),
        } as unknown as jest.Mocked<WorldMap>;

        // Initialize the tank with a mock position and size
       tank = new Tank("black", 1, 100, 100, 50, 50, ["w", "a", "s", "d"]);
    });

    it('should move up when the up key is pressed', () => {
        // Simulate pressing the up key
        tank.setKeysToTrue("up");

        // Update tank position
        tank.update_tank(mockWorldMap);

        // Assert that the tank moved up
        expect(tank.getPosition().pos_y).toBe(90); // Initial y = 100, speed = 10
        expect(tank.getPosition().pos_x).toBe(100); // x position should remain the same
    });

    it('should not move up if at the top edge of the canvas', () => {
        // Place the tank at the top edge
        tank.setPosition(100, 0);

        // Simulate pressing the up key
        tank.setKeysToTrue("up");

        // Update tank position
        tank.update_tank(mockWorldMap);

        // Assert that the tank does not move
        expect(tank.getPosition().pos_y).toBe(0);
    });

    it('should move down when the down key is pressed', () => {
        // Simulate pressing the down key
        tank.setKeysToTrue("down");
        // Update tank position
        tank.update_tank(mockWorldMap);

        // Assert that the tank moved down
        expect(tank.getPosition().pos_y).toBe(110); // Initial y = 100, speed = 10
    });

    it('should collide with another object and not move', () => {
        // Mock an object in the world map
        const mockObject = new MapObjects(1, 100, 110, 50, 50); // Positioned to collide
        mockWorldMap.getAllObjects.mockReturnValue([mockObject]);

        // Simulate pressing the down key
        tank.setKeysToTrue("down");

        // Update tank position
        tank.update_tank(mockWorldMap);

        // Assert that the tank did not move
        expect(tank.getPosition().pos_y).toBe(100); // Position unchanged
    });
});