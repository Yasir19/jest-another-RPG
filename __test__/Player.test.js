const Potion =require ('../lib/Potion');
jest.mock('../lib/Potion');
console.log(new Potion());
const Player = require ('../lib/Player');
test ('create a player object',() => {
    const player = new Player('Yasir');
    expect(player.name).toBe('Yasir');
    expect(player.health).toEqual(expect.any(Number));
    expect(player.strength).toEqual(expect.any(Number));
    expect(player.agility).toEqual(expect.any(Number));
    expect(player.inventory).toEqual(
        expect.arrayContaining([expect.any(Object)]));
});
test ("gets player's stats as an object", ()=>{
    const player = new Player('Yasir');

    expect(player.getStats()).toHaveProperty('potions');
    expect(player.getStats()).toHaveProperty('health');
    expect(player.getStats()).toHaveProperty('strength');
    expect(player.getStats()).toHaveProperty('agility');

});
test('get inventory from player or return false',()=>{
    const player = new Player('Yasir');
    expect(player.getInventory()).toEqual(expect.any(Array));
    player.inventory = [];
    expect(player.getInventory()).toEqual(false);
});
test("gets player's health value", ()=>{
    const player = new Player ('Yasir');

    expect(player.getHelath()).toEqual(expect.stringContaining(player.health.toString()));
});
test('check if player is alive or not',() =>{
    const player = new Player('Yasir');
    expect(player.isAlive()).toBeTruthy();
    player.health = 0;
    expect(player.isAlive()).toBeFalsy();
})
test("subtracts from player's health",() =>{
    const player = new Player ('Yasir')
    const oldHealth = player.health;
    player.reduceHealth(5);
    expect(player.health).toBe(oldHealth - 5);
    player.reduceHealth(9999);
    expect(player.health).toBe(0);
})