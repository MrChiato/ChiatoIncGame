import styled from "styled-components";

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
