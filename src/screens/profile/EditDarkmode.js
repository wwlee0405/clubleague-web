import { useReactiveVar } from "@apollo/client";
import styled from "styled-components";
import { darkModeVar, disableDarkMode, enableDarkMode } from "../../apollo";
import { faSun, faMoon } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { MainText } from "../../components/shared";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 30px 40px;
`;
const Title = styled(MainText)`
  font-size: 28px;
  font-weight: 600;
  margin-bottom: 20px;
`;
const ButtonWrep = styled.div`
  background-color: ${(props) => props.theme.cardHeader};
  border-radius: 10px;
  border: 1px solid ${(props) => props.theme.border};
  padding: 20px;
  cursor: pointer;
  &:hover,
  &:focus {
    background-color: ${(props) => props.theme.hover};
  }
`;
const Text = styled(MainText)`
  font-size: 15px;
  padding-left: 10px;
`;

function EditDarkmode() {
  const darkMode = useReactiveVar(darkModeVar);
  return (
    <Container>
        
      <Title>Dark mode</Title>

      <ButtonWrep onClick={darkMode ? disableDarkMode : enableDarkMode}>
        <FontAwesomeIcon icon={darkMode ? faSun : faMoon} />
        <Text>{ darkMode ? 'Switch to light' : 'Switch to dark' }</Text>
      </ButtonWrep>

    </Container>
  );
}
export default EditDarkmode;