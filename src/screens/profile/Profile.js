import { gql, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import PageTitle from "../../components/PageTitle";
import UserProfile from "../../components/profile/UserProfile";

import styled from "styled-components";
import { FatText, SubText, MainText } from "../../components/shared";
import { Link } from "react-router-dom";

const SEE_PROFILE_QUERY = gql`
  query seeProfile($username: String!) {
    seeProfile(username: $username) {
      id
      fullName
      username
      avatar
      bio
      userLeader {
        clubname
        emblem
      }
      userMember {
        club {
          id
          clubname
          emblem
        }
      }
      isMe
    }
  }
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

function Profile() {
    const { username } = useParams();
    const { data, loading } = useQuery(SEE_PROFILE_QUERY, {
      variables: {
        username,
      },
    });
    return (
      <div>
        <PageTitle
          title={
            loading ? "Loading..." : `${data?.seeProfile?.username}'s Profile | Clubleague`
          }
        />
        <UserProfile key={data?.seeProfile.id} {...data?.seeProfile} />


        {data?.seeProfile?.userMember?.map((joined) => (
          <Link
            key={joined?.club.id}
            to={`/club/${joined?.club?.clubname}`} 
            state={{ clubId: joined?.club.id }}
          >
            <ClubTeam>
              <ClubEmblem src={require('../../data/2bar.jpg')} />
              <ClubName numberoflines={3}>{joined?.club?.clubname}</ClubName> 
            </ClubTeam>
          </Link>
        ))}


      </div>
    );
  }


export default Profile;
