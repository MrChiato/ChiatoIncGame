import { armyPrices } from "./App";
import { HideAllContainers, ShowNextUpgradeContainer } from "./BuildingVisibilityHandling";
import { armyBuildings, armyValue, GetNowInSeconds, loadFromStorage, saveInterval, timeBetweenUpdates, totalMoney, totalWarsWon, update, updateInterval } from "./GameFunctions"

export let prestigeLevel = 0, prestigePoints = 0, cycleLevel = 0, unitHalf = 0, upgHalf = 0, prestigeBuilders = 0
export let prestigeRequirement = 50
export let cycleUpdateInterval;

export function PrestigeLevelPress(){
    const errorTextField = document.getElementById("PrestigeErrorText")
    if (prestigeRequirement > totalWarsWon){
        errorTextField.textContent = ("You do not have enough wars won to prestige yet! You need to win "+(prestigeRequirement-totalWarsWon).toLocaleString()+" more")
        return
    }
    PrestigeReset();
}

export function setPrestige(prestigeToAdd){
    prestigeLevel += prestigeToAdd;
    prestigePoints += prestigeToAdd;
}

function PrestigeReset(){
    window.clearInterval(saveInterval)
    prestigeLevel += 1;
    prestigePoints += 1;
    const saveTime = GetNowInSeconds();
    let data = {
        money: 10000,
        army: 0,
        building: {},
        upgrades: {},
        upgPrices: {},
        value: armyValue,
        territory: 0,
        income: 0,
        loses: 0,
        warWins: 0,
        warCash: 0,
        warLost: 0,
        saveTime: saveTime,
        pLevel: prestigeLevel,
        pPoints: prestigePoints,
        pCycle: cycleLevel,
        uHalf: unitHalf,
        upHalf: upgHalf,
        pBuilder: prestigeBuilders
    }
    window.localStorage.setItem("Save", JSON.stringify(data));
    HideAllContainers();
    document.getElementById("Barrackbutton").textContent = ("Build 1 for "+armyPrices["Barrack"].toLocaleString())
    document.getElementById("Barrack").textContent = ("You currently own 0 Barracks");
    document.getElementById("BarrackperCycle").textContent = ("Army increased by 0 per cycle");
    loadFromStorage();
}

export function LoadPrestige(loadedData){
    if (loadedData["pLevel"] < 1)
        return
    
    const levelText = document.getElementById("PrestigeLevelText")
    const pointsText = document.getElementById("PrestigePointsText")
    const cycleLevelText = document.getElementById("CycleLevelText")
    const builderText = document.getElementById("PrestigeBuilder")
    
    if (prestigeLevel === undefined || prestigeLevel === NaN || isNaN(prestigeLevel)){
        prestigeLevel = 0
        prestigePoints = 0
        cycleLevel = 0
        unitHalf = 0
        upgHalf = 0
        prestigeBuilders = 0
        return
    }
    else{
        prestigeLevel = loadedData["pLevel"]
        prestigePoints = loadedData["pPoints"]
        cycleLevel = loadedData["pCycle"]
        unitHalf = loadedData["uHalf"]
        upgHalf = loadedData["upHalf"]
        prestigeBuilders = loadedData["pBuilder"]
    }


    levelText.textContent = ("Prestige level: "+prestigeLevel)
    pointsText.textContent = ("Prestige points: "+prestigePoints)
    cycleLevelText.textContent = ("Cycle speed upgrades: "+cycleLevel)
    builderText.textContent = ("Builders: "+prestigeBuilders)

    if (prestigeBuilders > 0){
        document.getElementById("Barrackbutton").style.display = "none"
        document.getElementById("Barrackinput").style.display = "none"
        document.getElementById("BarrackdescText").style.display = "none"
        document.getElementById("BarrackdetailedStats").style.display = "none"
    }

    if (cycleLevel > 0){
        window.clearInterval(updateInterval)
        window.clearInterval(cycleUpdateInterval)
        cycleUpdateInterval = setInterval(update, (timeBetweenUpdates/(cycleLevel+1)));
    }
}

function PrestigePointSelection(){
    const errorTextField = document.getElementById("PrestigeLevelingErrorText")
    if (prestigePoints < 1){
        errorTextField.textContent = ("You have no prestige points!")
        return false
    }
    else
        return true
}

export function PrestigeCycleSpeed(){
    const pointsText = document.getElementById("PrestigePointsText")
    const cycleLevelText = document.getElementById("CycleLevelText")
    if (!(PrestigePointSelection()))
        return
    
    prestigePoints -= 1;
    cycleLevel += 1;
    window.clearInterval(updateInterval)
    window.clearInterval(cycleUpdateInterval)
    cycleUpdateInterval = setInterval(update, (timeBetweenUpdates/(cycleLevel+1)));
    pointsText.textContent = ("Prestige points: "+prestigePoints)
    cycleLevelText.textContent = ("Cycle speed upgrades: "+cycleLevel)
}

export function PrestigeHalfUnitPrice(){

}

export function PrestigeBuilder(){
    const pointsText = document.getElementById("PrestigePointsText")
    const builderText = document.getElementById("PrestigeBuilder")

    if (!(PrestigePointSelection()))
        return

    prestigePoints -= 1;
    prestigeBuilders += 1;   

    pointsText.textContent = ("Prestige points: "+prestigePoints)
    builderText.textContent = ("Builders: "+prestigeBuilders)
    BuilderBuildBuilding()
    document.getElementById("Barrackbutton").style.display = "none"
    document.getElementById("Barrackinput").style.display = "none"
    document.getElementById("BarrackdescText").style.display = "none"
    document.getElementById("BarrackdetailedStats").style.display = "none"
}

export function BuilderBuildBuilding(){
    let name = "Barrack"
    if (prestigeBuilders > 0){
        if (name in armyBuildings){
            if(armyBuildings[name] < 999999)
                armyBuildings[name] += prestigeBuilders;
                document.getElementById(name).textContent = ("You currently own "+armyBuildings[name].toLocaleString()+" "+name+"s");
                document.getElementById(name+"perCycle").textContent = ("Army increased by "+(armyBuildings[name]).toLocaleString()+" per cycle");
        }
        else{
            armyBuildings[name] = prestigeBuilders;
            armyValue[name] = 1;
            ShowNextUpgradeContainer(Object.keys(armyBuildings).length-1)
    }
}
}

export function OfflineBuilders(secsOffline){

    if (prestigeBuilders < 1)
        return

    if (prestigeBuilders === undefined || prestigeBuilders === NaN || isNaN(prestigeBuilders))
        return

    let name = "Barrack"
    if (name in armyBuildings){
        if(armyBuildings[name] < 999999)
            armyBuildings[name] += prestigeBuilders*secsOffline;
            document.getElementById("BarrackofflineStat").textContent = ("Your builders created "+(prestigeBuilders*secsOffline).toLocaleString()+" barracks while you were offline")
            document.getElementById(name).textContent = ("You currently own "+armyBuildings[name].toLocaleString()+" "+name+"s");
            document.getElementById(name+"perCycle").textContent = ("Army increased by "+(armyBuildings[name]).toLocaleString()+" per cycle");
    }
}
