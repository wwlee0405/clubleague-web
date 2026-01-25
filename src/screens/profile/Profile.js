import { gql, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import PageTitle from "../../components/PageTitle";
import UserProfile from "../../components/profile/UserProfile";

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
    </div>
  );
}

export default Profile;
