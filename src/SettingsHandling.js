import { armyPrices, startingValues, upgradePrices } from "./App";
import { armyBuildings, armyUpgrades, armyValue, getUnitPrice, saveUpgradePrices } from "./GameFunctions";

export let detailedStats = false;

export function SaveSettings(){
    let data = {
        detailedStats: detailedStats
    }
    window.localStorage.setItem("Settings", JSON.stringify(data))
}

export function LoadSettings(){
    let loadedData = JSON.parse(window.localStorage.getItem("Settings"))
    if(loadedData === null){
        detailedStats = false
        return
    }
    detailedStats = loadedData["detailedStats"]
    if (detailedStats == true)
        document.getElementById("detailedSettingsBox").checked = true
    UpdateDetailedText()
}

export function EnableDetailedStats(){
    if(document.getElementById("detailedSettingsBox").checked)
        detailedStats = true;
    else
        detailedStats = false;

        
    UpdateDetailedText()
    SaveSettings();
}

export function UpdateDetailedText(){
    if (detailedStats == false){
        DisableDetailedText()
        return
    }
        

    let detailedBuildingText, detailedUpgradeText, thisUnitValue, thisUnitPrice, thisUnitPriceEf, descBuildingText, upgEf, thisUpgradesAmount, thisUpgPrice

    for (let building in armyPrices){
        detailedBuildingText = document.getElementById(building+"detailedStats")
        descBuildingText = document.getElementById(building+"descText")
        detailedUpgradeText = document.getElementById(building+"detailedUpgStats")

        if (building in armyUpgrades){
            thisUpgradesAmount = armyUpgrades[building]
        }
        else{
            thisUpgradesAmount = 0
            
        }

        if (building in saveUpgradePrices){
            thisUpgPrice = saveUpgradePrices[building]
        }
        else{
            thisUpgPrice = upgradePrices[building]
        }

        thisUnitValue = startingValues[building]*(thisUpgradesAmount+1)
        thisUnitPrice = getUnitPrice(building, 1, armyPrices[building])
        thisUnitPriceEf = Math.round(((thisUnitValue/thisUnitPrice)*10000)*100)/100

        upgEf = Math.round((((startingValues[building])*armyBuildings[building])/thisUpgPrice*100000)*100)/100

        descBuildingText.textContent = ""
        detailedBuildingText.textContent = ("Each "+building+" increases army strength by "+thisUnitValue+". You gain "+thisUnitPriceEf+" army strength per $10.000")
        detailedUpgradeText.textContent = ("Upgrading now will increase army strength by "+upgEf+" per $100.000")
    }
    
}

function DisableDetailedText(){
    for (let building in armyPrices){
        let detailedBuildingText = document.getElementById(building+"detailedStats")
        let descBuildingText = document.getElementById(building+"descText")
        let detailedUpgradeText = document.getElementById(building+"detailedUpgStats")

        detailedBuildingText.textContent = ""
        detailedUpgradeText.textContent = ""
        descBuildingText.textContent = ("Each "+building+" increases army strength by "+startingValues[building])
    }
}


