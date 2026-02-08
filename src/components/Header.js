import React, { useState } from "react";
import { useReactiveVar } from "@apollo/client";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faPaperPlane, faBell } from "@fortawesome/free-regular-svg-icons";
import { faHome, faDisplay, faCamera, faMagnifyingGlass, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { isLoggedInVar } from "../apollo";
import styled from "styled-components";
import useUser from "../hooks/useUser";
import routes from "../routes";
import { HeaderStyle, MainText } from "./shared";
import useVanillaModal from '../hooks/useVanillaModal';
import HeaderSearch from "./HeaderSearch";
import Notification from "./Notification";
import Avatar from "./shared/Avatar";

const HeaderContainer = styled(HeaderStyle)`
  position: sticky;
  z-index: 10;
  top: 0;
  width: 100%;
  height: ${(props) => props.theme.headerHight};
  border-bottom: 1px solid ${(props) => props.theme.borderColor};
  padding: 18px 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.theme.barColor};
`;
const Wrapper = styled.div`
  max-width: 1300px;
  //max-width: 930px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const Row = styled.div`
  display: flex;
  flex-direction: row;
`;
const IconBox = styled.div`
  display: flex;
  height: 40px;
  width: 40px;
  border-radius: 50%;
  background-color: ${(props) => props.theme.border};
  justify-content: center;
  align-items: center;
  margin-left: 20px;
  cursor: pointer;
  &:hover,
  &:focus {
    background-color: ${(props) => props.theme.hover};
  }
`;
const CreateModalContainer = styled.div`
  padding: 10px 0px;
  border-radius: 10px;
  justify-content: center;
  background-color: ${(props) => props.theme.cardContent};
  width: 170px;
  margin-top: 57px;
  margin-left: 135px;
`;
const CreateModalTextWrep = styled.div`
  padding: 8px 20px;
  &:hover,
  &:focus {
    background-color: ${(props) => props.theme.hover};
  }
  cursor: pointer;
`;
const CreateModalText = styled(MainText)`
  font-size: 16px;
`;
const CursorIcon = styled.div`
  cursor: pointer;
`;
const IconsContainer = styled.div`
  display: flex;
  align-items: center;
`;
const Icon = styled.span`
  margin-left: 20px;
  transition: 0.5s;
  &:hover,
  &:focus {
    color: ${(props) => props.theme.symbolColor};
  }
  &:active {
    color: ${(props) => props.theme.accent};
  }
  cursor: pointer;
`;
const NotiModalContainer = styled.div`
  margin-top: 57px;
  margin-right: 20px;
`;
const IconBackup = styled.span`
  margin-left: 30px;
  transition: 0.5s;
  &:hover,
  &:focus {
    color: ${(props) => props.theme.symbolColor};
  }
  &:active {
    color: ${(props) => props.theme.accent};
  }
  ${(props) => {
    switch (props.$mode) {
      case "dark" : 
        return `
        backround-color: black;
        color: white;
        ${Link} : checked + && {
        color: blue;
        }
        `;
      default:
        return `
        background-color: white;
        color: red;
        ${Link} : checked + && {
        color: yellow;
        }
        `;
    }
  }
  }

`;
const Button = styled.span`
  background-color: ${(props) => props.theme.accent};
  border-radius: 4px;
  padding: 4px 15px;
  color: white;
  font-weight: 600;
`;

function Header() {
  const [homeColor, setHomeColor] = useState({ color: "yellow" });
  const [matchColor, setMatchColor] = useState({ color: "yellow" });

  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const { data } = useUser();
  const { VanillaModal: SearchModal, vanillaOpen: searchOpen, vanillaClose: searchClose } = useVanillaModal();
  const { VanillaModal: CreateModal, vanillaOpen: createOpen, vanillaClose: createClose } = useVanillaModal();
  const { VanillaModal: NotiModal, vanillaOpen: notiOpen, vanillaClose: notiClose } = useVanillaModal();

  return (
    <HeaderContainer>
      <Wrapper>
        <Row>
          <FontAwesomeIcon icon={faInstagram} size="3x" />

          <IconBox onClick={searchOpen}>
            <CursorIcon>
              <FontAwesomeIcon icon={faMagnifyingGlass} fontSize="18px" />  
            </CursorIcon>
          </IconBox>
          <SearchModal onClick={(e) => e.stopPropagation()}>
            <HeaderSearch onClose={searchClose} />
          </SearchModal>
          
          <>
            <IconBox onClick={createOpen}>
              <CursorIcon>
                <FontAwesomeIcon icon={faPlus} fontSize="18px" /> 
              </CursorIcon>
            </IconBox>
            <CreateModal>
              <CreateModalContainer>
                <Link to={`/create_game`}>
                  <CreateModalTextWrep>
                    <CreateModalText>Create Match</CreateModalText>
                  </CreateModalTextWrep>
                </Link>
                <Link to={`/create_game`}>
                  <CreateModalTextWrep>  
                    <CreateModalText>Create Outcluber</CreateModalText>
                  </CreateModalTextWrep>
                </Link>
                <Link to={`/create_club`}>
                  <CreateModalTextWrep>
                    <CreateModalText>Create Club</CreateModalText>
                  </CreateModalTextWrep>
                </Link>
              </CreateModalContainer>
            </CreateModal>
          </>
        </Row>

        <Row>
          {isLoggedIn ? (
            <IconsContainer>   
              <Icon>
                <Link to={routes.home}>
                  <FontAwesomeIcon icon={faHome} fontSize="22px" style={{ color: homeColor }} onClick={() => setHomeColor('blue')} />
                  <span>home</span>
                </Link>
              </Icon>
              <Icon>
                <Link to={routes.match}>
                  <FontAwesomeIcon icon={faDisplay} fontSize="22px" style={{ color: matchColor}} onClick={() => setMatchColor('blue')} />
                  <span>match</span>
                </Link>
              </Icon>
              <Icon>
                <Link to={routes.outcluber}>
                  <FontAwesomeIcon icon={faPaperPlane} fontSize="22px" />
                  <span>outcluber</span>
                </Link>
              </Icon>

              <Icon onClick={notiOpen}>
                <FontAwesomeIcon icon={faBell} fontSize="22px" />
              </Icon>
              <NotiModal 
                $display="flex" 
                $justfyContent="flex-end"
                $alignItems="flex-start"
              >
                <NotiModalContainer>
                  <Notification />
                </NotiModalContainer>
              </NotiModal>

              <Icon>
                <Link to={routes.photo}>
                  <FontAwesomeIcon icon={faCamera} fontSize="22px" />
                </Link>
              </Icon>
              <Icon>
                <Link to={`/${data?.me?.username}`}>
                  <Avatar $lg url={data?.me?.avatar} />
                </Link>
              </Icon>
            </IconsContainer>
          ) : (
            <Link to={routes.home}>
              <Button>Login</Button>
            </Link>
          )}
        </Row>
      </Wrapper>
    </HeaderContainer>
  );
}
export default Header;