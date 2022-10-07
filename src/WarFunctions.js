import { startingArmyWin, startingEnemyArmy } from "./App";
import { armyGrowth, armyRequirement, totalArmy, totalWarsWon, winMultiplier } from "./GameFunctions";
import { detailedStats, maxSetting } from "./SettingsHandling";


export function ArmyInputChange(){
    let userArmyInput = parseInt(document.getElementById("armyToSendInput").value);
    if (maxSetting == true && (userArmyInput > totalArmy)){
        userArmyInput = totalArmy
        document.getElementById("armyToSendInput").value = userArmyInput
    }
    if (detailedStats){
        let enemyArmy = EnemyArmy(totalWarsWon)
        if (userArmyInput >= (enemyArmy/2))
            WinProbability(userArmyInput, enemyArmy);
        else
            document.getElementById("warResult").textContent = ""
    }
}

function WinProbability(userArmy, enemyArmy){
    let chanceToWin = Math.floor((userArmy/(userArmy+enemyArmy))*100)
    document.getElementById("warResult").style.color = "black"
    document.getElementById("warResult").textContent = ("Your chance of winning with "+userArmy.toLocaleString()+" army vs "+enemyArmy.toLocaleString()+" army is "+chanceToWin+"%");
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
        WarResultText(win, prize, armyLost)
        return {win, prize, armyLost}
    }

    else{
        let win = false, prize = 0, armyLost = userArmyInput;
        WarResultText(win, prize, armyLost)
        return {win, prize, armyLost};
    }
}

export function EnemyArmy(warsWon){
    let curEnemyArmySize = (warsWon**2) *  armyGrowth * (warsWon+1)
    if (warsWon == 0)
        curEnemyArmySize = startingEnemyArmy;
    if (warsWon == 1)
        curEnemyArmySize = startingEnemyArmy*2;
    if (warsWon == 2)
        curEnemyArmySize = startingEnemyArmy*3;
    if (warsWon == 3)
        curEnemyArmySize = startingEnemyArmy*4;
    if (warsWon == 4)
        curEnemyArmySize = startingEnemyArmy*5;

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
                if (totalWarsWon == 3)
                    curWin = startingArmyWin*4
                    if (totalWarsWon == 4)
                        curWin = startingArmyWin*5
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