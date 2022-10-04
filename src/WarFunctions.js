import { startingArmyWin, startingEnemyArmy } from "./App";
import { armyGrowth, armyRequirement, totalArmy, winMultiplier } from "./GameFunctions";
import { maxSetting } from "./SettingsHandling";


export function ArmyInputChange(){
    let userArmyInput = parseInt(document.getElementById("armyToSendInput").value);
    if (maxSetting == true && (userArmyInput > totalArmy)){
        userArmyInput = totalArmy
        document.getElementById("armyToSendInput").value = userArmyInput
    }
}

export function FightArmy(curTotalArmy, curTotalWarsWon){
    let falseInput = false;
    let userInput = parseInt(document.getElementById("armyToSendInput").value);
    let userArmyInput = parseInt(document.getElementById("armyToSendInput").value);
    
    if (!userInput){
        document.getElementById("warResult").style.color = "red";
        document.getElementById("warResult").textContent = ("Please input a valid positive number!");
        return falseInput
    }
    if (armyRequirement > userArmyInput){
        document.getElementById("warResult").style.color = "red";
        document.getElementById("warResult").textContent = ("You must send more army!");
        return falseInput
    }
    if (userArmyInput > curTotalArmy){
        document.getElementById("warResult").style.color = "red";
        document.getElementById("warResult").textContent = ("You don't have enough army!");
        return falseInput
    }

    let curEnemyArmy = EnemyArmy(curTotalWarsWon);
    let enemyRoll = Math.floor(Math.random()*curEnemyArmy);
    let armyRoll = Math.floor(Math.random()*userArmyInput);

    if ((curEnemyArmy/2) > userArmyInput){
        document.getElementById("warResult").style.color = "red";
        document.getElementById("warResult").textContent = ("You must send more army!");
        return falseInput
    }

    if (armyRoll > enemyRoll){

        let prize = CalculateWin(curEnemyArmy, curTotalWarsWon);
        let win = true, armyLost = enemyRoll;
        console.log("enemy roll: "+enemyRoll+" army roll: "+armyRoll+" win: "+win)
        WarResultText(win, prize, armyLost)
        return {win, prize, armyLost}
    }

    else{
        let win = false, prize = 0, armyLost = userArmyInput;
        console.log("enemy roll: "+enemyRoll+" army roll: "+armyRoll+" win: "+win)
        WarResultText(win, prize, armyLost)
        return {win, prize, armyLost};
    }
}

function EnemyArmy(warsWon){
    let curEnemyArmySize = (warsWon**2) *  armyGrowth * (warsWon+1)
    if (warsWon == 0)
        curEnemyArmySize = startingEnemyArmy;
    if (warsWon == 1)
        curEnemyArmySize = startingEnemyArmy*2;
    if (warsWon == 2)
        curEnemyArmySize = startingEnemyArmy*3;
    

    return curEnemyArmySize;
}

function CalculateWin(enemyArmy, totalWarsWon){
    let curWin = enemyArmy*winMultiplier*(totalWarsWon+1)
    if (totalWarsWon == 0)
        curWin = startingArmyWin
        if (totalWarsWon == 1)
            curWin = startingArmyWin*2
            if (totalWarsWon == 2)
                curWin = startingArmyWin*3
    return curWin;
}

export function UpdateWarText(totalWarsWon, totalArmyWon, totalArmyLost){
    document.getElementById("warsWonText").textContent = ("Wars won: "+totalWarsWon.toLocaleString());
    document.getElementById("armyWonText").textContent = ("Cash made: $"+totalArmyWon.toLocaleString());
    document.getElementById("armyLostText").textContent = ("Army lost: "+totalArmyLost.toLocaleString());
}

export function WarResultText(win, prize, armyLost){
    if (win == false){
        document.getElementById("warResult").style.color = "red";
        document.getElementById("warResult").textContent = ("You lost! All of your "+armyLost.toLocaleString()+" army died");
    }
    else{
        document.getElementById("warResult").style.color = "green";
        document.getElementById("warResult").textContent = ("You won! You earn $"+prize.toLocaleString()+" but you lost "+armyLost.toLocaleString()+" army");
    }
}