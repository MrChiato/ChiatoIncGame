import { startingArmyWin, startingEnemyArmy } from "./App";
import { FightArmy, UpdateWarText } from "./WarFunctions";

const timeBetweenUpdates = 1000;
const timeBetweenSaves = 500;
const loadtime = 50;

let gameIsStarted = false;

let totalTerritory = 1;
let attackCostIncrease = 1000;
const incomeIncrease = 5;
const startIncome = 990;
let armyLossIncrease = 2;
export let territoryIncome = 250;
let territoryLoses = 0;

export let totalMoney = 250000;
let totalArmy = 0;

let armyPerUpdate = 0;
let curArmyPerUpdate = 0;

let totalWarsWon = 0;
let totalArmyWon = 0;
let totalArmyLost = 0;
export const armyRequirement = 10000;
export const winMultiplier = 2;
export const armyGrowth = 2500;


export let armyBuildings = {
}

export let armyUpgrades = {
}

let armyValue = {
}

let armyPrices = {
}

let upgradePrices = {
}

export function startGame(){
    if (gameIsStarted === false){ 
        setInterval(update, timeBetweenUpdates);
        loadGameClick()
        setTimeout(() => {
            setInterval(saveToStorage, timeBetweenSaves);
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
        localStorage.removeItem("Save")
        window.location.reload(true);
}

export function saveGameClick(){
    saveToStorage();
}

export function attackClick(){
    OfflineIncome()
    let warOutcome = FightArmy(totalArmy, totalWarsWon, territoryIncome);
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
    let nextWarEnemyForce = ((totalWarsWon+1)**2) *  armyGrowth * (totalWarsWon+1)
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
        }
        armyValue[name] = value;
        armyPerUpdate = calculateIncome() - territoryLoses;
    }
    else if (type === "Territory"){

    }
    else if (type === "Money"){

    }

    armyPrices[name] = price;
    if (amount > 1)
        document.getElementById(name+"button").textContent = ("Build "+amount+" for $"+(getUnitPrice(name, amount, price)).toLocaleString());
    else
        document.getElementById(name+"button").textContent = ("Build 1 for $"+(getUnitPrice(name, 1, price)).toLocaleString());
    updateText();
}

function update(){
    addIncome();
    if (totalArmy < 0){
        totalTerritory -= 1;
        territoryIncome -= (totalTerritory*attackCostIncrease)*totalTerritory
    }
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
    else
        ownedUpgrades = 0;

    thisUpgradePrice = ((price)*(3**ownedUpgrades))

    if (thisUpgradePrice > totalMoney)
        return
    
    totalMoney -= thisUpgradePrice;
    if (ownedUpgrades == 0){
        armyUpgrades[name] = 1;
        ownedUpgrades = 1;
    }
    else{
        armyUpgrades[name] += 1;
        ownedUpgrades = armyUpgrades[name];
    }



    armyPerUpdate = calculateIncome() - territoryLoses;
    nextUpgradePrice = ((price)*(3**ownedUpgrades+1));
    upgradePrices[name] = nextUpgradePrice

    let upgradeAdd = armyValue[name]*ownedUpgrades


    updateUnitsOwned(name);
    updateText();
    
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
    document.getElementById(name).textContent = ("You currently own "+thisArmyBuildings.toLocaleString()+" "+name+"s");
    document.getElementById(name+"perCycle").textContent = ("Army increased by "+thisArmyUpgradeValue.toLocaleString()+" per cycle");
}

export function territoryClick(){
    takeOverTerritory();
}

function takeOverTerritory(){
    let attackCost = (totalTerritory**2)*attackCostIncrease;
    if (attackCost > totalArmy)
        return
    if (curArmyPerUpdate < ((attackCost/1000)**armyLossIncrease))
        return
    
    totalTerritory += 1;
    totalArmy -= attackCost;

    let losesCost = (attackCost/1000)**armyLossIncrease

    territoryIncome += startIncome+(incomeIncrease)*(losesCost*totalTerritory);
    territoryLoses += losesCost;

    attackCost = (totalTerritory**2)*attackCostIncrease;
    let nextLoses = (attackCost/1000)**armyLossIncrease
    let nextIncome = startIncome+(incomeIncrease)*(nextLoses*(totalTerritory+1))

    updateText();
    updateTerritoryText(attackCost, nextLoses, nextIncome);
}

function saveToStorage(){
    const saveTime = GetNowInSeconds();
    let data = {
        money: totalMoney,
        army: totalArmy,
        building: armyBuildings,
        upgrades: armyUpgrades,
        value: armyValue,
        territory: totalTerritory,
        income: territoryIncome,
        loses: territoryLoses,
        prices: armyPrices,
        upgPrices: upgradePrices,
        warWins: totalWarsWon,
        warCash: totalArmyWon,
        warLost: totalArmyLost,
        saveTime: saveTime
    }
    window.localStorage.setItem("Save", JSON.stringify(data))
}

function loadFromStorage(){
    let loadedData = JSON.parse(window.localStorage.getItem("Save"))
    totalMoney = loadedData["money"]
    totalArmy = loadedData["army"]
    armyBuildings = loadedData["building"]
    armyUpgrades = loadedData["upgrades"]
    armyValue = loadedData["value"]
    totalTerritory = loadedData["territory"]
    territoryIncome = loadedData["income"]
    territoryLoses = loadedData["loses"]
    armyPrices = loadedData["prices"]
    upgradePrices = loadedData["upgPrices"]
    totalWarsWon = loadedData["warWins"]
    totalArmyWon = loadedData["warCash"]
    totalArmyLost = loadedData["warLost"]
    let loadSaveTime = loadedData["saveTime"]


    let attackCost = (totalTerritory**2)*attackCostIncrease;
    let losesCost = (attackCost/1000)**armyLossIncrease
    let nextIncome = startIncome+(incomeIncrease)*(losesCost*(totalTerritory+1))

    for (let building in armyBuildings){
        updateUnitsOwned(building)
        document.getElementById(building+"button").textContent = ("Build 1 for $"+(getUnitPrice(building, 1, armyPrices[building])).toLocaleString());
    }
    for (let upgrade in armyUpgrades){
        let upgradeAdd = armyValue[upgrade]*armyUpgrades[upgrade]
        document.getElementById(upgrade+"UpgradeHeader").textContent = ("Upgrade "+upgrade+"s")
        document.getElementById(upgrade+"UpgradeAmount").textContent = ("You currently own "+armyUpgrades[upgrade]+" "+upgrade+" upgrades")
        document.getElementById(upgrade+"UpgradeAdds").textContent = ("Production increased by "+upgradeAdd+" per "+upgrade)
        document.getElementById(upgrade+"UpgradeButton").textContent = ("Upgrade for $"+upgradePrices[upgrade].toLocaleString())
    }
    armyPerUpdate = calculateIncome() - territoryLoses;
    OfflineIncome(loadSaveTime)
    updateText();
    UpdateWarText(totalWarsWon, totalArmyWon, totalArmyLost);
    CalculateNextWar();
    updateTerritoryText(attackCost, losesCost, nextIncome);
    
}

export function getUnitPrice(name, amount, price){
    let i = 0;
    let totalPrice = 0;
    if (!(name in armyBuildings)){
        if (amount === 1)
            return(price)
        while(i<amount){
            totalPrice += (price+(i*price)/10)
            i++;
        }
    }
    while(i<amount){
        totalPrice += (price+((armyBuildings[name]+i)*price)/10)
        i++;
    }
    return(totalPrice)
}

function updateText(){
    document.getElementById("soldiersText").textContent = ("Army strength: "+ totalArmy.toLocaleString());
    document.getElementById("moneyText").textContent = ("Cash: $"+ totalMoney.toLocaleString());
    armyPerUpdate = calculateIncome() - territoryLoses;
    document.getElementById("soldiersPerUpdateText").textContent = ("+ "+armyPerUpdate.toLocaleString());
}

function updateTerritoryText(attackCost, losesCost, nextIncome){
    document.getElementById("territoryText").textContent = ("Territory: "+ totalTerritory.toLocaleString());
    document.getElementById("incomeText").textContent = ("+ $"+ territoryIncome.toLocaleString());
    document.getElementById("losesText").textContent = ("Loses per cycle: "+ territoryLoses.toLocaleString());
    document.getElementById("attackCostText").textContent = ("Attacking now will require "+attackCost.toLocaleString()+" army forces and take "+losesCost.toLocaleString()+" army to defend and generate $"+nextIncome.toLocaleString()+" income");
}

function GetNowInSeconds(){
    const timeNow = new Date()
    const timeNowInSec = Math.round(timeNow.getTime() / 1000)
    return timeNowInSec
}

function OfflineIncome(savedTime){

    const loadTime = new Date()
    const loadTimeInSec = Math.round(loadTime.getTime() / 1000)

    const secsOffline = loadTimeInSec - savedTime

    if (secsOffline < 30000)
        return
    
    let curArmyPerUpdate = calculateIncome() - territoryLoses;
    let offlineArmy = curArmyPerUpdate*(secsOffline)
    let offlineCash = territoryIncome*(secsOffline)
    totalArmy += offlineArmy;
    totalMoney += offlineCash;

    document.getElementById("offlineIncomeText").textContent = ("While offline you made $"+offlineCash.toLocaleString());
    document.getElementById("offlineArmyText").textContent = ("While offline your army increased by "+offlineArmy.toLocaleString());

    setTimeout(RemoveOfflineText, 30000);
}

function RemoveOfflineText(){
    
    document.getElementById("offlineIncomeText").textContent = ("");
    document.getElementById("offlineArmyText").textContent = ("");
}