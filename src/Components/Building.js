import { Component } from "react";
import  { Button } from "./Button.styled";
import { buttonClick,getUnitPrice } from "../GameFunctions";
import { UpgradeText, UpgradeInfoText, UpgradeDescText } from "./StyledText.styled"
import { BuildingContainer } from "./Container.styled"
import {Input} from "./Forms.styled";
import {updateUnitsOwned} from "../GameFunctions";




class Building extends Component{
    handleClick(price, value, amount, name, type){
        if (document.getElementById(name+"input").value > 1){
            amount = parseInt(document.getElementById(name+"input").value)
            buttonClick(price, value, amount, name, type);
        }
        else{
            buttonClick(price, value, amount, name, type);
        }
        
        updateUnitsOwned(name)

    }
    handleInputChange(name){
        let userInputAmount = parseInt(document.getElementById(name+"input").value); 
        let userInputValue = this.props.price;
        if (userInputAmount > 1 && userInputAmount < 10000){
            userInputValue = getUnitPrice(name, userInputAmount, this.props.price)
            document.getElementById(name+"button").textContent = ("Build "+userInputAmount.toLocaleString()+" for $"+userInputValue.toLocaleString())
        }
        else{
            userInputAmount = 1;
            userInputValue = getUnitPrice(name, userInputAmount, this.props.price)
            document.getElementById(name+"button").textContent = ("Build "+userInputAmount.toLocaleString()+" for $"+userInputValue.toLocaleString())
        }
    }
    render(){
        return(
            <BuildingContainer>  
                <UpgradeText >Build {this.props.name}</UpgradeText>
                <UpgradeDescText >{this.props.name}s create {this.props.unit}s for your army</UpgradeDescText>
                <UpgradeDescText >Each {this.props.unit} increases {this.props.type} strength by {this.props.value.toLocaleString()}</UpgradeDescText>
                <UpgradeInfoText id={this.props.name}>You currently own 0 {this.props.name}s</UpgradeInfoText>
                <UpgradeInfoText id={this.props.name+"perCycle"}>Army increased by 0 per cycle</UpgradeInfoText>
                <Input id={this.props.name+"input"} type="number" placeholder="Amount..." onChange={() => this.handleInputChange(this.props.name)}></Input>
                <Button id={this.props.name+"button"} onClick={() => this.handleClick(this.props.price, this.props.value, this.props.amount, this.props.name, this.props.type)}>Build {this.props.amount} for ${this.props.price.toLocaleString()}</Button>
            </BuildingContainer>
        )
    }  
}

export default Building;