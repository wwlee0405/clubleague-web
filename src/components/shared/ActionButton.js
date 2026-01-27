import { OrbitProgress } from "react-loading-indicators";
import styled from "styled-components";

const ButtonTouchable = styled.div`
  border: none;
  border-radius: 5px;
  background-color: ${props => props.$buttoncolor};
  text-align: center;
  padding: 10px;
  font-weight: 600;
  width: 100px;
  opacity: ${(props) => (props.disabled ? "0.2" : "1")};
  cursor: pointer;
`;
const ButtonText = styled.span`
  color: ${props => props.$textcolor};
  text-align: center;
`;

export default function ActionButton({
  onClick,
  $buttoncolor,
  disabled,
  loading,
  $textcolor,
  text,
}) {
  return (
    <ButtonTouchable onClick={onClick} $buttoncolor={$buttoncolor} disabled={disabled}>
      {loading ? (
        <OrbitProgress color="white" style={{ fontSize: "2px" }} />
      ) : (
        <ButtonText $textcolor={$textcolor}>{text}</ButtonText>
      )}
    </ButtonTouchable>
  );
}
