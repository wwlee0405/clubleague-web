import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

export const lightTheme = {
  accent: "#0095f6",
  bgColor: "#FAFAFA",
  fontColor: "rgb(38, 38, 38)",
  borderColor: "rgb(219, 219, 219)",

  emerald: "#51c878",
  symbolColor: "#2e8b57",
  primary: 'rgb(255, 45, 85)',
  background: "#f8f9fa",
  cardHeader: "#ffffff",
  cardContent: "#f1f3f5",
  text: "#000",
  subText: "#999",
  hover: "#DEE2E6",
  border: "#e9ecef",
  notification: 'rgb(255, 69, 58)',
  placeholder: "#9a9ea4",
  descriptionText: "#818892",
  buttonBackground: "#f1f3f5",
  yellow: "#fbbc05",
  blue: "#0095F6",
  white: "#FFFFFF",
  grey03: "#DEE2E6",
  black: "#000",

  headerColor: "#FFFFFF",
  headerHight: "75px"
};

export const darkTheme = {
  accent: "#0095f6",
  fontColor: "white",
  bgColor: "#000",
  borderColor: "#999",
  
  emerald: "#51c878",
  symbolColor: "#2e8b57",
  primary: 'rgb(255, 45, 85)',
  background: 'black',
  cardHeader: "#495057",
  cardContent: "#343a40",
  text: "#ced4da",
  subText: "#999",
  hover: "#DEE2E6",
  border: "#495057",
  notification: 'rgb(255, 69, 58)',
  placeholder: "#9a9ea4",
  descriptionText: "#9cabc2",
  buttonBackground: "#344457",
  yellow: "#fbbc05",
  blue: "#0095F6",
  white: "#FFFFFF",
  grey03: "#DEE2E6",
  black: "#000",

  headerColor: "#000",
  headerHight: "75px"
};

export const GlobalStyles = createGlobalStyle`
    ${reset}
    input {
      all:unset;
    }
    * {
      box-sizing:border-box;
    }
    body {
        background-color: ${props => props.theme.bgColor};
        font-size:14px;
        font-family:'Open Sans', sans-serif;
        color: ${props => props.theme.fontColor};
    }
    a {
      text-decoration: none;
      color:inherit;
    }
`;