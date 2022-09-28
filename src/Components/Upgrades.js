import { Component } from "react";
import  { Button } from "./Button.styled";
import { UpgradeText, UpgradeInfoText, UpgradeDescText } from "./StyledText.styled";
import { UpgradeContainer,BuildingContainer } from "./Container.styled";
import { upgradeButtonClicked } from "../GameFunctions";

class Upgrade extends Component{
    handleClick(){
        upgradeButtonClicked(this.props.name, this.props.price);
    }
    render(){
        return(
            <UpgradeContainer>
                <UpgradeText id={this.props.name+"UpgradeHeader"}>Upgrade {this.props.name}s</UpgradeText>
                <UpgradeDescText id={this.props.name+"UpgradeDesc"}>Upgrade your {this.props.name}s</UpgradeDescText>
                <UpgradeDescText id={this.props.name+"UpgradeValue"}>Each upgrade doubles {this.props.name}s production</UpgradeDescText>
                <UpgradeInfoText id={this.props.name+"UpgradeAmount"}>You currently own 0 {this.props.name} upgrades</UpgradeInfoText>
                <Button id={this.props.name+"UpgradeButton"} onClick={() => this.handleClick()}>Buy for ${this.props.price.toLocaleString()}</Button>
            </UpgradeContainer>
        )
    }
}

export default Upgrade;