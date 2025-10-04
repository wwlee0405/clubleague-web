import { gql, useQuery, useMutation } from "@apollo/client";
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import Avatar from "../shared/Avatar";
import { MainText, SubText } from "../shared";
import ActionButton from "../shared/ActionButton";

const UNAPPOINT_BOARD = gql`
  mutation unappointBoard($id: Int!) {
    unappointBoard(id: $id) {
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

function UnappointBoard({ onClose }) {
  const { state } = useLocation();
  const [chosenBoardId, setChosenBoardId] = useState("");
  const [chosenBoardName, setChosenBoardName] = useState("");
  const [ , setOnCloseModal] = useState("");
  const { data } = useQuery(SEE_CLUBMEMBER, {
    variables: {
      clubId: state?.clubId,
    },
  });
  const unappointBoardUpdate = (cache, result) => {
    const {
      data: {
        unappointBoard: { ok, id },
      },
    } = result;
    if (ok) {
      const fragmentId = `Member:${chosenBoardId}`;
      const fragment = gql`
        fragment UnappointBoard on Member {
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
  const [unappointBoard] = useMutation(UNAPPOINT_BOARD, {
    variables: {
      id: chosenBoardId,
    },
    update: unappointBoardUpdate,
  });
  const chooseBoard = (id, username) => {
    setChosenBoardId(id);
    setChosenBoardName(username);
  };
  const closeButton = (value) => {
    setOnCloseModal(value);
  };
  return (
    <div>
      <span>임원을 해제할 멤버를 선택해주세요</span>
      <Wrapper>
        {chosenBoardId !== "" ? (
          <Row>
            <Avatar url={require('../../data/gggg.jpg')} />
            <Username>{chosenBoardName}</Username>
          </Row>
        ) : null}
      </Wrapper>

      <div>
        <Title>Board</Title>
        {data?.seeClubMembers?.map((board) => (
          board.boardAuth === true 
            && board.club.clubLeader.id !== board.user?.id  ? (
              <Wrapper 
                onClick={() => {
                  chooseBoard(
                    board.id,
                    board.user.username,
                  )
                }}
              >
                <Row>
                  <Avatar url={require('../../data/gggg.jpg')} />
                  <Username>{board.user.username}</Username>
                </Row> 
              </Wrapper>
          ) : null      
        ))}
      </div>

      <BottonWrep>
        {chosenBoardId === "" ? (
            <ActionButton
              onClick={null}
              buttonColor={{ main: (props) => props.theme.grey03 }}
              textColor={{ main: (props) => props.theme.black }}
              text="임원해제"
            />
          ) : (
            <ActionButton
              onClick={() => {
                unappointBoard();
                closeButton(onClose);
              }}
              buttonColor={{ main: (props) => props.theme.blue }}
              textColor={{ main: (props) => props.theme.white }}
              text="임원해제"
            />
          )
        }
      </BottonWrep>
    </div>
  )
}

export default UnappointBoard;