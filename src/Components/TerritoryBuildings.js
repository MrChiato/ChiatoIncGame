import { Component } from "react";
import  { Button } from "./Button.styled";
import {  buttonClick, updateUnitsOwned } from "../GameFunctions";
import { UpgradeText, UpgradeInfoText, UpgradeDescText, DetailText } from "./StyledText.styled"
import { BuildingContainer } from "./Container.styled"
import {Input} from "./Forms.styled";




class TerritoryBuilding extends Component{
    handleClick(){
        buttonClick(this.props.price, this.props.value, this.props.amount, this.props.name, this.props.type);
        updateUnitsOwned(this.props.name)
    }
    render(){
        return(
            <BuildingContainer>  
                <UpgradeText >Build {this.props.name}</UpgradeText>
                <UpgradeDescText >{this.props.name}s recruit {this.props.unit}s on your new territorys</UpgradeDescText>
                <UpgradeDescText >You can only build 1 {this.props.name} per war you have won</UpgradeDescText>
                <DetailText id={this.props.name+"offlineStat"}></DetailText>
                <UpgradeDescText id={this.props.name+"descText"}>Each {this.props.unit} increases {this.props.type} strength by {this.props.value.toLocaleString()}</UpgradeDescText>
                <UpgradeInfoText id={this.props.name}>You currently own 0 {this.props.name}s</UpgradeInfoText>
                <UpgradeInfoText id={this.props.name+"perCycle"}>Army increased by 0 per cycle</UpgradeInfoText>
                <Input id={this.props.name+"input"} type="number" placeholder="Amount..." hidden onChange={() => this.handleInputChange(this.props.name)}></Input>
                <Button id={this.props.name+"button"} onClick={() => this.handleClick()}>Build {this.props.amount} for ${this.props.price.toLocaleString()}</Button>
            </BuildingContainer>
        )
    }  
}

export default TerritoryBuilding;