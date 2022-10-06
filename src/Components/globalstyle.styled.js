import { createGlobalStyle } from "styled-components";



export const GlobalStyle = createGlobalStyle`
body {
    filter: invert(${({dm}) => dm || '0%'})
}
`