import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  *{
    margin:0;
    padding:0;
    box-sizing:border-box;
  }
  html,body, #root{
    height: 100%;
    min-height: 100%;
  }
  body{
    font-family: Arial, Helvetica, sans-serif;
    background: #f1f1f1;
    -webkit-font-smoothing: antialiased !important;
  }
  input, button{
    font-family: Arial, Helvetica, sans-serif;
  }
`;
