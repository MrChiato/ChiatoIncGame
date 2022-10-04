import { LoadSavedData } from "./GameFunctions"


function CreateStringData(){
    let loadedData = JSON.parse(window.localStorage.getItem("Save"))
    let fullString = ""
    let i = 0
    let cc = 0;
    let stringCheck = "";
    for (let element in loadedData){
        let stringElement = JSON.stringify(element)
        let stringValue = JSON.stringify(loadedData[element])
        if (i === 0)
            fullString += (stringElement+":"+stringValue+"")
        else
            fullString += (","+stringElement+":"+stringValue+"")
        i++
    }
    stringCheck = fullString.replace(/\D/g,'')
    parseInt(stringCheck)
    let sum = 0;
    while(stringCheck){
        sum += stringCheck%10;
        stringCheck = Math.floor(stringCheck/10)
    }
    fullString += (",\"cc\":"+sum)
    return(fullString)
}

function LoadStringData(inputString){
    inputString = ("{"+inputString+"}")
    let LoadedString = JSON.parse(inputString)
    let ccCheckSum = CheckForCheat(inputString)

    if (ccCheckSum !== LoadedString["cc"]){
        document.getElementById("LoadStringBug").textContent = "Input doesn't match the save"
        return
    }
    document.getElementById("LoadStringBug").textContent = ""
    LoadSavedData(LoadedString)
}

export function ShowStringInField(){
    document.getElementById("SaveStringInput").value = CreateStringData()
}

export function LoadStringButton(){
    let userInput = document.getElementById("LoadStringInput").value
    if (!(document.getElementById("LoadStringInput").value)){
        document.getElementById("LoadStringBug").textContent = "Input can't be empty, are you trying to break your save?!"
        return
    }
    if (userInput[0] !== "\""){
        document.getElementById("LoadStringBug").textContent = "You must input a save string!"
        return
    }
    LoadStringData(userInput)
}

function CheckForCheat(stringCheck){
    let sum = 0;
    stringCheck = stringCheck.slice(0, -5)
    stringCheck = stringCheck.replace(/\D/g,'')
    while(stringCheck){
        sum += stringCheck%10;
        stringCheck = Math.floor(stringCheck/10)
    }
    return sum
}
