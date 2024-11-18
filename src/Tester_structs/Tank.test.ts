import { Tank } from '../structs/Tank';

test('Test initilazing the tank', () => {
    const tank = new Tank(0, 50, 50, 50, 50, ["w", "s", "a", "d"]);


    const create_invalid_tank_dublicates = () => {
        new Tank(1, 50, 50, 50, 50, ["w", "a", "s", "s"]); // Dubbletter
    };
    expect(create_invalid_tank_dublicates).toThrow("not a valid keys array")

    const create_invalid_tank_too_many = () => {
        new Tank(2, 50, 50, 50, 50, ["a", "b", "c", "d", "e"])
    };
    expect(create_invalid_tank_too_many).toThrow("not a valid keys array")

    const create_invalid_tank_not_a_letter = () => {
        new Tank(3, 50, 50, 50, 50, ["a", "b", "c", "2"])
    }
    expect(create_invalid_tank_not_a_letter).toThrow("not a valid keys array")
});

