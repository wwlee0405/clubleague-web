import { OrbitProgress } from "react-loading-indicators";
import styled from "styled-components";

const ButtonTouchable = styled.div`
  border: none;
  border-radius: 5px;
  background-color: ${(props) => (props.buttoncolor.main)};
  text-align: center;
  padding: 10px;
  font-weight: 600;
  width: 100px;
  opacity: ${(props) => (props.disabled ? "0.2" : "1")};
  cursor: pointer;
`;
const ButtonText = styled.span`
  color: ${(props) => (props.textcolor.main)};
  text-align: center;
`;
ButtonTouchable.defaultProps = {
  buttoncolor: {
    main: (props) => props.theme.blue
  }
}
ButtonText.defaultProps = {
  textcolor: {
    main: (props) => props.theme.white
  }
}

export default function ActionButton({
  onClick,
  boxColor,
  disabled,
  loading,
  textcolor,
  text,
}) {
  return (
    <ButtonTouchable onClick={onClick} buttoncolor={boxColor} disabled={disabled}>
      {loading ? (
        <OrbitProgress color="white" style={{ fontSize: "2px" }} />
      ) : (
        <ButtonText textcolor={textcolor}>{text}</ButtonText>
      )}
    </ButtonTouchable>
  );
}
