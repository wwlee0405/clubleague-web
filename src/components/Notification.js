import { gql, useQuery } from "@apollo/client";
import styled from "styled-components";
import { MainText, SubText, ModalContainer } from "./shared";
import Avatar from "./shared/Avatar";
import { Link } from "react-router-dom";

const SEE_NOTI = gql`
  query seeNotification($offset: Int!) {
    seeNotification(offset: $offset) {
      id
      user {
        username
      }
      match {
        id
      }
      payload
    }
  }
`;

const Container = styled(ModalContainer)`
  padding: 5px;
  border-radius: 10px;
  background-color: ${(props) => props.theme.cardContent};
  width: 400px;
`;
const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
`;
const HeaderTitle = styled.span`
  font-size: 18px;
  font-weight: 600;
`;
const NotiWrep =styled.div`
  display: flex;
  flex-direction: row;
  padding: 10px;
  cursor: pointer;
  &:hover,
  &:focus {
    border-radius: 10px;
    background-color: ${(props) => props.theme.hover};
  }
`;
const Clubname = styled(MainText)`
  font-weight: 600;
  padding-right: 10px;
`;
const TitleText = styled(SubText)`
  font-size: 15px;
  padding-left: 10px;
`;

export default function Notification() {
  const { data } = useQuery(SEE_NOTI, {
    variables: {
      offset: 0,
    },
  });
  return (
    <Container>
      <ModalHeader onClick={(e) => e.stopPropagation()}>
        <HeaderTitle>Notification</HeaderTitle>
      </ModalHeader>
      {data?.seeNotification?.map((noti) => (
        <Link 
          key={noti.id} 
          to={`/match/${noti.match.id}`} 
          state={{ matchId: noti.match.id }}
        >
          <NotiWrep>
            <div>
              <Avatar $lg url={require('../data/eeee.png')} />
            </div>
            <TitleText><Clubname>{noti.user.username}</Clubname>{noti.payload}</TitleText>
          </NotiWrep>
        </Link>
      ))}
    </Container>
  );
}