import { gql, useApolloClient, useQuery, useReactiveVar } from "@apollo/client";
import { useParams } from "react-router-dom";
import PageTitle from "../components/PageTitle";
import useUser, { ME_QUERY } from "../hooks/useUser";
import UserProfile from "../components/profile/UserProfile";
import styled from "styled-components";
import { darkModeVar, disableDarkMode, enableDarkMode } from "../apollo";
import { faSun, faMoon } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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

const DarkModeBtn = styled.span`
  cursor: pointer;
`;

function Me() {
    const { username } = useParams();
    const { data: userData } = useUser();
    const darkMode = useReactiveVar(darkModeVar);
    const client = useApolloClient();
    const { data, loading } = useQuery(SEE_PROFILE_QUERY, {
      variables: {
        username,
      },
    });
    return (
      <div>
        <PageTitle
          title={
            loading ? "Loading..." : `${data?.seeProfile?.username}'s Profile`
          }
        />
        <UserProfile key={data?.seeProfile.id} {...data?.seeProfile} />
        <span>log out</span>
        <span>Me</span>
        
        <span>{ darkMode ? 'switch to light' : 'switch to dark' }</span>
        
        <DarkModeBtn onClick={darkMode ? disableDarkMode : enableDarkMode}>
          <FontAwesomeIcon icon={darkMode ? faSun : faMoon} />
        </DarkModeBtn>
      </div>
    );
  }


export default Me;