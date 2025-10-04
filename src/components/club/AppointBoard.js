import { gql, useQuery, useMutation } from "@apollo/client";
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import Avatar from "../shared/Avatar";
import { MainText, SubText } from "../shared";
import ActionButton from "../shared/ActionButton";

const APPOINT_BOARD = gql`
  mutation appointBoard($id: Int!) {
    appointBoard(id: $id) {
      ok
      error
      id
    }
  }
`;
const SEE_CLUBMEMBER = gql`
  query seeClubMembers($clubId: Int!) {
    seeClubMembers(clubId: $clubId) {
      id
      user {
        id
        username
        avatar
      }
      club {
        clubLeader {
          id
        }
      }
      boardAuth
    }
  }
`;

const Wrapper = styled.div`
  padding: 5px 15px;
`;
const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const Username = styled(MainText)`
  padding-left: 10px;
  padding-right: 10px;
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

function AppointBoard({ onClose }) {
  const { state } = useLocation();
  const [chosenMemberId, setChosenMemberId] = useState("");
  const [chosenMembername, setChosenMembername] = useState("");
  const [ , setOnCloseModal] = useState("");
  const { data } = useQuery(SEE_CLUBMEMBER, {
    variables: {
      clubId: state?.clubId,
    },
  });
  const appointBoardUpdate = (cache, result) => {
    const {
      data: {
        appointBoard: { ok },
      },
    } = result;
    if (ok) {
      const fragmentId = `Member:${chosenMemberId}`;
      const fragment = gql`
        fragment AppointBoard on Member {
          boardAuth
        }
      `;
      const result = cache.readFragment({
        id: fragmentId,
        fragment,
      });
      if ("boardAuth" in result) {
        const { boardAuth: cacheBoardAuth } = result;
        cache.writeFragment({
          id: fragmentId,
          fragment,
          data: {
            boardAuth: !cacheBoardAuth,
          },
        });
      }
    }
  };
  const [appointBoard] = useMutation(APPOINT_BOARD, {
    variables: {
      id: chosenMemberId,
    },
    update: appointBoardUpdate,
  });
  const chooseMember = (id,username) => {
    setChosenMemberId(id);
    setChosenMembername(username);
  };
  const closeButton = (value) => {
    setOnCloseModal(value);
  };
  return (
    <div>
      <span>임원으로 임명할 멤버를 선택해주세요</span>
      <Wrapper>
        {chosenMemberId !== "" ? (
          <Row>
            <Avatar url={require('../../data/gggg.jpg')} />
            <Username>{chosenMembername}</Username>
          </Row>
        ) : null}
      </Wrapper>

      <div>
        <Title>Board</Title>
        {data?.seeClubMembers?.map((board) => (
          board.boardAuth === true ? (
            <Wrapper>
              <Row>
                <Avatar url={require('../../data/gggg.jpg')} />
                <Username>{board.user.username}</Username>
              </Row> 
            </Wrapper>
          ) : null      
        ))}
      </div>

      <div>
        <Title>Member</Title>
        {data?.seeClubMembers?.map((members) => (
          members.boardAuth === false ? (
            <Wrapper 
              onClick={() => {
                chooseMember(
                  members.id,
                  members.user.username
                )
              }}
            >
              <Row>
                <Avatar url={require('../../data/gggg.jpg')} />
                <Username>{members.user.username}</Username>
              </Row> 
            </Wrapper>
          ) : null    
        ))}
      </div>

      <BottonWrep>
        {chosenMemberId === "" ? (
            <ActionButton
              onClick={null}
              buttonColor={{ main: (props) => props.theme.grey03 }}
              textColor={{ main: (props) => props.theme.black }}
              text="임원임명"
            />
          ) : (
            <ActionButton
              onClick={() => {
                appointBoard();
                closeButton(onClose); 
              }}
              text="임원임명"
            />
          )
        }
      </BottonWrep>
      
    </div>
  );
}

export default AppointBoard;