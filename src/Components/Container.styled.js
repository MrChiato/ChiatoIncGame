import { Component } from "react";
import styled from "styled-components";
import Building from "./Building";
import Upgrade from "./Upgrades";

export const TopContainer = styled.div`
    display:flex;
    flex-direction: column;
`

export const Container = styled.div`
    display: flex;
    background: white;
    justify-content: center;
`

export const BuildPanelContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`


export const SavePanelContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-self: flex-end;
    justify-content: flex-end;
    flex: 1;
`

export const TerritoryPanelContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

export const TerritoryPanelInnerContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 50px;
    padding: 20px;
    border: 2px solid black;
`

export const BuildingContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 5px;
    margin-top: 10px;
    border: 1px solid black;
    background: white;
    box-shadow: 5px 5px grey;
    flex: 1;
`

export const UpgradeContainer = styled.div`
    display: flex;
    visibility: hidden;
    flex-direction: column;
    align-items: center;
    margin: 5px;
    margin-top: 10px;
    border: 1px solid black;
    background: white;
    box-shadow: 5px 5px grey;
    flex: 1;
`

export const BuildingUpgradeContainer = styled.div`
    display: flex;
    visibility: hidden;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    flex: 1;
    margin: 5px;
    margin-top: 10px;
    width: 100%;
    background: white;
`
export const TabButtons = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
`

export const SettingsContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    text-align: center;
`

export const CheckBoxInput = styled.input`
    cursor: pointer;
    height: 20px;
    width: 20px;
`

export const TabContainer = styled.div`
    display: none;
`

export class BUContainer extends Component{
    render(){
        return(
            <BuildingUpgradeContainer className="BUContainer" id={this.props.name+"BUContainer"} name={this.props.name+"BUContainer"} price={this.props.price} data-sprice={this.props.price} data-suprice={this.props.upgradePrice}>
                <Building name={this.props.name} amount={1} price={this.props.price} value={this.props.value} type="Army" unit={this.props.unit}/>
                <Upgrade name={this.props.name} price={this.props.upgradePrice}/>
            </BuildingUpgradeContainer>
        )
    }
}
