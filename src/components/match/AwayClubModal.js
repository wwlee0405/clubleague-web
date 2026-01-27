import { gql, useQuery, useMutation } from "@apollo/client";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { MainText, SubText } from "../shared";
import { MATCH_QUERY } from "../../gql/sharedQuery"
import Avatar from "../shared/Avatar";
import ActionButton from "../shared/ActionButton";

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
const JOIN_AWAY_GAME_MUTATION = gql`
  mutation joinAwayGame($id: Int!, $matchId: Int!, $clubId: Int!, $userId: Int) {
    joinAwayGame(id:$id, matchId: $matchId, clubId: $clubId, userId: $userId) {
      error
      id
      ok
    }
  }
`;

const TopWrapper = styled.div`
  padding: 5px 0px;
  align-items: center;
`;
const Wrapper = styled.div`
  padding: 5px 15px;
  align-items: center;
  cursor: pointer;
  &:hover,
  &:focus {
    background-color: ${(props) => props.theme.hover};
  }
`;
const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const TopRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0px 15px;
`;
const Clubname = styled(MainText)`
  padding-left: 10px;
  padding-right: 10px;
  font-size: 18px;
  font-weight: 600;
`;
const Title = styled(SubText)`
  margin: 5px 15px;
  font-size: 12px;
`;
const BottonWrep = styled.div`
  display: flex;  
  align-items: center;
  justify-content: center;
`;

function AwayClubModal({ id, onClose, matchId, userId }) {
  const navigate = useNavigate();
  const [chosenMemberId, setChosenMemberId] = useState("");
  const [chosenClubId, setChosenClubId] = useState("");
  const [chosenClubname, setChosenClubname] = useState("");
  const [chosenEmblem, setChosenEmblem] = useState("");
  const [ , setOnCloseModal] = useState("");
  
  const { data } = useQuery(SEE_MY_CLUB, {
    variables: {
      offset: 0,
    },
  });
  const joinAwayGameUpdate = (cache, result) => {
    const {
      data: {
        joinAwayGame: { ok, id },
      },
    } = result;
    if (ok) {
      const joinAway = {
        __typename: "Game",
        id,
        createdAt: Date.now() + "",
      };
      const newCacheAway = cache.writeFragment({
        data: joinAway,
        fragment: gql`
          fragment JoinAway on Game {
            id

            createdAt
          }
        `,
      });
      cache.modify({
        id: `Match:${matchId}`,
        fields: {
          games(prev) {
            return [...prev, newCacheAway];
          },
          
        },
      });
      
    };
  };
  const [joinAwayGame] = useMutation(JOIN_AWAY_GAME_MUTATION, {
    variables: {
      id: chosenMemberId,
      clubId: chosenClubId,
      matchId,
      userId,
    },
    update: joinAwayGameUpdate,
    refetchQueries: [MATCH_QUERY],
  });
  const chooseAwayClub = (memberId, clubId, clubname, emblem) => {
    setChosenMemberId(memberId);
    setChosenClubId(clubId);
    setChosenClubname(clubname);
    setChosenEmblem(emblem);
  };
  const closeButton = (value) => {
    setOnCloseModal(value);
  };
  return (
    <div key={matchId}>
      <TopRow>
        <TopWrapper>
            {chosenClubId !== "" ? (
              <Row>
                <Avatar url={require('../../data/gggg.jpg')} />
                <Clubname>{chosenClubname}</Clubname>
              </Row>
            ) : null}
        </TopWrapper>
        <BottonWrep>
          {chosenClubId === "" ? (
            <ActionButton
              onClick={null}
              boxColor={{ main: (props) => props.theme.grey03 }}
              textcolor={{ main: (props) => props.theme.black }}
              text="Join Game"
            />
          ) : (
            <ActionButton
              onClick={() => {
                joinAwayGame();
                closeButton(onClose); 
              }}
              boxColor={{ main: (props) => props.theme.blue }}
              textcolor={{ main: (props) => props.theme.white }}
              text="Join Game"
            />
          )}
        </BottonWrep>
      </TopRow>
      
      <div>
        {data?.seeMyClub?.map((away) => (
          <Wrapper
            key={away.id}
            onClick={() => {
              chooseAwayClub(
                away.id,
                away.club.id,
                away.club.clubname,
                away.club.emblem,
              )
            }}
          >
            <Row>
              <Avatar url={require('../../data/gggg.jpg')} />
              <Clubname>{away.club.clubname}</Clubname>
            </Row> 
          </Wrapper>
        ))}
      </div>
      
    </div>
  );
}

export default AwayClubModal;