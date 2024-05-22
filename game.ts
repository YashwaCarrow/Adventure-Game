#! /usr/bin/env node 

import inquirer from "inquirer"

import chalk from "chalk"

console.log(chalk.bold.bgBlueBright("\t\n   WELCOME TO Y4C5-ADVENTURE-GAME    \t\n"))

let playerHealth = 100;
let opponentHealth = 100;

function decreaseFuel(entity:string) {
 if (entity === "player") {
     playerHealth -= 32;
 } else {
      opponentHealth -= 28;
    }
}

function refillFuel() {
    playerHealth = 100;
}

async function startGame() {
 const player = await inquirer.prompt([
      {
      name: "name",
      type: "input",
      message: (chalk.cyan("Enter your Name Hero:")),
      }
 ]);

 const opponent = await inquirer.prompt([
       {
      name: "select",
      type: "list",
      message: (chalk.cyan("\tSELECT YOUR OPPONENT\n")),
            choices: [chalk.grey("Shadow Monarch"), chalk.cyanBright("The Dragon King"), chalk.magentaBright("Demon Lord"), chalk.red("Madara Uchiha")]
       }
]);

console.log(chalk.yellowBright(`The fierce batttle begins ${player.name} The Hero and ${opponent.select} Evil Mastermind`));

 while (true) {
  const answer = await inquirer.prompt([
         {
        name: "opt",
        type: "list",
        message: (chalk.cyan("\tSelect your option\n")),
       choices: [chalk.red("Go on a Rampage"), chalk.greenBright("Drink Elixir of Life"), chalk.blackBright("Escape")]
        }
 ]);

 if (answer.opt === chalk.red("Go on a Rampage")) {
 const num = Math.floor(Math.random() * 2);
if (num > 0) {
      decreaseFuel("player");
     console.log(`${player.name} your health is ${playerHealth}`);
     console.log(`${opponent.select} health is ${opponentHealth}`);

if (playerHealth <= 0) {
    console.log(chalk.bgRedBright("YOU LOSE,BETTER LUCK NEXT TIME MATE"))
    process.exit();
  }
  }
   else {
     decreaseFuel("opponent");
    console.log(`${player.name} health is ${playerHealth}`);
    console.log(`Your Opponent ${opponent.select}'s health is ${opponentHealth} keep advancing Hero`);

 if (opponentHealth <= 0) {
     console.log(chalk.whiteBright("YOU WIN "+ player.name +",YOU,VE SAVED THE DAY!"));
    process.exit();
          }
     }
}
 else if (answer.opt === chalk.greenBright("Drink Elixir of Life")) {
    refillFuel();
    console.log(chalk.green(`${player.name} Drink Elixir of Life.Your health has been restored ${playerHealth}`));
 }
  else if (answer.opt === chalk.blackBright("Escape")) {
     console.log(chalk.bgRedBright("YOU LOSE,BETTER LUCK NEXT TIME MATE"));
     process.exit();
      }
  }
}

startGame();