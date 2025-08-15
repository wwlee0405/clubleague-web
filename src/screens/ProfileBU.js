import { gql, useApolloClient, useMutation, useQuery } from "@apollo/client";
import { faHeart, faComment } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Button from "../components/auth/Button";
import PageTitle from "../components/PageTitle";
import { FatText } from "../components/shared";
import useUser, { ME_QUERY } from "../hooks/useUser";

const SEE_PROFILE_QUERY = gql`
  query seeProfile($username: String!) {
    seeProfile(username: $username) {
      fullName
      username
      bio
      avatar
      isMe
    }
  }
`;

const Header = styled.div`
  display: flex;
`;
const Avatar = styled.div`
  margin-left: 50px;
  height: 160px;
  width: 160px;
  border-radius: 50%;
  margin-right: 150px;
  background-color: #2c2c2c;
  overflow: hidden;
`;
const Img = styled.img`
  max-width: 100%;
`;
const Column = styled.div``;
const Username = styled.h3`
  font-size: 28px;
  font-weight: 400;
`;
const Row = styled.div`
  margin-bottom: 20px;
  font-size: 16px;
  display: flex;
  align-items: center;
`;
const List = styled.ul`
  display: flex;
`;
const Item = styled.li`
  margin-right: 20px;
`;
const Value = styled(FatText)`
  font-size: 18px;
`;
const Name = styled(FatText)`
  font-size: 20px;
`;

const Grid = styled.div`
  display: grid;
  grid-auto-rows: 290px;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  margin-top: 50px;
`;

const Photo = styled.div`
  background-image: url(${(props) => props.bg});
  background-size: cover;
  position: relative;
`;

const Icons = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  opacity: 0;
  &:hover {
    opacity: 1;
  }
`;

const Icon = styled.span`
  font-size: 18px;
  display: flex;
  align-items: center;
  margin: 0px 5px;
  svg {
    font-size: 14px;
    margin-right: 5px;
  }
`;

const ProfileBtn = styled(Button).attrs({
  as: "span",
})`
  margin-left: 10px;
  margin-top: 0px;
  cursor: pointer;
`;

function Profile() {
    const { username } = useParams();
    const { data: userData } = useUser();
    const client = useApolloClient();
    const { data, loading } = useQuery(SEE_PROFILE_QUERY, {
      variables: {
        username,
      },
    });


    const getButton = (seeProfile) => {
      const { isMe, isFollowing } = seeProfile;
      if (isMe) {
        return <ProfileBtn>Edit Profile</ProfileBtn>;
      }
      if (isFollowing) {
        return <ProfileBtn onClick={null}>Unfollow</ProfileBtn>;
      } else {
        return <ProfileBtn onClick={null}>Follow</ProfileBtn>;
      }
    };
    return (
      <div>
        <PageTitle
          title={
            loading ? "Loading..." : `${data?.seeProfile?.username}'s Profile`
          }
        />
        <Header>
          <Avatar><Img src={data?.seeProfile?.avatar} /></Avatar>
          <Column>
            <Row>
              <Username>{data?.seeProfile?.username}</Username>
              {data?.seeProfile ? getButton(data.seeProfile) : null}
            </Row>
            <Row>
              <List>
                <Item>
                  <span>
                    <Value>111</Value> followers
                  </span>
                </Item>
                <Item>
                  <span>
                    <Value>1,500</Value> following
                  </span>
                </Item>
              </List>
            </Row>
            <Row>
              <Name>
                {data?.seeProfile?.fullName}
              </Name>
            </Row>
            <Row>{data?.seeProfile?.bio}</Row>
          </Column>
        </Header>
        <Grid>

        </Grid>
      </div>
    );
  }


export default Profile;
