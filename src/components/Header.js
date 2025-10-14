import { gql, useLazyQuery } from "@apollo/client";
import React, { useState } from "react";
import { useReactiveVar } from "@apollo/client";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import {
  faPaperPlane,
  faHeart,
} from "@fortawesome/free-regular-svg-icons";
import { faHome, faDisplay, faCamera, faMagnifyingGlass, faArrowLeft, faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { isLoggedInVar } from "../apollo";
import useUser from "../hooks/useUser";
import routes from "../routes";
import Avatar from "./shared/Avatar";
import { HeaderStyle, MainText } from "./shared";
import useVanillaModal from '../hooks/useVanillaModal';
import { useForm } from "react-hook-form";
import Input from "./auth/Input";
import ProfileRow from "./profile/ProfileRow";

const SEARCH_CLUBS = gql`
  query searchClubs($keyword: String!) {
    searchClubs(keyword: $keyword) {
      id
      clubname
      clubArea
      emblem
      totalMember
      clubLeader{
        username
      }
    }
  }
`;

const SHeader = styled(HeaderStyle)`
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
const SearchModalContainer = styled.div`
  padding: 5px 10px;
  border-radius: 10px;
  background-color: ${(props) => props.theme.cardContent};
`;
const SearchModalHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const SearchModalWrep = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
`;
const SearchModalText = styled(MainText)`
  font-size: 16px;
`;
const CreateModalContainer = styled.div`
  padding: 10px 0px;
  border-radius: 10px;
  justify-content: center;
  background-color: ${(props) => props.theme.cardContent};
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

const Btn = styled.span`
  background-color: ${(props) => props.theme.accent};
  color: white;
  border-radius: 4px;
  padding: 5px 15px;
  font-weight: 600;
`;
const Button = styled.span`
  background-color: ${(props) => props.theme.accent};
  border-radius: 4px;
  padding: 4px 15px;
  color: white;
  font-weight: 600;
`;
const IconsContainer = styled.div`
  display: flex;
  align-items: center;
`;

function Header() {
  const [homeColor, setHomeColor] = useState({ color: "yellow" });
  const [matchColor, setMatchColor] = useState({ color: "yellow" });

  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const { data } = useUser();
  const { SearchModal, searchOpen, searchClose } = useVanillaModal();
  const { SearchModal: CreateModal, searchOpen: createOpen, searchClose: createClose } = useVanillaModal();
  const { setValue, register, watch, handleSubmit } = useForm();
  const [startQueryFn, { loading, data: searchData, called }] = useLazyQuery(SEARCH_CLUBS);
  const onValid = ({ keyword }) => {
    startQueryFn({
      variables: {
        keyword,
      },
    });
  };
  return (
    <SHeader>
      <Wrapper>
        <Row>
          <FontAwesomeIcon icon={faInstagram} size="3x" />

          <>
            <IconBox onClick={searchOpen}>
              <CursorIcon>
                <FontAwesomeIcon icon={faMagnifyingGlass} fontSize="18px" />  
              </CursorIcon>
            </IconBox>
            <SearchModal onClick={(e) => e.stopPropagation()}>
              <SearchModalContainer>
                <form onSubmit={handleSubmit(onValid)}>
                  <SearchModalHeader>
                    <div onClick={searchClose}>
                      <FontAwesomeIcon icon={faArrowLeft} fontSize="18px" style={{paddingRight:10}} />
                    </div>
                    <Input
                      {...register("keyword", {
                        required: "Email is required",
                        minLength: 1,
                      })}
                      type="text"
                      placeholder="Search clubs"
                    />
                  </SearchModalHeader>
                </form>
                {loading ? <SearchModalWrep><SearchModalText>searching...</SearchModalText></SearchModalWrep> : null}
                {!called ? <SearchModalWrep><SearchModalText>Search by keyword</SearchModalText></SearchModalWrep> : null}
                {searchData?.searchClubs !== undefined ? (
                  searchData?.searchClubs?.length === 0 ? (
                    <SearchModalWrep><SearchModalText>Could not find anything.</SearchModalText></SearchModalWrep>
                  ) : (
                    searchData?.searchClubs?.map((club) => (
                      <ProfileRow 
                        key={club?.id}
                        profileLink={`/club/${club?.clubname}`}
                        state={{ clubId: club?.id, userId: data?.me.id }}
                        avatar={club?.emblem} 
                        username={club?.clubname} 
                      />
                    ))
                  )
                ) : null}
              </SearchModalContainer>
            </SearchModal>
          </>
          
          <>
            <IconBox onClick={createOpen}>
              <CursorIcon>
                <FontAwesomeIcon icon={faPlus} fontSize="18px" /> 
              </CursorIcon>
            </IconBox>
            <CreateModal
              modalWidth={{ main: "200px" }}
              marginTop={{ main: "57px" }}
              marginLeft={{ main: "135px" }}
            >
              <CreateModalContainer>
                <CreateModalTextWrep>
                  <Link to={`/create_game`}>
                    <CreateModalText>Create Match</CreateModalText>
                  </Link>
                </CreateModalTextWrep>
                <CreateModalTextWrep>
                  <Link to={`/create_game`}>
                    <CreateModalText>Create Outcluber</CreateModalText>
                  </Link>
                </CreateModalTextWrep>
                <CreateModalTextWrep>
                  <Link to={`/create_club`}>
                    <CreateModalText>Create Club</CreateModalText>
                  </Link>
                </CreateModalTextWrep>
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
                  <spna>outcluber</spna>
                </Link>
              </Icon>
              <Icon>
                <Link to={routes.notification}>
                  <FontAwesomeIcon icon={faHeart} fontSize="22px" />
                  <span>noti</span>
                </Link>
              </Icon>
              <Icon>
                <Link to={routes.photo}>
                  <FontAwesomeIcon icon={faCamera} fontSize="22px" />
                </Link>
              </Icon>
              <Icon>
                <Link to={`/${data?.me?.username}`}>
                  <Avatar lg url={data?.me?.avatar} />
                </Link>
              </Icon>
            </IconsContainer>
          ) : (
            <Link href={routes.home}>
              <Button>Login</Button>
            </Link>
          )}
        </Row>
      </Wrapper>
    </SHeader>
  );
}
export default Header;