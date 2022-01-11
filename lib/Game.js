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

    Game.prototype.battle = function () {
        if (this.isPlayerTurn){
                   inquirer
                     .prompt({
                         type:'list',
                         message: 'choose your move!',
                         name: 'action',
                         choices:['Attack', 'Use potion']
                     })
                     .then(({action})=>{
                         if (action === 'Use potion'){
                             if (!this.player.getInventory()){
                                 console.log("You don't have any potions!");
                                 return;
                             }
                             inquirer
                                .prompt({
                                    type:'list',
                                    meassage: 'choose an items you like to use?',
                                    name:'action',
                                    choices:this.player.getInventory().map((item, index) => `${index+1}: ${item.name}`)
                                })
                                .then(({action})=>{
                                    const potionDetails = action.split(': ');

                                    this.player.usePotion(potionDetails[0] - 1);
                                    console.log(`You used a ${potionDetails[1]} potion.`);
                                })
                         }else{
                             const damage = this.player.getAttackValue();
                             this.currentEnemy.reduceHealth(damage);
        
                             console.log(` tou attacked the ${this.currentEnemy.name}`);
                             console.log(this.currentEnemy.getHealth());
                         }
                     });
        }else {
            const damage = this.currentEnemy.getAttackValue();
            this.player.reduceHealth(damage);

            console.log(`You were attacked by the ${this.currentEnemy.name}`);
            console.log(this.player.getHealth());
        }
    }
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