import React from "react";
import { gql, useMutation } from "@apollo/client";
import PropTypes from "prop-types";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import { CardContainer, CardBottom, MainText, SubText } from "../shared";
import HeaderAvatar from "../shared/HeaderAvatar";
import Avatar from "../shared/Avatar";
import ActionButton from "../shared/ActionButton";

const UNJOIN_CLUB = gql`
  mutation unjoinClub($id:Int!) {
    unjoinClub(id:$id) {
      error
      id
      ok
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

function UnjoinClub({ id, user }) {
  const navigate = useNavigate();
  const { state } = useLocation();
  const unjoinClubUpdate = (cache, result) => {
    const {
      data: {
        unjoinClub: { ok, id }
      },
    } = result;
    if (ok) {
      navigate(`/`);
    }
  };
  const [unjoinClub, { loading }] = useMutation(UNJOIN_CLUB, {
    variables: {
      id,
    },
    update: unjoinClubUpdate,
  });
  console.log("unjoin " + user?.id);
  console.log("unjoinM " + id);
  return (
    <div>
      <span>이 클럽에서 정말 탈퇴합니까?</span>
      <BottonWrep>
        <ActionButton
          onClick={unjoinClub}
          buttonColor={{ main: (props) => props.theme.primary }}
          textColor={{ main: (props) => props.theme.white }}
          text={loading ? "Loading..." : "YES"}
        />
      </BottonWrep>
    </div>
  )
}

export default UnjoinClub;