import { OrbitProgress } from "react-loading-indicators";
import styled from "styled-components";

const ButtonTouchable = styled.div`
  border: none;
  border-radius: 5px;
  background-color: ${(props) => (props.buttonColor.main)};
  text-align: center;
  padding: 10px;
  font-weight: 600;
  width: 100px;
  opacity: ${(props) => (props.disabled ? "0.2" : "1")};
  cursor: pointer;
`;
const ButtonText = styled.span`
  color: ${(props) => (props.textColor.main)};
  text-align: center;
`;
ButtonTouchable.defaultProps = {
  buttonColor: {
    main: (props) => props.theme.blue
  }
}
ButtonText.defaultProps = {
  textColor: {
    main: (props) => props.theme.white
  }
}

export default function ActionButton({
  onClick,
  buttonColor,
  disabled,
  loading,
  textColor,
  text,
}) {
  return (
    <ButtonTouchable onClick={onClick} buttonColor={buttonColor} disabled={disabled}>
      {loading ? (
        <OrbitProgress color="white" style={{ fontSize: "2px" }} />
      ) : (
        <ButtonText textColor={textColor}>{text}</ButtonText>
      )}
    </ButtonTouchable>
  );
}
