import { ShowNextBuildingContainer } from "./BuildingVisibilityHandling";


export function TabClick(buttonClicked, buttonId){
    let totalTabs = document.getElementsByClassName("TabContainers");
    let totalButtons = document.getElementsByClassName("TabButtons");
    for (let i = 0; i<totalTabs.length; i++){
        if (totalTabs[i].id === buttonClicked){
            totalTabs[i].style.display = "block"
        }
        else{
            totalTabs[i].style.display = "none"
        }
    }

    for (let i = 0; i<totalButtons.length; i++){
        if (totalButtons[i].id === buttonId)
            ActiveButtonStyle(buttonId)
        else
            InactiveButtonStyle(totalButtons[i].id)
    }
    if (buttonClicked === "Buildings"){
        ShowNextBuildingContainer(0);
    }
}

function ActiveButtonStyle(Id){
    let thisButton = document.getElementById(Id);
    thisButton.style.border = "2px solid black"
}

function InactiveButtonStyle(Id){
    let thisButton = document.getElementById(Id);
    thisButton.style.border = "2px solid grey"
}