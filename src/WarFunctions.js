import { winMultiplier } from "./GameFunctions";




export function FightArmy(curTotalArmy, curTotalWarsWon, curIncome, armyRequirement){
    let falseInput = false;
    let userInput = parseInt(document.getElementById("armyToSendInput").value);
    let userArmyInput = parseInt(document.getElementById("armyToSendInput").value);
    
    if (!userInput)
        return falseInput;

    if (armyRequirement > userArmyInput)
        return falseInput
    if (userArmyInput > curTotalArmy)
        return falseInput

    let curEnemyArmy = EnemyArmy(curTotalWarsWon, curIncome);
    let enemyRoll = Math.floor(Math.random()*curEnemyArmy);
    let armyRoll = Math.floor(Math.random()*userArmyInput);

    if (armyRoll > enemyRoll){

        let prize = CalculateWin(curIncome);
        let win = true, armyLost = enemyRoll;
        console.log("enemy roll: "+enemyRoll+" army roll: "+armyRoll+" win: "+win)
        return {win, prize, armyLost}
    }

    else{
        let win = false, prize = 0, armyLost = userArmyInput;
        console.log("enemy roll: "+enemyRoll+" army roll: "+armyRoll+" win: "+win)
        return {win, prize, armyLost};
    }
}

function EnemyArmy(warsWon, income){
    let curEnemyArmySize = (warsWon+1) * income * 10

    return curEnemyArmySize;
}

function CalculateWin(income){
    let curWin = income*winMultiplier
    return curWin;
}

export function UpdateWarText(totalWarsWon, totalArmyWon, totalArmyLost){
    document.getElementById("warsWonText").textContent = ("Wars won: "+totalWarsWon.toLocaleString());
    document.getElementById("armyWonText").textContent = ("Cash made: "+totalArmyWon.toLocaleString());
    document.getElementById("armyLostText").textContent = ("Army lost: "+totalArmyLost.toLocaleString());
}