import { gql, useQuery, useMutation } from "@apollo/client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { MATCH_QUERY } from "../../gql/sharedQuery"
import useModal from '../../hooks/useModal';
import FormError from "../../components/auth/FormError";
import Input from "../../components/auth/Input";
import ActionButton from "../../components/shared/ActionButton";
import Avatar from "../../components/shared/Avatar";
import { MainText, SubText } from "../../components/shared";
import PageTitle from "../../components/PageTitle";
import Button from "../../components/auth/Button";

const CREATE_GAME_MUTATION = gql`
  mutation createGame($clubId: Int!, $file: String, $caption: String, $date: Date!) {
    createGame(clubId: $clubId, file: $file, caption: $caption, date: $date) {
      error
      id
      ok
    }
  }
`;
const SEE_MY_CLUB = gql`
  query seeMyClub($offset: Int!) {
    seeMyClub(offset: $offset) {
      id
      club {
        id
        clubname
        emblem
      }
    }
  }
`;


const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-radius: 15px;  
  padding: 20px;
  background-color: ${(props) => props.theme.cardHeader};
`;
const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 5px 0px;
`;
const TitleWrapper = styled.div`
  align-items: center;
  padding-top: 5px;
  padding-bottom: 5px;
  width: 30%;
`;
const TitleText = styled(SubText)`
  font-size: 15px;
`;
const SelectText = styled(MainText)`
  font-size: 18px;
  font-weight: 600;
`;
const LabelText = styled.span`
  font-size: 15px;
  color: ${(props) => props.theme.yellow};
`;
const ClubData = styled.div`
  background-color: ${(props) => props.theme.cardContent};
  border-radius: 5px; 
  width: 100%;
  padding: 5px;
  cursor: pointer;
  &:hover,
  &:focus {
    background-color: ${(props) => props.theme.hover};
  }
`;
const DateInput = styled.input`
  background-color: ${(props) => props.theme.cardContent};  
  border-radius: 5px;
  width: 100%;
  color: ${(props) => props.theme.text};
  padding: 5px;
  border: 0.5px solid
    ${(props) => (props.hasError ? "tomato" : props.theme.borderColor)};
  
  box-sizing: border-box;
  &:focus {
    border-color: rgb(38, 38, 38);
  }
`;

const ModalWrapper = styled.div`
  align-items: center;
  padding: 5px 20px;
  cursor: pointer;
  &:hover,
  &:focus {
    background-color: ${(props) => props.theme.hover};
  }
  `;
const Clubname = styled(MainText)`
  padding-left: 10px;
  font-size: 18px;
  font-weight: 600;
`;

function CreateGame() {
  const navigate = useNavigate();
  const { 
    register, 
    handleSubmit,
    formState: { errors, isValid }, 
    setValue,
    setError,
    getValues
  } = useForm();
  const { data } = useQuery(SEE_MY_CLUB, {
    variables: {
      offset: 0,
    },
  });
  const onCompleted = (data) => {
    const {
      createGame: { ok, error },
    } = data;
    const { caption, date } = getValues();
    if (!ok) {
      return setError("result", {
        message: error,
      });
    }
    if (ok) {
      navigate(`/match`,{
        caption,
        date,
      });
    }
  };
  const [createGameMutation, { loading, error }] = useMutation(
    CREATE_GAME_MUTATION,{
      onCompleted,
      refetchQueries: [MATCH_QUERY],
  });
  const { Modal: HomeGame, open: homeGameOpen, close: homeGameClose } = useModal();
  const [chosenId, setChosenId] = useState("");
  const [chosenClubId, setChosenClubId] = useState("");
  const [chosenClubname, setChosenClubname] = useState("");
  const [chosenEmblem, setChosenEmblem] = useState("");
  
  const chooseClub = (clubId, clubname, emblem) => {
    setChosenClubId(clubId);
    setChosenClubname(clubname);
    setChosenEmblem(emblem);
  };

  const onValid = ({ file, caption, date }) => {
    if (loading) {
      return;
    }
    createGameMutation({
      variables: {
        clubId: chosenClubId,
        caption,
        file,
        date,
      },
    });
  };  
  return (
    <Container>
      <PageTitle title="Create Game" />
      <form onSubmit={handleSubmit(onValid)}>
        <Row>
          <TitleWrapper>
            <TitleText>Sports</TitleText>          
          </TitleWrapper>
          <div>
            <TitleText>Sports</TitleText>  
          </div>
        </Row>

        <Row>
          <TitleWrapper>
            <TitleText>Date</TitleText>          
          </TitleWrapper>
          <div>
            <DateInput 
              {...register("date", {
                valueAsDate: true,
              })}
              type="datetime-local" 
            />
          </div>
        </Row>

        <Row>
          <TitleWrapper>
            <TitleText>time</TitleText>          
          </TitleWrapper>
          <div>
            <DateInput
              {...register("time")} 
              type="time" 
            />
          </div>
        </Row>

        <Row>
          <TitleWrapper>
            <TitleText>Location</TitleText>          
          </TitleWrapper>
          <div>
            <ClubData>
              <TitleText>Location</TitleText>
            </ClubData>
          </div>
        </Row>

        <Row>
          <TitleWrapper>
            <LabelText>Home</LabelText>
          </TitleWrapper>
        
          <div>
            <ClubData onClick={homeGameOpen}>
              {chosenClubId !== "" ? (       
                <SelectText>{chosenClubname}</SelectText>
              ) : (
                <TitleText>Select a home club to play the game</TitleText>
              )}
            </ClubData>
          </div>
        </Row>

        <HomeGame title="Home 클럽을 정하시오.">
          {data?.seeMyClub?.map((home) => (
            <ModalWrapper
              onClick={() => {
                chooseClub(
                  home.club.id,
                  home.club.clubname,
                  home.club.emblem,
                );
                homeGameClose();
              }}
            >
              <Row>
                <Avatar url={require('../../data/gggg.jpg')} />
                <Clubname>{home.club.clubname}</Clubname>
              </Row>
            </ModalWrapper>
          ))}
        </HomeGame>

        <Row>
          <TitleWrapper>
            <TitleText>Caption</TitleText>          
          </TitleWrapper>
          <div>
            <TitleText>Caption</TitleText>  
          </div>
        </Row>

        <Input
          {...register("caption")}
          type="text"
          placeholder="caption"
        />
        <FormError message={errors.caption?.message} />
      
      </form>
      <TitleText>요청받을 클럽의 개수를 정하시오.</TitleText>

      <ActionButton 
        onClick={chosenClubId !== "" ? handleSubmit(onValid) : null}
        text="Create"
        loading={loading}
        disabled={chosenClubId !== "" ? null : isValid}
        $buttoncolor={chosenClubId !== "" ?  (props) => props.theme.symbolColor : (props) => props.theme.grey03}
        $textcolor={chosenClubId !== "" ? (props) => props.theme.white : (props) => props.theme.black}
      />
      
    </Container>
  );
}
export default CreateGame;