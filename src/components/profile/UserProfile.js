import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { FatText, SubText, MainText } from "../shared";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useUser from "../../hooks/useUser";
import useModal from '../../hooks/useModal';
import EditProfile from "./EditProfile";
import Button from "../auth/Button";

const ColumnContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
const RowContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding-top: 20px;
  padding-bottom: 20px;
  padding-left: ${props => props.$primary ? "10px" : "0px" };
  padding-right: ${props => props.$primary ? "10px" : "0px" };
`;
const AvatarWrep = styled.div`
  margin-left: 50px;
  margin-right: 100px;
`;
const Avatar = styled.div`
  height: 200px;
  width: 200px;
  border-radius: 50%;
  overflow: hidden;
`;
const Img = styled.img`
  max-width: 100%;
`;
const UserFont = styled.div`
  display : flex;
  align-items: center;
  justify-content: center;
  border: 1px solid ${(props) => props.theme.symbolColor};
  height: 200px;
  width: 200px;
  border-radius: 50%;
`;
const Column = styled.div`
  display: flex;
  flex-direction: column;
`;
const Row = styled.div`
  display: flex;
  margin-bottom: 15px;
  align-items: center;
`;
const Username = styled(FatText)`
  font-size: 28px;
`;
const List = styled.ul`
  display: flex;
`;
const Item = styled.li`
  margin-right: 20px;
`;
const NameTag = styled(SubText)`
  font-size: 15px;
`;
const Value = styled.span`
  font-size: 18px;
`;
const Title = styled(FatText)`
  font-size: 20px;
  padding-left: ${props => props.$primary ? "20px" : "0px" };
  padding-right: ${props => props.$primary ? "20px" : "0px" };
`;
const ProfileBtn = styled(Button).attrs({
  as: "span",
})`
  margin-left: 10px;
  margin-top: 0px;
  cursor: pointer;
  padding-left: 40px;
  padding-right: 40px;
  background-color: ${(props) => props.theme.symbolColor};
`;
const ClubTeam = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${(props) => props.theme.cardHeader};
  border: 0.3px solid ${(props) => props.theme.border};
  border-radius: 8px;
  width: 100px;
  height: 140px;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
  cursor: pointer;
  &:hover,
  &:focus {
    background-color: ${(props) => props.theme.cardContent};
  }
`;
const ClubEmblem = styled.img`
  width: 75px;
  height: 75px;
  border-radius: 50%;
`;
const ClubName = styled(FatText)`
  padding-top: 10px;
`;

function UserProfile({
  id,
  avatar,
  username,
  fullName,
  isMe,
  userMember,
}) {
  const { data, loading } = useUser();
  const { Modal: Edit_Profile, open: edit_Profile_Open, close: edit_Profile_Close } = useModal();
  return (
    <ColumnContainer>
      <RowContainer>
        <AvatarWrep >
          <Link 
            to={`/${username}/settings/profile`} 
          >
            <Avatar>{avatar ? <Img src={avatar} /> : <UserFont><FontAwesomeIcon icon={faUser} size="6x" style={{ color: "#2e8b57" }} /></UserFont>}</Avatar>
          </Link>
        </AvatarWrep>
        <Column>
          <Row>
            <Username>{username}</Username>
            {isMe ? 
              <ProfileBtn onClick={edit_Profile_Open}>Edit Profile</ProfileBtn>
              :
              null
            }
          </Row>

          <Edit_Profile title="Edit Profile">
            <EditProfile onClose={edit_Profile_Close} />
          </Edit_Profile>

          <Row>
            <List>
              <Item>
                <Column>
                  <Value>111</Value> 
                  <NameTag>followers</NameTag>
                </Column>
              </Item>
              <Item>
                <Column>
                  <Value>1,500</Value>
                  <NameTag>following</NameTag>
                </Column>
              </Item>
            </List>
          </Row>
          <Row>
            <Column>
              <NameTag>Name</NameTag>
              <Value>{fullName}</Value>
            </Column>    
          </Row>
          <Row>  
            <Column>
              <NameTag>Area</NameTag>
              <Value>Barcelona, Spain</Value>
            </Column>
          </Row>
        </Column>
      </RowContainer>
        
      <ColumnContainer>
        <Title $primary>My Club</Title>
        <RowContainer $primary>
          {userMember?.map((joined) => (
            <Link
              key={joined?.club.id}
              to={`/club/${joined?.club?.clubname}`} 
              state={{ clubId: joined?.club.id, userId: data?.me.id }}
            >
              <ClubTeam>
                <ClubEmblem src={require('../../data/2bar.jpg')} />
                <ClubName>{joined?.club?.clubname}</ClubName> 
              </ClubTeam>
            </Link>
          ))}
        </RowContainer>
      </ColumnContainer>
    </ColumnContainer>
  );
}
  
UserProfile.propTypes = {
  id: PropTypes.number,
  avatar: PropTypes.string,
  username: PropTypes.string,
  fullName: PropTypes.string,
  isMe: PropTypes.bool,
  userMember: PropTypes.arrayOf(
    PropTypes.shape({
      club: PropTypes.shape({
        id: PropTypes.number,
        clubname: PropTypes.string,
      }),
    }),
  ),
};
  
export default UserProfile;