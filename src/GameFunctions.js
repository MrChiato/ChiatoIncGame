import { armyPrices, startingArmyWin, startingEnemyArmy } from "./App";
import { ButtonAffordableVisibility, HandleVisibility, LoadVisibleBUContainers, ShowNextBuildingContainer, ShowNextUpgradeContainer } from "./BuildingVisibilityHandling";
import { BuilderBuildBuilding, cycleLevel, LoadPrestige, OfflineBuilders, prestigeBuilders, prestigeLevel, prestigePoints, unitHalf, upgHalf } from "./PrestigeLeveling";
import { LoadSettings, UpdateDetailedText } from "./SettingsHandling";
import { TabClick } from "./TabHandling";
import { FightArmy, UpdateWarText } from "./WarFunctions";

export const timeBetweenUpdates = 1000;
const timeBetweenSaves = 500;
const loadtime = 50;

let gameIsStarted = false;

let totalTerritory = 1;
let attackCostIncrease = 1000;
const incomeIncrease = 5;
const startIncome = 990;
let armyLossIncrease = 30;
export let territoryIncome = 100;
let territoryLoses = 0;

export let totalMoney = 10000;
export let totalArmy = 0;

let armyPerUpdate = 0;
export let curArmyPerUpdate = 0;

export let totalWarsWon = 0;
let totalArmyWon = 0;
let totalArmyLost = 0;
export const armyRequirement = 2500;
export const winMultiplier = 2;
export const armyGrowth = 2500;

export let updateInterval, saveInterval;

export let armyBuildings = {
}

export let armyUpgrades = {
}

export let armyValue = {
}

export let saveUpgradePrices = {

}

export let saveIncreasedPrices = {

}

export function setMoney(money){
    totalMoney += money
}

export function setArmy(army){
    totalArmy += army
}

export function startGame(){
    if (gameIsStarted === false){ 
        updateInterval = setInterval(update, timeBetweenUpdates);
        loadGameClick()
        setTimeout(() => {
            saveInterval = setInterval(saveToStorage, timeBetweenSaves);
        }, loadtime);
        gameIsStarted = true;
    }
}

export function loadGameClick(){
    if (window.localStorage.getItem("Save") != null){
        setTimeout(() => {
            loadFromStorage()
        }, loadtime);
    }
}

export function deleteSaveClick(){
    if (window.localStorage.getItem("Save") != null)
        window.clearInterval(saveInterval)
        localStorage.removeItem("Save")
        window.location.reload(true);
}

export function saveGameClick(){
    saveToStorage();
}

export function attackClick(){
    let warOutcome = FightArmy(totalArmy, totalWarsWon);
    if (warOutcome == false)
        return
    if (warOutcome.win == true){
        totalArmy -= warOutcome.armyLost;
        totalMoney += warOutcome.prize;
        totalWarsWon += 1;
        totalArmyWon += warOutcome.prize;
        totalArmyLost += warOutcome.armyLost;
        CalculateNextWar();
    }
    else{
        totalArmy -= warOutcome.armyLost;
        totalArmyLost += warOutcome.armyLost;
    }
    updateText();
    UpdateWarText(totalWarsWon, totalArmyWon, totalArmyLost)
}

function CalculateNextWar(){
    let nextWarEnemyForce = ((totalWarsWon)**2) *  armyGrowth * (totalWarsWon+1)
    let nextWarWin = nextWarEnemyForce*winMultiplier*totalWarsWon
    if (totalWarsWon == 0){
        nextWarWin = startingArmyWin
        nextWarEnemyForce = startingEnemyArmy
    }
    if (totalWarsWon == 1){
        nextWarWin = startingArmyWin*2
        nextWarEnemyForce = startingEnemyArmy*2
    }
    if (totalWarsWon == 2){
        nextWarWin = startingArmyWin*3
        nextWarEnemyForce = startingEnemyArmy*3
    }
    if (totalWarsWon == 3){
        nextWarWin = startingArmyWin*4
        nextWarEnemyForce = startingEnemyArmy*4
    }
    if (totalWarsWon == 4){
        nextWarWin = startingArmyWin*5
        nextWarEnemyForce = startingEnemyArmy*5
    }
    let nextArmyRequriment = nextWarEnemyForce/2
    document.getElementById("armyCostText").textContent = ("Attacking now will require atleast "+nextArmyRequriment.toLocaleString()+" army forces and win up to $"+nextWarWin.toLocaleString()+". This enemy force has an Army strength of "+nextWarEnemyForce.toLocaleString())
   }

