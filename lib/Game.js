const inquirer = require('inquirer');
const Enemy = require('../lib/Enemy');
const Player = require('../lib/Player');

function Game(){
    this.roundNumber = 0;
    this.isPlayerTurn = false;
    this.enemies =[];
    this.currentEnemy;
    this.player;
}

Game.prototype.initializeGame = function(){
this.enemies.push(new Enemy('goblin','sword'));
this.enemies.push(new Enemy('orc','Javelin'));
this.enemies.push(new Enemy('agares','raven fire knife'));
this.currentEnemy = this.enemies[0];
Game.prototype.startNewBattle = function() {
    if (this.player.agility > this.currentEnemy.agility){
        this.isPlayerTurn = true;
    }else{
        this.isPlayerTurn = false;
    }
    console.log('Your stats are as follows:');
    console.table(this.player.getStats());
    console.log(this.currentEnemy.getDescription());
};


inquirer
  .prompt({
      type: 'text',
      name: 'name',
      message: 'What is your character name?'
  })
  // destructure name from the prompt object
  .then ((name)=>{
      this.player = new Player(name);

      this.startNewBattle()
  })
}
module.exports = Game;