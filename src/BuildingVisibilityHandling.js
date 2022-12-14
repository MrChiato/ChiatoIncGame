import { armyPrices, upgradePrices } from "./App";
import {  armyBuildings, armyUpgrades, curArmyPerUpdate, getNextTerritoryAttackCost, getNextTerritoryUnitCost, getTerritoryAttackCost, getTerritoryUnitCost, getUnitPrice, saveUpgradePrices, totalArmy, totalMoney, totalWarsWon } from "./GameFunctions";
import { EnemyArmy } from "./WarFunctions";


export function LoadVisibleBUContainers(buildingsOwned, upgradesOwned){
    let totalBUContainers = document.getElementsByClassName("BUContainer");
    let totalUpgradeContainers = document.getElementsByClassName("UpgContainer");

    if ("Embassy" in armyBuildings)
        buildingsOwned -= 1;
    if ("Embassy" in armyUpgrades)
        upgradesOwned -= 1;

    for (let i = 0; i<upgradesOwned; i++){
        totalBUContainers[i].style.visibility = "visible"
    }

    for (let i = 0; i<buildingsOwned; i++){
        totalUpgradeContainers[i].style.visibility = "visible"
    }
}

export function ShowNextBuildingContainer(upgradesOwned){
    let totalBUContainers = document.getElementsByClassName("BUContainer");
    totalBUContainers[upgradesOwned].style.visibility = "visible"
}

export function ShowNextUpgradeContainer(buildingsOwned){
    let totalUpgradeContainers = document.getElementsByClassName("UpgContainer");
    totalUpgradeContainers[buildingsOwned].style.visibility = "visible"
}

export function HideAllContainers(){
    let totalBUContainers = document.getElementsByClassName("BUContainer");
    let totalUpgradeContainers = document.getElementsByClassName("UpgContainer");
    for (let container in totalBUContainers){
        container = parseInt(container)
        if(container > 0 && !isNaN(container))
        totalBUContainers[container].style.visibility = "hidden"
    }
    for (let container in totalUpgradeContainers){
        container = parseInt(container)
        if(!isNaN(container))
            totalUpgradeContainers[container].style.visibility = "hidden"
    }
}

export function ButtonAffordableVisibility(){
    let opacityPercentage = 0;
    let territoryButton = document.getElementById("TerritoryButton")
    let attackButton = document.getElementById("AttackButton")
    let warTab = document.getElementById("WarfareTabButton")
    let territoryReady, warReady
    
    if (totalArmy > getNextTerritoryAttackCost() && curArmyPerUpdate >= getNextTerritoryUnitCost()){
        warTab.style.boxShadow= "0 0 10px rgba(0, 0, 255, 0.50)"
        territoryButton.style.border = "2px solid green"
        territoryReady = true;
    }
    else{
        warTab.style.boxShadow= "0 0 10px rgba(0, 0, 0, 0.15)"
        territoryButton.style.border = "2px solid grey"
        territoryReady = false
    }

    if (totalArmy > (EnemyArmy(totalWarsWon)/2)){
        warTab.style.boxShadow= "0 0 15px rgba(255, 0, 0, 0.50)"
        attackButton.style.border = "2px solid green"
        warReady = true
    }
    else{
        if (!(territoryReady))
            warTab.style.boxShadow= "0 0 10px rgba(0, 0, 0, 0.15)"
        attackButton.style.border = "2px solid grey"
        warReady = false
    }

    if (territoryReady && warReady){
        warTab.style.boxShadow= "0 0 15px rgba(0, 255, 0, 0.99)"
    }


        

    for (let building in armyPrices){
        opacityPercentage = Math.floor(totalMoney/getUnitPrice(building, 1, armyPrices[building])*100)  

        if (document.getElementById(building+"input").value){
            ThisButtonVisibility(building, document.getElementById(building+"input").value)
        }
        else{
        if (armyPrices[building] === 0)
            opacityPercentage = Math.floor(totalMoney/getUnitPrice(building, 1, document.getElementById(building+"BUContainer").getAttribute("data-suprice"))*100)
        if (opacityPercentage < 15)
            opacityPercentage = 15;
        if(opacityPercentage < 100 && opacityPercentage > 80)
            opacityPercentage = 80;
        if (opacityPercentage >= 100){
            opacityPercentage = 100;
            if (building === "Embassy" && totalWarsWon === 0 || building === "Embassy" && totalWarsWon <= armyBuildings["Embassy"]){
                document.getElementById(building+"button").style.opacity = (opacityPercentage+"%")
                document.getElementById(building+"button").style.border = "2px solid grey"
            }
            else{
                document.getElementById(building+"button").style.border = "2px solid green"
                document.getElementById(building+"button").style.opacity = (opacityPercentage+"%")
            }
            
        }
        else{
            document.getElementById(building+"button").style.opacity = (opacityPercentage+"%")
            document.getElementById(building+"button").style.border = "2px solid grey"
        }
        }
    }
        for (let upgrade in upgradePrices){
            if (upgrade in saveUpgradePrices)
                opacityPercentage = Math.round(totalMoney/saveUpgradePrices[upgrade]*100)
            else
                opacityPercentage = Math.round(totalMoney/upgradePrices[upgrade]*100)
            if (opacityPercentage < 15)
                opacityPercentage = 15;
            if(opacityPercentage < 100 && opacityPercentage > 80)
                opacityPercentage = 80;
            if (opacityPercentage >= 100){
                opacityPercentage = 100;
                document.getElementById(upgrade+"UpgradeButton").style.border = "2px solid green"
                document.getElementById(upgrade+"UpgradeButton").style.opacity = (opacityPercentage+"%")
            }
            else{
                document.getElementById(upgrade+"UpgradeButton").style.opacity = (opacityPercentage+"%")
                document.getElementById(upgrade+"UpgradeButton").style.border = "2px solid grey"
            }
        }
    
}

export function ThisButtonVisibility(building, amount){
    let opacityPercentage = 0;
    opacityPercentage = Math.floor(totalMoney/getUnitPrice(building, amount, armyPrices[building])*100)

    if (amount === 0){
        opacityPercentage = Math.floor(totalMoney/getUnitPrice(building, 1, document.getElementById(building+"BUContainer").getAttribute("data-sprice"))*100)
    }

    if (opacityPercentage < 15)
        opacityPercentage = 15;
    if(opacityPercentage < 100 && opacityPercentage > 80)
        opacityPercentage = 80;
    if (opacityPercentage >= 100){
        opacityPercentage = 100;
        document.getElementById(building+"button").style.border = "2px solid green"
        document.getElementById(building+"button").style.opacity = (opacityPercentage+"%")
    }
    else{
        document.getElementById(building+"button").style.opacity = (opacityPercentage+"%")
        document.getElementById(building+"button").style.border = "2px solid grey"
    }
}


export function HandleVisibility(){
    ButtonAffordableVisibility()
}