export function buttonClick(price, value, amount, name, type){
    let calcPrice = getUnitPrice(name, amount, price)
    if (canAfford(calcPrice) === false)
        return

    if (type === "Army"){
        buyArmyUpgrade(calcPrice, value, amount)
        if (name in armyBuildings)
            armyBuildings[name] += amount;
        else{
            armyBuildings[name] = amount;
            let buildingsOwned = Object.keys(armyBuildings).length-1
            if ("Embassy" in armyBuildings)
            buildingsOwned -= 1;
            ShowNextUpgradeContainer(buildingsOwned)
        }
        armyValue[name] = value;
        armyPerUpdate = calculateIncome() - territoryLoses;
    }
    else if (type === "Territory"){
        if (name in armyBuildings){
            if (armyBuildings[name] >= totalWarsWon)
            return
            armyBuildings[name] += amount;
        }
        else{
            if (0 >= totalWarsWon)
                return
            armyBuildings[name] = amount;
        }
        buyArmyUpgrade(calcPrice, value, amount)
        armyValue[name] = value;
        armyPerUpdate = calculateIncome() - territoryLoses;
    }
    else if (type === "Money"){

    }

    armyPrices[name] = price;
    if (amount > 1)
        document.getElementById(name+"button").textContent = ("Build "+amount+" for $"+(getUnitPrice(name, amount, price)).toLocaleString());
    else
        document.getElementById(name+"button").textContent = ("Build 1 for $"+(getUnitPrice(name, 1, price)).toLocaleString());
    ButtonAffordableVisibility()
    updateText();
    UpdateDetailedText()
}

export function update(){
    addIncome();
    HandleVisibility()
    BuilderBuildBuilding()
    updateText();
}

function addIncome(){
    curArmyPerUpdate = calculateIncome() - territoryLoses;
    totalArmy += curArmyPerUpdate;
    totalMoney += territoryIncome;
}

function calculateIncome(){
    let curIncome = 0;
    
    for (const building in armyBuildings){
        let amountOfBuilding = armyBuildings[building]
        let valueOfBuilding = armyValue[building]
        let amountOfUpgrades = armyUpgrades[building]
        if(amountOfUpgrades > 0)
            curIncome += (amountOfBuilding*valueOfBuilding*(amountOfUpgrades+1))
        else
            curIncome += ((amountOfBuilding*valueOfBuilding))
    }

    return curIncome;
}

function canAfford(price){
    if (totalMoney < price)
        return false
}

function buyArmyUpgrade(price){
    if (price > totalMoney)
        return false

    totalMoney -= price;
}

export function upgradeButtonClicked(name, price){
    let ownedUpgrades = 0;
    let thisUpgradePrice = 0;
    let nextUpgradePrice = 0;
    if (!(name in armyBuildings))
       return

    if (name in armyUpgrades)
        ownedUpgrades = armyUpgrades[name]
    else{
        ownedUpgrades = 0;
    }

    thisUpgradePrice = ((price)*(3**ownedUpgrades))

    if (thisUpgradePrice > totalMoney)
        return
    
    totalMoney -= thisUpgradePrice;
    if (ownedUpgrades == 0){
        armyUpgrades[name] = 1;
        ownedUpgrades = 1;
        ShowNextBuildingContainer(Object.keys(armyUpgrades).length)
    }
    else{
        armyUpgrades[name] += 1;
        ownedUpgrades = armyUpgrades[name];
    }


    armyPerUpdate = calculateIncome() - territoryLoses;
    nextUpgradePrice = ((price)*(3**ownedUpgrades+1));
    saveUpgradePrices[name] = nextUpgradePrice

    let upgradeAdd = armyValue[name]*ownedUpgrades

    UpdateDetailedText();
    updateUnitsOwned(name);
    updateText();
    ButtonAffordableVisibility()
    
    document.getElementById(name+"UpgradeHeader").textContent = ("Upgrade "+name+"s")
    document.getElementById(name+"UpgradeAmount").textContent = ("You currently own "+ownedUpgrades+" "+name+" upgrades")
    document.getElementById(name+"UpgradeButton").textContent = ("Upgrade for $"+nextUpgradePrice.toLocaleString())
    document.getElementById(name+"UpgradeAdds").textContent = ("Production increased by "+upgradeAdd+" per "+name)
}

