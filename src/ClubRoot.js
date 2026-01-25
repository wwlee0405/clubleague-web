import { useState } from "react";
import { gql, useQuery, useMutation } from "@apollo/client";
import { useLocation, useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import useUser from "./hooks/useUser";
import Header from "./components/Header";
import ClubItem from "./components/club/ClubItem";
import JoinNav from "./components/club/JoinNav";
import UnjoinNav from "./components/club/UnjoinNav";
import { SEE_CLUB, SEE_JOINED_CLUB } from "./gql/sharedQuery";
import { HeaderStyle } from "./components/shared";

const JOIN_CLUB_MUTATION = gql`
  mutation joinClub($clubId: Int!) {
    joinClub(clubId: $clubId) {
      ok
      error
      id
    }
  }
`;

const Container = styled.div`
  background-color: ${(props) => props.theme.bgColor};
`;
const ClubContainer = styled(HeaderStyle)``;
const ClubInfo = styled.div`
  margin: 0 auto;
  max-width: 615px;
`;
const StickyContainer = styled(HeaderStyle)`
  position: sticky;
  top: ${(props) => props.theme.headerHight};
  border-bottom: 1px solid ${(props) => props.theme.border};
`;
const ClubNavItem = styled.div`
  margin: 0 auto;
  max-width: 615px;
  width: 100%;
`;
const Content = styled.main`
  margin: 0 auto;
  padding-top: 20px;
  padding-bottom: 20px;
  max-width: 615px;
  width: 100%;
`;

function ClubRoot() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { data } = useQuery(SEE_CLUB, {
    variables: {
      id: state?.clubId,
    },
  });
  const { data: joinData, refetch } = useQuery(SEE_JOINED_CLUB, {
    variables: {
      clubId: state?.clubId,
      userId: state?.userId,
    },
  });
  const { data: userData } = useUser();
  const joinClubUpdate = (cache, result) => {
    const {
      data: {
        joinClub: { ok, id },
      },
    } = result;
    if (ok && userData?.me) {
      const newMember = {
        __typename: "Member",
        createdAt: Date.now() + "",
        id,
        user: {
          ...userData.me,
        },
        club: {
          isJoined: true,
        },
      };
      const newCacheMember = cache.writeFragment({
        data: newMember,
        fragment: gql`
          fragment NewMember on Member {
            id
            user {
              username
              avatar
            }
            club {
              isJoined
            }
            createdAt
          }
        `,
      });
      cache.modify({
        id: `Club:${state?.clubId}`,
        fields: {
          clubMember(prev) {
            return [...prev, newCacheMember];
          },
          totalMember(prev) {
            return prev + 1;
          },
        },
      });
      navigate(`/club/${data?.seeClub?.clubname}`, {
        state: { clubId: state?.clubId, userId: userData?.me.id },
      });
    };
  }
  const [joinClub] = useMutation(JOIN_CLUB_MUTATION, {
    variables: {
      clubId: state?.clubId
    },
    update: joinClubUpdate,
    refetchQueries: [SEE_JOINED_CLUB],
  });
  const joinedSticky = <JoinNav {...joinData?.seeJoinedClub} />;
  const unjoinedSticky = (
    <UnjoinNav 
      title={data?.seeClub?.clubname} 
      onClick={joinClub} 
    />
  );
  const [stickyNav, setStickyNav] = useState({
    Sticky : joinedSticky

  });
  const updateSticky = () => {
    setStickyNav(previousState => {
      return { ...previousState, Sticky: unjoinedSticky }
    });
  }
  console.log(data?.seeClub.isJoined);
  return (
    <Container>
      <Header />
      <ClubContainer>
        <ClubInfo>
          <ClubItem key={data?.seeClub.id} {...data?.seeClub} />
        </ClubInfo>
      </ClubContainer>
  
      <StickyContainer>
        <ClubNavItem> 
          {data?.seeClub.isJoined === false ? unjoinedSticky : joinedSticky }
        </ClubNavItem>
      </StickyContainer>

      <Content>
        {data?.seeClub.isJoined === false ? 
          <div>unjoin_Club_Close</div> 
          : 
          <Outlet />
        }
      </Content>
    </Container>
  );
}

export default ClubRoot;
