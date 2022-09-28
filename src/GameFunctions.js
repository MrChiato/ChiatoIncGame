const timeBetweenUpdates = 1000;

let gameIsStarted = false;

let totalTerritory = 1;
let attackCostIncrease = 1000;
let armyLossIncrease = 2;
let territoryIncome = 0;
let territoryLoses = 0;

let totalMoney = 10000000;

let totalArmy = 0;
let armyPerUpdate = 0;
let curArmyPerUpdate = 0;

export let armyBuildings = {
}

export let armyUpgrades = {
}

let armyValue = {
}

export function startGame(){
    if (gameIsStarted === false){ 
        setInterval(update, timeBetweenUpdates);
        gameIsStarted = true;
    }
}

export function buttonClick(price, value, amount, name, type){ //Make if statements so func can be used for all upgrades
    if (canAfford(price) === false)
        return

    if (type === "Army"){
        buyArmyUpgrade(price, value, amount)
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
            curIncome += ((amountOfBuilding*valueOfBuilding)*(2**amountOfUpgrades))
        else
            curIncome += ((amountOfBuilding*valueOfBuilding))
    }

    return curIncome;
}

function canAfford(price){
    if (totalMoney < price)
        return false
}

function buyArmyUpgrade(price, value, amount){
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
    updateUnitsOwned(name);
    
    document.getElementById(name+"UpgradeHeader").textContent = ("Upgrade "+name+"s")
    document.getElementById(name+"UpgradeAmount").textContent = ("You currently own "+ownedUpgrades+" "+name+" upgrades")
    document.getElementById(name+"UpgradeButton").textContent = ("Buy for $"+nextUpgradePrice.toLocaleString())
}

export function updateUnitsOwned(name){
    let thisArmyBuildings = armyBuildings[name]
    let thisArmyUpgrades = armyUpgrades[name]
    let thisArmyUpgradeValue = 0
    if (thisArmyUpgrades > 0)
        thisArmyUpgradeValue = (thisArmyBuildings*armyValue[name] )*(2**thisArmyUpgrades);
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
    if (curArmyPerUpdate < (attackCost/10))
        return
    
    totalArmy -= attackCost;
    totalTerritory += 1;
    territoryIncome += attackCost*totalTerritory
    territoryLoses += attackCost/10

    attackCost = (totalTerritory**2)*attackCostIncrease;
    let losesCost = (attackCost/1000)**armyLossIncrease
    let nextIncome = attackCost*(totalTerritory+1)

    updateText();
    updateTerritoryText(attackCost, losesCost, nextIncome);
}

function saveToStorage(){

}

function loadFromStorage(){

}

function updateText(){
    document.getElementById("soldiersText").textContent = ("Army strength: "+ totalArmy.toLocaleString());
    document.getElementById("moneyText").textContent = ("Cash: $"+ totalMoney.toLocaleString());
    document.getElementById("soldiersPerUpdateText").textContent = ("Army per cycle: "+armyPerUpdate.toLocaleString());
}

function updateTerritoryText(attackCost, losesCost, nextIncome){
    document.getElementById("territoryText").textContent = ("Territory: "+ totalTerritory.toLocaleString());
    document.getElementById("incomeText").textContent = ("Income: $"+ territoryIncome.toLocaleString());
    document.getElementById("losesText").textContent = ("Loses per cycle: "+ territoryLoses.toLocaleString());
    document.getElementById("attackCostText").textContent = ("Attacking now will require "+attackCost.toLocaleString()+" army forces and take "+losesCost.toLocaleString()+" army to defend and generate $"+nextIncome.toLocaleString()+" income");
}