export function updateUnitsOwned(name){
    let thisArmyBuildings = armyBuildings[name]
    let thisArmyUpgrades = armyUpgrades[name]
    let thisArmyUpgradeValue = 0
    if (thisArmyUpgrades > 0)
        thisArmyUpgradeValue = (thisArmyBuildings*armyValue[name] )*(thisArmyUpgrades+1);
    else
        thisArmyUpgradeValue = (thisArmyBuildings*armyValue[name]);

    if (!(name in armyBuildings))
        return   

    document.getElementById(name).textContent = ("You currently own "+thisArmyBuildings.toLocaleString()+" "+name+"s");
    document.getElementById(name+"perCycle").textContent = ("Army increased by "+thisArmyUpgradeValue.toLocaleString()+" per cycle");
}

export function territoryClick(){
    takeOverTerritory();
}

function takeOverTerritory(){
    let attackCost = getTerritoryAttackCost();
    let errorTextField = document.getElementById("territoryError");
    errorTextField.textContent = "";

    if (totalTerritory < 9){
        EarlyGameTerritory()
        return;
    }

    if (attackCost > totalArmy){
        errorTextField.textContent = "You do not have enough army to take over this territory, you need atleast "+attackCost.toLocaleString()+" army strength";
        return
    }


    if (curArmyPerUpdate < getNextTerritoryUnitCost()){
        errorTextField.textContent = "You do not have enough army income to defend this territory, construct more buildings, you need atleast "+getNextTerritoryUnitCost().toLocaleString()+" army per cycle.";
        return
    }

    totalTerritory += 1;
    totalArmy -= attackCost;

    territoryIncome += getTerritoryIncome();
    territoryLoses += getTerritoryUnitCost();

    updateText();
    updateTerritoryText();
    ButtonAffordableVisibility();
    addIncome();
}

function EarlyGameTerritory(){

    let t = totalTerritory
    let errorTextField = document.getElementById("territoryError");

    if (getNextTerritoryAttackCost() > totalArmy){
        errorTextField.textContent = "You do not have enough army to take over this territory, you need atleast "+getNextTerritoryAttackCost()+" army strength";
        return
    }
    if (curArmyPerUpdate < getNextTerritoryUnitCost()){
        errorTextField.textContent = "You do not have enough army income to defend this territory, construct more buildings, you need atleast "+getTerritoryUnitCost()+" army per cycle.";
        return
    }
    totalArmy -= getTerritoryAttackCost()
    territoryIncome += getTerritoryIncome()
    territoryLoses += getTerritoryUnitCost()
    totalTerritory += 1;
    
    updateText();
    updateTerritoryText();
}

export function getTerritoryAttackCost(){
    let earlyTerritoryCost = [0, 50, 100, 300, 1000, 3000, 10000, 20000, 40000 ]
    if (totalTerritory < 9)
        return earlyTerritoryCost[totalTerritory]

    let attackCost = (totalTerritory**2)*attackCostIncrease;
    return attackCost
}

export function getNextTerritoryAttackCost(){
    let earlyTerritoryCost = [0, 50, 100, 300, 1000, 3000, 10000, 20000, 40000 ]
    if (totalTerritory < 9)
        return earlyTerritoryCost[totalTerritory]

    let attackCost = ((totalTerritory+1)**2)*attackCostIncrease;
    return attackCost
}

export function getTerritoryIncome(){
    let earlyTerritoryIncome = [50, 100, 150, 250, 400, 600, 900, 1500, 2000 ]
    if (totalTerritory < 9)
        return earlyTerritoryIncome[totalTerritory]

    let thisIncome = totalTerritory**2*25
    return thisIncome
}

