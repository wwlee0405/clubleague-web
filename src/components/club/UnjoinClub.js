import React from "react";
import { gql, useMutation } from "@apollo/client";
import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";
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

function UnjoinClub({ id, user }) {
  const { state } = useLocation();
  const unjoinClubUpdate = (cache, result) => {
    const {
      data: {
        unjoinClub: { ok, id }
      },
    } = result;
  };
  const [unjoinClub] = useMutation(UNJOIN_CLUB, {
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
      <ActionButton
        onClick={unjoinClub}
        buttonColor={{ main: (props) => props.theme.blue }}
        textColor={{ main: (props) => props.theme.white }}
        text="YES"
      />
    </div>
  )
}

export default UnjoinClub;