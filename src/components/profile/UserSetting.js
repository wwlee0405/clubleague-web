import { gql, useReactiveVar } from "@apollo/client";
import styled from "styled-components";
import { logUserOut } from "../../apollo"
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { darkModeVar, disableDarkMode, enableDarkMode } from "../../apollo";
import { faSun, faMoon } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FatText, MainText, SubText } from "../shared";

const ColumnContainer = styled.div`
  display: flex;
  flex-direction: column;

  background-color: ${(props) => props.theme.cardHeader};
  border-radius: 15px;
  border: 1px solid ${(props) => props.theme.border};
  max-width: 615px;
  margin: 20px 10px;
  padding: 10px 0px;
`;
const RowContainer = styled.div`
  display: flex;
  flex-direction: row;
  background-color: ${(props) => props.theme.cardHeader};
  border-radius: 15px;
  border: 1px solid ${(props) => props.theme.border};
  margin-bottom: 20px;
  padding: 20px;
`;
const Title = styled(FatText)`
  font-size: 20px;
  padding-left: 20px;
  padding-bottom: 20px;
  `;
const TextWrep = styled.div`
  padding: 10px 20px;
  cursor: pointer;
  &:hover,
  &:focus {
    background-color: ${(props) => props.theme.hover};
  }
`;
const Text = styled(MainText)`
  font-size: 15px;
`;
const DarkModeBtn = styled.span`
  cursor: pointer;
`;

function UserSetting() {
  const darkMode = useReactiveVar(darkModeVar);

  const navigate = useNavigate();
  const logOut = () => {
    navigate(`/`);
    logUserOut();
  }
  return (
    <div>
      <Title>User Setting</Title>
      <ColumnContainer>
        <TextWrep onClick={logOut}>
          <Text>Log out</Text>
        </TextWrep>
        
        <TextWrep>
          <Text>Me</Text>
        </TextWrep>
        
        <RowContainer $primary>
          <DarkModeBtn onClick={darkMode ? disableDarkMode : enableDarkMode}>
            <FontAwesomeIcon icon={darkMode ? faSun : faMoon} />
            <Text>{ darkMode ? 'switch to light' : 'switch to dark' }</Text>
          </DarkModeBtn>
        </RowContainer>
      </ColumnContainer>

    </div>
  );
}
export default UserSetting;