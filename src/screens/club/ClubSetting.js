import { gql, useQuery, useMutation } from "@apollo/client";
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import useUser from "../../hooks/useUser";
import PageTitle from "../../components/PageTitle";
import styled from "styled-components";
import { CardContainer, CardBottom, MainText, SubText } from "../../components/shared";
import useModal from '../../hooks/useModal';
import ToggleButton from "../../components/shared/ToggleButton";
import AppointBoard from "../../components/club/AppointBoard";
import UnappointBoard from "../../components/club/UnappointBoard";
import TransferLeader from "../../components/club/TransferLeader";
import UnjoinClub from "../../components/club/UnjoinClub";
import { CLUB_FRAGMENT } from "../../fragments";

const TOGGLE_WRITE_MUTATION = gql`
  mutation toggleWriteAuth($id: Int!) {
    toggleWriteAuth(id: $id) {
      error
      id
      ok
    }
  }
`;
const TOGGLE_INVITE_MUTATION = gql`
  mutation toggleInviteAuth($id: Int!) {
    toggleInviteAuth(id: $id) {
      error
      id
      ok
    }
  }
`;
//const SEE_CLUB = gql`
//  query seeClub($id: Int!) {
//    seeClub(id: $id) {
//      id
//      clubname
//      emblem
//      clubLeader {
//        id
//      }
//      writeAuth
//      inviteAuth
//    }
//  }
//`;

