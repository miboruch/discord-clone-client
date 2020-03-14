import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    margin: 0;
  }
  
  html {
    font-size: 62.5%;
  }
  
  body {
    margin: 0;
    font-weight: 500;
    font-size: 1.6rem;
    font-family: Futura;
  }
  
  a{
    text-decoration: none;
  }
`;

export default GlobalStyle;
