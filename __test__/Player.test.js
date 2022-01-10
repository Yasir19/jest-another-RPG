const { toBindingIdentifierName } = require('@babel/types');
const { expect } = require('@jest/globals');
const Player = require ('../lib/Player');
test ('create a player object',() => {
    const player = new Player('Yasir');
    expect(player.name).toBe('Yasir');
    expect(player.health).toEqual(expect.any(Number));
    expect(player.strength).toEqual(expect.any(Number));
    expect(player.potion).toEqual(expect.any(Number));
});