function getNextTerritoryIncome(){
    let earlyTerritoryIncome = [50, 100, 150, 250, 400, 600, 900, 1500, 2000 ]
    if (totalTerritory < 9)
        return earlyTerritoryIncome[totalTerritory]

    let nextIncome = (totalTerritory+1)**2*25
    return nextIncome
}

export function getTerritoryUnitCost(){
    let earlyTerritoryUnit = [0, 0, 1, 5, 10, 30, 50, 200, 1000 ]
    if (totalTerritory < 9)
        return earlyTerritoryUnit[totalTerritory]

    let nextLoses = (totalTerritory**2)*armyLossIncrease
    return nextLoses
}

export function getNextTerritoryUnitCost(){
    let earlyTerritoryUnit = [0, 0, 1, 5, 10, 30, 50, 200, 1000 ]
    if (totalTerritory < 9)
        return earlyTerritoryUnit[totalTerritory]

    let nextLoses = ((totalTerritory+1)**2)*armyLossIncrease
    return nextLoses
}



function saveToStorage(){
    const saveTime = GetNowInSeconds();
    let data = {
        money: totalMoney,
        army: totalArmy,
        building: armyBuildings,
        upgrades: armyUpgrades,
        upgPrices: saveUpgradePrices,
        value: armyValue,
        territory: totalTerritory,
        income: territoryIncome,
        loses: territoryLoses,
        warWins: totalWarsWon,
        warCash: totalArmyWon,
        warLost: totalArmyLost,
        saveTime: saveTime,
        pLevel: prestigeLevel,
        pPoints: prestigePoints,
        pCycle: cycleLevel,
        uHalf: unitHalf,
        upHalf: upgHalf,
        pBuilder: prestigeBuilders
    }
    window.localStorage.setItem("Save", JSON.stringify(data))
}

export function loadFromStorage(){
    let loadedData = JSON.parse(window.localStorage.getItem("Save"))
    LoadSavedData(loadedData)
}

export function LoadSavedData(loadedData){
    window.clearInterval(saveInterval)
    totalMoney = loadedData["money"]
    totalArmy = loadedData["army"]
    armyBuildings = loadedData["building"]
    armyUpgrades = loadedData["upgrades"]
    armyValue = loadedData["value"]
    totalTerritory = loadedData["territory"]
    territoryIncome = loadedData["income"]
    territoryLoses = loadedData["loses"]
    totalWarsWon = loadedData["warWins"]
    totalArmyWon = loadedData["warCash"]
    totalArmyLost = loadedData["warLost"]
    saveUpgradePrices = loadedData["upgPrices"]
    let loadSaveTime = loadedData["saveTime"]

    for (let building in armyBuildings){
        updateUnitsOwned(building)
        document.getElementById(building+"button").textContent = ("Build 1 for $"+(getUnitPrice(building, 1, armyPrices[building])).toLocaleString());
    }
    for (let upgrade in armyUpgrades){
        let upgradeAdd = armyValue[upgrade]*armyUpgrades[upgrade]
        document.getElementById(upgrade+"UpgradeHeader").textContent = ("Upgrade "+upgrade+"s")
        document.getElementById(upgrade+"UpgradeAmount").textContent = ("You currently own "+armyUpgrades[upgrade]+" "+upgrade+" upgrades")
        document.getElementById(upgrade+"UpgradeAdds").textContent = ("Production increased by "+upgradeAdd+" per "+upgrade)
        document.getElementById(upgrade+"UpgradeButton").textContent = ("Upgrade for $"+saveUpgradePrices[upgrade].toLocaleString())
    }
    armyPerUpdate = calculateIncome() - territoryLoses;
    LoadPrestige(loadedData)
    OfflineIncome(loadSaveTime)
    updateText();
    UpdateWarText(totalWarsWon, totalArmyWon, totalArmyLost);
    CalculateNextWar();
    LoadSettings();
    TabClick("Buildings", "BuildingsTabButton")
    updateTerritoryText();
    LoadVisibleBUContainers(Object.keys(armyBuildings).length, Object.keys(armyUpgrades).length+1)
    saveInterval = setInterval(saveToStorage, timeBetweenSaves);
    
}

