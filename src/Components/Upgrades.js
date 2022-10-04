import { Component } from "react";
import  { Button } from "./Button.styled";
import { UpgradeText, UpgradeInfoText, UpgradeDescText, DetailText } from "./StyledText.styled";
import { UpgradeContainer } from "./Container.styled";
import { upgradeButtonClicked } from "../GameFunctions";

class Upgrade extends Component{
    handleClick(){
        upgradeButtonClicked(this.props.name, this.props.price);
    }
    render(){
        return(
            <UpgradeContainer className="UpgContainer">
                <UpgradeText id={this.props.name+"UpgradeHeader"}>Upgrade {this.props.name}s</UpgradeText>
                <UpgradeDescText id={this.props.name+"UpgradeDesc"}>Upgrade your {this.props.name}s</UpgradeDescText>
                <UpgradeDescText id={this.props.name+"UpgradeValue"}>Each upgrade doubles the starting {this.props.name}s production</UpgradeDescText>
                <UpgradeInfoText id={this.props.name+"UpgradeAmount"}>You currently own 0 {this.props.name} upgrades</UpgradeInfoText>
                <UpgradeInfoText id={this.props.name+"UpgradeAdds"}>Production increased by 0 per {this.props.name}</UpgradeInfoText>
                <DetailText id={this.props.name+"detailedUpgStats"}></DetailText>
                <Button id={this.props.name+"UpgradeButton"} onClick={() => this.handleClick()}>Upgrade for ${this.props.price.toLocaleString()}</Button>
            </UpgradeContainer>
        )
    }
}

export default Upgrade;