const SEE_JOINED_CLUB = gql`
  query seeJoinedClub($userId:Int!,$clubId: Int!) {
    seeJoinedClub(userId: $userId,clubId: $clubId) {
      id
      boardAuth
      user {
        id
      }
      club {
        ...ClubFragment
        writeAuth
        inviteAuth
      }
    }
  }
  ${CLUB_FRAGMENT}
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${(props) => props.theme.cardHeader};
  border-radius: 15px;
  border: 1px solid ${(props) => props.theme.border};
  max-width: 615px;
  margin-bottom: 20px;
  padding: 20px 0px;
`;
const Title = styled(MainText)`
  font-size: 20px;
  font-weight: 600;
  padding: 0px 20px;
`;
const TextWrep = styled.div`
  margin-top: 20px;
  padding: 10px 20px;
  cursor: pointer;
  &:hover,
  &:focus {
    background-color: ${(props) => props.theme.hover};
  }
`;
const Text = styled(MainText)`
  font-size: 17px;
`;
const ModalWrep = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 10px 100px; 
`;
const buttonColor = {
  main: (props) => props.theme.blue
};
const textColor = {
  main: (props) => props.theme.white
};

function ClubSetting() {  
  const { state } = useLocation();
  const { data: userData } = useUser();
  const { Modal: MemberAuth, open: memberAuthOpen, close: memberAuthClose } = useModal();
  const { Modal: BoardAuth, open: boardAuthOpen, close: boardAuthClose } = useModal();
  const { Modal: BoardUnauth, open: boardUnauthOpen, close: boardUnauthClose } = useModal();
  const { Modal: Transfer_Leader, open: transfer_Leader_Open, close: transfer_Leader_Close } = useModal();
  const { Modal: Unjoin_Club, open: unjoin_Club_Open, close: unjoin_Club_Close } = useModal();
  const [value, setValue] = useState(false);
  const { data, loading } = useQuery(SEE_JOINED_CLUB, {
    variables: {
      clubId: state?.clubId,
      userId: userData?.me.id,
    },
  });
  const toggleWriteUpdate = (cache, result) => {
    const {
      data: {
        toggleWriteAuth: { ok },
      },
    } = result;
    if (ok) {
      cache.modify({
        id: `Club:${state.clubId}`,
        fields: {
          writeAuth(prev) { 
            setValue(!value);
            return !prev;
          },
        },
      });
    };
  };
  const [toggleWrite] = useMutation(TOGGLE_WRITE_MUTATION, {
    variables: {
      id: state?.clubId,
    },
    update: toggleWriteUpdate,   
  });
  const toggleInviteUpdate = (cache, result) => {
    const {
      data: {
        toggleInviteAuth: { ok },
      },
    } = result;
    if (ok) {
      cache.modify({
        id: `Club:${state.clubId}`,
        fields: {
          inviteAuth(prev) {
            return !prev;
          },
        },
      });
    };
  };
  const [toggleInvite] = useMutation(TOGGLE_INVITE_MUTATION, {
    variables: {
      id: state?.clubId,
    },
    update: toggleInviteUpdate,
  });

  const clubLeader = data?.seeJoinedClub?.club?.clubLeader?.id;
  const me = userData?.me.id;
  const seeJoinedClubId = data?.seeJoinedClub?.id;
  const data_seeJoinedClub = data?.seeJoinedClub;

  console.log(clubLeader);
  console.log(state?.userId);
  console.log(data?.seeJoinedClub?.id);
  return (
    <div>
      
      <Container>
        <Title>-클럽 기본 정보 관리-</Title>

        <TextWrep>
          <Text>클럽이름 및 커버설정</Text>
        </TextWrep>

        <TextWrep>
          <Text>클럽소개</Text>
        </TextWrep>

      </Container>

      <Container>
        <Title>-멤버 가입관리-</Title>

        <TextWrep>
          <Text>가입신청</Text>
        </TextWrep>

        <TextWrep>
          <Text>유저차단설정</Text>
        </TextWrep>

        <TextWrep>
          <Text>팀차단설정</Text>
        </TextWrep>

      </Container>

      <Container>
        {clubLeader === me ? (
          <div>

            <Title>-멤버 활동관리-</Title>

            <TextWrep onClick={memberAuthOpen}>
              <Text>멤버권한 설정</Text>
            </TextWrep>

            <MemberAuth title="멤버권한 설정">
              <ModalWrep>
                <span>Writing authority</span>
                <ToggleButton value={data?.seeJoinedClub?.club?.writeAuth} handleClick={toggleWrite} />
              </ModalWrep>                
              <span>모든 멤버들에게 글쓰기(매치) 권한이 {data?.seeJoinedClub?.club?.writeAuth ? "부여되었습니다." : "정지되었습니다."}</span>

              <ModalWrep>
                <span>Invite authority</span>
                <ToggleButton value={data?.seeJoinedClub?.club?.inviteAuth} handleClick={toggleInvite} />
              </ModalWrep>
              <span>모든 멤버에게 친구 초대하기 권한이 {data?.seeJoinedClub?.club?.inviteAuth ? "부여되었습니다." : "정지되었습니다."}</span>
            </MemberAuth>

            <TextWrep onClick={boardAuthOpen}>
              <Text>임원임명</Text>
            </TextWrep>

            <BoardAuth title="임원임명"> 
              <AppointBoard />
            </BoardAuth>
              
            <TextWrep onClick={boardUnauthOpen}>
              <Text>임원해제</Text>
            </TextWrep>

            <BoardUnauth title="임원해제">
              <UnappointBoard />
            </BoardUnauth>
              
            <TextWrep onClick={transfer_Leader_Open}>
              <Text>리더양도</Text>
            </TextWrep>

            <Transfer_Leader title="리더양도">
              <TransferLeader />
            </Transfer_Leader>

            <TextWrep>
              <Text>멤버 강제탈퇴</Text>
            </TextWrep>

            <TextWrep>
              <Text>클럽 삭제하기</Text>
            </TextWrep>

          </div>
        ) : null}

      </Container>

      <Container>
        <Title>-나의 활동관리-</Title>

        <TextWrep onClick={unjoin_Club_Open}>
          <Text>클럽탈퇴</Text>
        </TextWrep>

        <Unjoin_Club title="클럽탈퇴">
          <UnjoinClub key={seeJoinedClubId} {...data_seeJoinedClub} />
        </Unjoin_Club>
      </Container>

    </div>
  );
}
export default ClubSetting;