import { gql, useReactiveVar } from "@apollo/client";
import PageTitle from "../components/PageTitle";
import useUser from "../hooks/useUser";
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
    const { data, loading } = useUser();
    const darkMode = useReactiveVar(darkModeVar);
    
    return (
      <div>
        <PageTitle
          title={
            loading ? "Loading..." : `${data?.me?.username}'s Profile | Clubleague`
          }
        />

        <UserProfile key={data?.me.id} {...data?.me} />
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