import { gql, useQuery } from "@apollo/client";
import { useLocation } from "react-router-dom";
import PageTitle from "../../components/PageTitle";
import styled from "styled-components";
import MemberRow from "../../components/profile/MemberRow";

const SEE_CLUB = gql`
  query seeClub($id: Int!) {
    seeClub(id: $id) {
      id
      clubname
      totalMember
      clubLeader {
        username
      }
      clubMember {
        id
        user {
          avatar
          username
        }
        boardAuth
      }
    }
  }
`;

const Container = styled.div`
  background-color: ${(props) => props.theme.cardHeader};
  border-radius: 15px;
  border: 1px solid ${(props) => props.theme.border};
  max-width: 615px;
  padding: 10px 0px;
  height: 500px;
`;
const MemberCount = styled.span`
  opacity: 0.7;
  margin: 5px 15px;
  font-size: 12px;
  color: ${(props) => props.theme.darkGrey};
`;

function ClubMember() {
  const { state } = useLocation();
  const { data, loading } = useQuery(SEE_CLUB, {
    variables: {
      id: state?.clubId,
    },
  });
  return (
    <Container>
      <PageTitle
        title={
        loading ? "Loading..." : `${data?.seeClub?.clubname}'s Club`
        }
      />
      <MemberCount>
        {data?.seeClub?.totalMember === 1 ?
          "1 member" : `${data?.seeClub?.totalMember} members`
        }
      </MemberCount>
      {data?.seeClub?.clubMember?.map((members) => (
        <MemberRow key={members.id} {...members} />
      ))}
    </Container>
    
  );
}
export default ClubMember;
