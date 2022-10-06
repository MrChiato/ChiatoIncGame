import { ChangeTabButton } from "./Components/Button.styled";
import { LoadSavedData, setArmy, setMoney, totalArmy, totalMoney } from "./GameFunctions"


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
    for(let char in stringCheck){
        sum += (stringCheck[char]+1)*7
    }
    fullString += (",\"ccccccc\":"+sum)
    return(fullString)
}



function LoadStringData(inputString){
    inputString = ("{"+inputString+"}")
    let LoadedString = JSON.parse(inputString)
    let ccCheckSum = CheckForCheat(inputString)

    if (ccCheckSum !== LoadedString["ccccccc"]){
        document.getElementById("LoadStringBug").textContent = "Input doesn't match the save"
        return
    }
    document.getElementById("LoadStringBug").textContent = ""
    LoadSavedData(LoadedString)
}

export function ShowStringInField(){
    document.getElementById("SaveStringInput").value = CreateStringData()
}

function Cheat(){
    setArmy(99999999)
    setMoney(99999999999)
}

export function LoadStringButton(){
    let userInput = document.getElementById("LoadStringInput").value
    if (userInput === "iamgoingtocheat"){
        Cheat();
        return
    }
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
    stringCheck = stringCheck.slice(0, -10)
    stringCheck = stringCheck.replace(/\D/g,'')
    for(let char in stringCheck){
        sum += (stringCheck[char]+1)*7
    }
    return sum
}
