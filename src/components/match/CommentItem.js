import { gql, useMutation } from "@apollo/client";
import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  faClock,
  faLocationDot,
  faMap,
} from "@fortawesome/free-regular-svg-icons";
import styled from "styled-components";
import ProfileRow from "../profile/ProfileRow";

const Container = styled.div`
  background-color: ${(props) => props.theme.cardHeader};
  border-radius: 15px;
  border: 1px solid ${(props) => props.theme.border};
  width: 350px;
  padding: 8px;
  margin-bottom: 10px;
`;
const Top = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;
const CommentC = styled.span`
`;
const CommentCaption = styled.span`
`;

function CommentItem({ id, user, payload }) {

  return (
    <Container key={id}>
      <Top>
        <ProfileRow
          profileLink={`/users/${user.username}`}
          avatar={user.avatar}
          username={user.username}
        />
        <CommentC>fjsoijf</CommentC>
      </Top>
      <CommentCaption>{payload}</CommentCaption>
    </Container>
  );
}

CommentItem.propTypes = {
  id: PropTypes.number,
  user: PropTypes.shape({
    id: PropTypes.number,
    avatar: PropTypes.string,
    username: PropTypes.string.isRequired,
  }),
  commentNumber: PropTypes.number,
};

export default CommentItem;