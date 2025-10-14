import { gql, useQuery } from "@apollo/client";
import { useLocation } from "react-router-dom";
import PageTitle from "../../components/PageTitle";
import { CLUB_FRAGMENT, MEMBER_FRAGMENT, GAME_FRAGMENT } from "../../fragments";
import ClubSchedItem from "../../components/club/ClubSchedItem";
import styled from "styled-components";

const JOIN_CLUB_MUTATION = gql`
  mutation joinClub($clubId: Int!) {
    joinClub(clubId: $clubId) {
      ok
      error
      id
    }
  }
`;
export const SEE_CLUB = gql`
  query seeClub($id: Int!) {
    seeClub(id: $id) {
      ...ClubFragment
      clubMember {
        ...MemberFragment
      }
    }
  }
  ${CLUB_FRAGMENT}
  ${MEMBER_FRAGMENT}
`;
const SEE_CLUB_SCHED = gql`
  query seeClubSched($id: Int! ,$offset: Int!) {
    seeClubSched(id: $id, offset: $offset) {
      id
      sport
      club {
        id
        isJoined
      }
      home {
        homeGame {
          ...GameFragment
        }
        awayGame {
          ...GameFragment
        }
      }
      away {
        homeGame {
          ...GameFragment
        }
        awayGame {
          ...GameFragment
        }
      }
      entries {
        user {
          username
        }
      }
      entryNumber
      isEntry
      createdAt
    }
  }
  ${GAME_FRAGMENT}
`;

const Container = styled.div`
  background-color: ${(props) => props.theme.cardHeader};
  border-radius: 15px;
  border: 1px solid ${(props) => props.theme.border};
  max-width: 615px;
`;
const NoSched = styled.div`
  display: flex;
  height: 500px;
  align-items: center;
  justify-content: center;
`;
const BottomText = styled.span`
  font-weight: bold;
  font-size: 20px;
  text-align: center;
  color: ${(props) => props.theme.subText};
`;

function Clubhouse() {
  const { state } = useLocation();
  const { data, loading } = useQuery(SEE_CLUB, {
    variables: {
      id: state?.clubId,
    },
  });
  const { data: schedData } = useQuery(SEE_CLUB_SCHED, {
    variables: {
      id: state?.clubId,
      offset: 0,
    },
  });
  const clubSched = schedData?.seeClubSched?.map((sched) => 
    <ClubSchedItem key={sched.id} {...sched} />
  );

  console.log(state?.clubId);
  console.log(state?.userId);
  return (
    <Container>
      <PageTitle
        title={
          loading ? "Loading..." : `A${data?.seeClub?.clubname}`
        }
      />

      {schedData?.seeClubSched ? 
        clubSched
        : (
        <NoSched>
          <BottomText>클럽에 일정이 없습니다.</BottomText>
        </NoSched>
      )}

      <NoSched>
          <BottomText>클럽에 일정이 없습니다.</BottomText>
        </NoSched>
    </Container>
  );
}
export default Clubhouse;
