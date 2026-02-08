import styled from "styled-components";

const Input = styled.input`
  width: 100%;
  border-radius: 3px;
  padding: 7px;
  background-color: ${(props) => props.theme.cardHeader};
  border: 0.5px solid
    ${(props) => (props.haserror ? "tomato" : props.theme.borderColor)};
  margin-top: 5px;
  box-sizing: border-box;
  &::placeholder {
    font-size: 12px;
    color: ${(props) => props.theme.subText};
  }
  &:focus {
    border-color: rgb(38, 38, 38);
  }
`;

export default Input;