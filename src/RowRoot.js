import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import { logUserOut } from "./apollo"
import { useNavigate } from "react-router-dom";
import useModal from './hooks/useModal';
import Header from "./components/Header";
import { faUser, faMoon, faFile, faPaperPlane, faHeart } from "@fortawesome/free-regular-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { MainText, SubText } from "./components/shared";

const Container = styled.div`
  background-color: ${(props) => props.theme.bgColor};
`;
const Form = styled.div`
  // 모바일 (767px 이하) 스타일
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  background-color: ${(props) => props.theme.bgColor};

  // 데스크톱 (768px 이상) 스타일
  @media (min-width: 768px) {
    flex-direction: row;
  }
`;
const UserContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 700px;
  max-width: 768px;
  background-color: ${(props) => props.theme.bgColor};
  border: 1px solid ${(props) => props.theme.border};
  padding: 20px 40px;
`;
const Title = styled(MainText)`
  font-size: 20px;
  font-weight: 600;
`;
const TextWrep = styled.div`
  margin-top: 20px;
  border-radius: 5px;
  padding: 10px 10px;
  cursor: pointer;
  &:hover,
  &:focus {
    background-color: ${(props) => props.theme.hover};
  }
`;
const Text = styled(MainText)`
  font-size: 17px;
  padding-left: 10px;
`;

function RowRoot() {
  const { Modal: Trans_Langs, open: trans_Langs_Open, close: trans_Langs_Close } = useModal();
  
  const navigate = useNavigate();
  const logOut = () => {
    navigate(`/`);
    logUserOut();
  };
  return (
    <Container>
      <Header />
      
      <Form>
        <UserContainer>
          <Title>Profile</Title>

          <Link to={`/settings/profile`}>
            <TextWrep>
              <FontAwesomeIcon icon={faUser} />
              <Text>Update Profile</Text>
            </TextWrep>
          </Link>

          <TextWrep>
            <FontAwesomeIcon icon={faFile} />
            <Text>Account - username, email</Text>
          </TextWrep>

          <Link to={`/settings/darkmode`}>
            <TextWrep>
              <FontAwesomeIcon icon={faMoon} />
              <Text>Dark mode</Text>
            </TextWrep>
          </Link>

          <TextWrep onClick={trans_Langs_Open}>
            <FontAwesomeIcon icon={faPaperPlane} />
            <Text>Language</Text>
          </TextWrep>
          <Trans_Langs>
            <Text>English</Text>
            <Text>한국어</Text>
            <Text>日本語</Text>
          </Trans_Langs>
        
          <Title>Sign out</Title>

          <TextWrep onClick={logOut}>
            <FontAwesomeIcon icon={faHeart} />
            <Text>Sign out</Text>
          </TextWrep>

        </UserContainer>
        <Outlet />        
      </Form>
    </Container>
  );
}

export default RowRoot;
