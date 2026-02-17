import { useReactiveVar } from "@apollo/client";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faPaperPlane, faBell } from "@fortawesome/free-regular-svg-icons";
import { faHome, faDisplay, faCamera, faMagnifyingGlass, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, NavLink  } from "react-router-dom";
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
const NotiIcon = styled.div`
  display: flex;
  height: 40px;
  width: 40px;
  border-radius: 50%;
  justify-content: center;
  align-items: center;
  margin-left: 20px;
  cursor: pointer;
  &:hover,
  &:focus {
    background-color: ${(props) => props.theme.hover};
  }
`;
const NotiModalContainer = styled.div`
  margin-top: 57px;
  margin-right: 20px;
`;
const Button = styled.span`
  background-color: ${(props) => props.theme.accent};
  border-radius: 4px;
  padding: 4px 15px;
  color: white;
  font-weight: 600;
`;
const navLinkStyles = ({ isActive }) => ({
  color: isActive ? "#2e8b57" : "#818892",
  textDecoration: isActive ? 'none' : 'underline',
  fontWeight: isActive ? 'bold' : 'normal',
});

function Header() {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const { data } = useUser();
  const { VanillaModal: SearchModal, vanillaOpen: searchOpen, vanillaClose: searchClose } = useVanillaModal();
  const { VanillaModal: CreateModal, vanillaOpen: createOpen } = useVanillaModal();
  const { VanillaModal: NotiModal, vanillaOpen: notiOpen } = useVanillaModal();
  return (
    <HeaderContainer>
      <Wrapper>
        <Row>
          <FontAwesomeIcon icon={faInstagram} size="3x" />

          <IconBox onClick={searchOpen}>
            <FontAwesomeIcon icon={faMagnifyingGlass} fontSize="18px" />
          </IconBox>
          <SearchModal onClick={(e) => e.stopPropagation()}>
            <HeaderSearch onClose={searchClose} />
          </SearchModal>
          
          <>
            <IconBox onClick={createOpen}>
              <FontAwesomeIcon icon={faPlus} fontSize="18px" />
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
                <NavLink to={routes.home} style={navLinkStyles}>
                  <FontAwesomeIcon icon={faHome} fontSize="22px" />
                </NavLink>
              </Icon>
              <Icon>
                <NavLink to={routes.match} style={navLinkStyles}>
                  <FontAwesomeIcon icon={faDisplay} fontSize="22px" />
                  <span>match</span>
                </NavLink>
              </Icon>
              <Icon>
                <NavLink to={routes.outcluber} style={navLinkStyles}>
                  <FontAwesomeIcon icon={faPaperPlane} fontSize="22px" />
                  <span>outcluber</span>
                </NavLink>
              </Icon>
              <Icon>
                <NavLink to={routes.photo} style={navLinkStyles}>
                  <FontAwesomeIcon icon={faCamera} fontSize="22px" />
                </NavLink>
              </Icon>

              <NotiIcon onClick={notiOpen}>
                <FontAwesomeIcon icon={faBell} fontSize="22px" style={{ color: "#818892" }} />
              </NotiIcon>
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
                <NavLink to={`/${data?.me?.username}`} style={navLinkStyles}>
                  <Avatar $lg url={data?.me?.avatar} />
                </NavLink>
              </Icon>
            </IconsContainer>
          ) : (
            <NavLink to={routes.home}>
              <Button>Login</Button>
            </NavLink>
          )}
        </Row>
      </Wrapper>
    </HeaderContainer>
  );
}
export default Header;