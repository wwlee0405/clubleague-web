import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { FatText } from "../shared";
import Avatar from "./Avatar";

const ButtonTochable = styled.div`
  padding: 10px 15px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const TextData = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 10px;
`;
const TextTop = styled(FatText)`
  font-size: 17px;
  color: ${(props) => props.theme.text};
`;
const TextBottom = styled.span`
  font-size: 13px;
  color: ${(props) => props.theme.subText};
`;
const Action = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  justify-content: center;
  align-items: center;
  display: flex;
  color: ${(props) => props.theme.text};
  cursor: pointer;
`;

export default function HeaderAvatar({ profileLink, profileState, image, topData, bottomData, modalVisible }) {
  return (
    <ButtonTochable>
      <Wrapper>
        <Link to={profileLink} state={profileState}>
          <Avatar $lg url={image} />
        </Link>
        <Link to={profileLink} state={profileState}>
          <TextData>
            <TextTop>{topData}</TextTop>
            <TextBottom>{bottomData}</TextBottom>
          </TextData>
        </Link>
        
      </Wrapper>
      <Action onClick={modalVisible}>
        <FontAwesomeIcon icon={faEllipsis} size="2x" />
      </Action>
    </ButtonTochable>
  );
}