import { gql, useQuery, useMutation } from "@apollo/client";
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import Avatar from "../shared/Avatar";
import { MainText, SubText } from "../shared";
import ActionButton from "../shared/ActionButton";
import useUser from "../../hooks/useUser";

const TRANSFER_LEADER = gql`
  mutation transferLeader($id: Int!) {
    transferLeader(id: $id) {
      error
      ok
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
        id
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

function TransferLeader({ onClose }) {
  const { state } = useLocation();
  const { data: userData } = useUser();
  const [chosenLeaderId, setChosenLeaderId] = useState("");
  const [chosenLeaderName, setChosenLeaderName] = useState("");
  const [ , setOnCloseModal] = useState("");
  const { data } = useQuery(SEE_CLUBMEMBER, {
    variables: {
      clubId: state?.clubId,
    },
  });
  const transferLeaderUpdate = (cache, result) => {
    const {
      data: {
        transferLeader: { ok, id },
      },
    } = result;
    if (ok) {
      const clubId = `Club:${data?.seeClubMembers?.club?.id}`;
      const newLeader = {
        __typename: "Member",
        
        id: chosenLeaderId,
        boardAuth: true,
        
      };
      const newCacheLeader = cache.writeFragment({
        data: newLeader,
        fragment: gql`
          fragment TransferLeader on Member {
            id
            boardAuth          
          }
        `,
      });
      cache.modify({
        id: clubId,
        fields: {
          clubLeader(prev) {
            return [...prev, newCacheLeader];
          },          
        },
      });
    }
  };

  const [transferLeader] = useMutation(TRANSFER_LEADER, {
    variables: {
      id: chosenLeaderId,
    },
    update: transferLeaderUpdate,
  });
  const chooseLeader = (leaderId, leaderName) => {
    setChosenLeaderId(leaderId);
    setChosenLeaderName(leaderName);
  };
  const closeButton = (value) => {
    setOnCloseModal(value);
  };
  return (
    <div>
      <span>리더를 양도할 멤버를 선택해주세요.</span>
      <Wrapper>
        {chosenLeaderId !== "" ? (
          <Row>
            <Avatar url={require('../../data/gggg.jpg')} />
            <Username>{chosenLeaderName}</Username>
          </Row>
        ) : null}
      </Wrapper>
      
      <div>
        <Title>리더후보</Title>
        {data?.seeClubMembers?.map((members) => (
          members.club.clubLeader.id !== members.user?.id ? (
            <Wrapper 
              key={members.id}
              onClick={() => {
                chooseLeader(
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
        {chosenLeaderId === "" ? (
            <ActionButton
              onClick={null}
              $buttoncolor={(props) => props.theme.grey03}
              $textcolor={(props) => props.theme.black}
              text="리더양도"
            />
          ) : (
            <ActionButton
              onClick={() => {
                transferLeader();
                closeButton(onClose); 
              }}
              $buttoncolor={(props) => props.theme.blue}
              $textcolor={(props) => props.theme.white}
              text="리더양도"
            />
          )
        }
      </BottonWrep>
    </div>
  );
}

export default TransferLeader;