export function getUnitPrice(name, amount, price){
    let i = 0;
    let totalPrice = 0;
    if (!(name in armyBuildings)){
        if (amount === 1)
            return(price)
        while(i<amount){
            totalPrice += (price+(((i)*price)/10)*(i))
            i++;
        }
    }
    if (name === "Embassy"){
        totalPrice = (price*(armyBuildings[name]+1));
        return (totalPrice)
    }
    while(i<amount){
        totalPrice += (price+(((armyBuildings[name]+i)*price)/10)*(armyBuildings[name]+i))
        i++;
    }
    return(totalPrice)
}

export function getMaxAffordableAmount(name){
    let i = 0, maxAmount = 0, totalPrice = 0, thisBuildingPrice = 0
    if (name in armyBuildings){
        while(totalMoney>totalPrice){
            thisBuildingPrice = (armyPrices[name]+(((armyBuildings[name]+i)*armyPrices[name])/10)*(armyBuildings[name]+i))
            totalPrice += thisBuildingPrice
            maxAmount += 1
            if (totalMoney<totalPrice){
                totalPrice -= thisBuildingPrice;
                maxAmount -= 1
                break;
            }
            i++;
        }
    }
    if (!(name in armyBuildings)){
        while(totalMoney>totalPrice){
            thisBuildingPrice = (armyPrices[name]+(((i*armyPrices[name])/10)*(i)))
            totalPrice += thisBuildingPrice
            maxAmount += 1
            if (totalMoney<totalPrice){
                totalPrice -= thisBuildingPrice;
                maxAmount -= 1
                break;
            }
            i++;
        }
    }
    return(maxAmount)
}

function updateText(){
    document.getElementById("soldiersText").textContent = ("Army strength: "+ totalArmy.toLocaleString());
    document.getElementById("moneyText").textContent = ("Cash: $"+ totalMoney.toLocaleString());
    armyPerUpdate = calculateIncome() - territoryLoses;
    document.getElementById("soldiersPerUpdateText").textContent = ("+ "+armyPerUpdate.toLocaleString());
}

function updateTerritoryText(){
    let attackCost = getNextTerritoryAttackCost();
    let losesCost = getNextTerritoryUnitCost();
    let nextIncome = getNextTerritoryIncome();
    document.getElementById("territoryText").textContent = ("Territory: "+ totalTerritory.toLocaleString());
    document.getElementById("incomeText").textContent = ("+ $"+ territoryIncome.toLocaleString());
    document.getElementById("losesText").textContent = ("Loses per cycle: "+ territoryLoses.toLocaleString());
    document.getElementById("attackCostText").textContent = ("Attacking now will require "+attackCost.toLocaleString()+" army forces and take "+losesCost.toLocaleString()+" army to defend and generate $"+nextIncome.toLocaleString()+" income");
}

export function GetNowInSeconds(){
    const timeNow = new Date()
    const timeNowInSec = Math.round(timeNow.getTime() / 1000)
    return timeNowInSec
}

function OfflineIncome(savedTime){

    const loadTime = new Date()
    const loadTimeInSec = Math.round(loadTime.getTime() / 1000)

    const secsOffline = loadTimeInSec - savedTime

    if (secsOffline < 2)
        return
    
    let curArmyPerUpdate = calculateIncome() - territoryLoses;
    let offlineArmy = curArmyPerUpdate*(secsOffline)
    let offlineCash = territoryIncome*(secsOffline)
    totalArmy += offlineArmy;
    totalMoney += offlineCash;
    OfflineBuilders(secsOffline)

    if (secsOffline < 60)
        return

    document.getElementById("offlineIncomeText").textContent = ("While offline you made $"+offlineCash.toLocaleString());
    document.getElementById("offlineArmyText").textContent = ("While offline your army increased by "+offlineArmy.toLocaleString());
    setTimeout(RemoveOfflineText, 30000);
}

function RemoveOfflineText(){
    
    document.getElementById("offlineIncomeText").textContent = ("");
    document.getElementById("offlineArmyText").textContent = ("");
}