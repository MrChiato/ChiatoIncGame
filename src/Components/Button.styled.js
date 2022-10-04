import { render } from "@testing-library/react";
import { Component } from "react";
import styled from "styled-components";
import { TabClick } from "../TabHandling";

export const Button = styled.button`
    border-radius: 50px;
    border: 2px solid grey;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
    cursor: pointer;
    font-size: 16px;
    font-weight: 700;
    padding: 15px 20px;
    margin: 10px;
    background-color: ${({bg}) => bg || 'white'};
    color: ${({color}) => color || 'black'};

    &:hover{
        opacity: 0.8;
        border: 2px solid black;
    }
    &:active{
        transform: scale(0.95);
    }
    &:disabled{
        opacity: 0.3;
    }
`

export const SettingsButton = styled.button`
    border-radius: 50px;
    border: 2px solid grey;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
    cursor: pointer;
    font-size: 16px;
    font-weight: 700;
    padding: 15px 20px;
    margin: 10px;
    width: 50%;
    background-color: ${({bg}) => bg || 'white'};
    color: ${({color}) => color || 'black'};

    &:hover{
        opacity: 0.8;
        border: 2px solid black;
    }
    &:active{
        transform: scale(0.95);
    }
    &:disabled{
        opacity: 0.3;
    }
`

const TabButton = styled.button`
    border-radius: 10px;
    border: 2px solid grey;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
    cursor: pointer;
    font-size: 16px;
    font-weight: 700;
    padding: 15px 20px;
    margin: 10px;
    background-color: white;
    color: black;

    &:hover{
        opacity: 0.8;
        border: 2px solid black;
    }
    &:active{
        border: 2px solid black;
        background-color: white;
    }
    &:disabled{
        opacity: 0.3;
    }
    &:buttonActive{
        border: 2px solid black;
        background-color: white;
    }
`

export class ChangeTabButton extends Component{
    render(){
        return(
            <TabButton className="TabButtons" id={this.props.name+"TabButton"} onClick={() => TabClick(this.props.name, this.props.name+"TabButton")}>{this.props.name}</TabButton>
        )
    }
}
