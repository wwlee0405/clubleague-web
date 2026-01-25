import { gql, useQuery, useMutation } from "@apollo/client";
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import useUser from "../../hooks/useUser";
import styled from "styled-components";
import { CardContainer, CardBottom, MainText, SubText } from "../../components/shared";
import useModal from '../../hooks/useModal';
import ToggleButton from "../../components/shared/ToggleButton";
import AppointBoard from "../../components/club/AppointBoard";
import UnappointBoard from "../../components/club/UnappointBoard";
import TransferLeader from "../../components/club/TransferLeader";
import UnjoinClub from "../../components/club/UnjoinClub";
import { SEE_JOINED_CLUB } from "../../gql/sharedQuery";

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

const Form = styled.div`
  display: flex;
  flex-direction: column;
  width: 1200px;
  max-width: 1200px;
  

  // 데스크톱 (768px 이상) 스타일
  @media (min-width: 768px) {
    flex-direction: row;
    background-color: red;
    font-size: 18px;
  }

  // 모바일 (767px 이하) 스타일
  @media (max-width: 767px) {
    background-color: pink;
    padding: 10px;
    font-size: 14px;
  }
`;
const Test = styled.div`
  height: 500px;
  width: 500px;
  background-color: red;
`;

const ModalWrep = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 10px 100px; 
`;
function UserSettings() {
  const { data } = useUser();
  const { Modal: Trans_Langs, open: trans_Langs_Open, close: trans_Langs_Close } = useModal();

  return (
    <Form>
      <Container>
        <Title>-Profile-</Title>

        <TextWrep>
          <Text>Profile - fullname, area</Text>
        </TextWrep>

        <TextWrep>
          <Text>Account- username, email</Text>
        </TextWrep>

      </Container>

      <Container>
        <Title>-switch mode-</Title>

        <TextWrep>
          <Text>Switch mode</Text>
        </TextWrep>

        <TextWrep onClick={trans_Langs_Open}>
          <Text>Language</Text>
        </TextWrep>
        <Trans_Langs>
          <span>English</span>
          <span>한국어</span>
          <span>日本語</span>
        </Trans_Langs>

        <TextWrep>
          <Text>팀차단설정</Text>
        </TextWrep>

      </Container>

      <Container>
        <Title>-Sign out-</Title>

        <TextWrep onClick={null}>
          <Text>Sign out</Text>
        </TextWrep>

      </Container>
      <Container>
        <Test />
      </Container>
    </Form>
  );
}
export default UserSettings;