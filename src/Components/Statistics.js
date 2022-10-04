import { Component } from "react";
import styled from "styled-components";

const StatsContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
`

const StatsText = styled.span`
    margin-top: 5px;
    font-size: 20px;
    font-weight: 500;
    text-align: left;

`
const StatsHeaderText = styled.span`
    margin: 15px;
    font-size: 40px;
    font-weight: 700;
    text-align: center;
`


export class Stats extends Component{


    render(){
        return(
          <StatsContainer>
            <StatsHeaderText>Statistics</StatsHeaderText>
            <StatsText>Coming soon..</StatsText>
            <StatsText>Coming soon..</StatsText>
            <StatsText>Coming soon..</StatsText>
            <StatsText>Coming soon..</StatsText>
            <StatsText>Coming soon..</StatsText>
          </StatsContainer>  
        )
    }
}