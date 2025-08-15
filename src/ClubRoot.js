import { useState } from "react";
import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Header from "./components/Header";
import ClubItem from "./components/club/ClubItem";
import ClubNav from "./components/ClubNav";
import { CLUB_FRAGMENT, MEMBER_FRAGMENT, GAME_FRAGMENT } from "./fragments";
import { gql, useQuery } from "@apollo/client";
import { useLocation } from "react-router-dom";
import { HeaderStyle } from "./components/shared";

const ROOT_SEE_CLUB = gql`
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

const Container = styled.div`
  background-color: ${(props) => props.theme.bgColor};
`;
const ClubContainer = styled(HeaderStyle)``;
const ClubInfo = styled.div`
  margin: 0 auto;
  max-width: 615px;

  //background-color: ${(props) => props.theme.cardHeader};
  //border-top-left-radius: 15px;
  //border-top-right-radius: 15px;
  //border: 1px solid ${(props) => props.theme.border};
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
  const { state } = useLocation();
  const { data, loading } = useQuery(ROOT_SEE_CLUB, {
    variables: {
      id: state?.clubId,
    },
  });
  
  const noSticky = <ClubNav key={data?.seeClub.id} {...data?.seeClub} />;
  const [stickyNav, setStickyNav] = useState({
    Sticky : noSticky

  });
  const updateSticky = () => {
    setStickyNav(previousState => {
      return { ...previousState, Sticky: yesSticky }
    });
  }
  const yesSticky = <span>ysesfs</span>;

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
          {stickyNav ? noSticky : yesSticky}       
        </ClubNavItem>
      </StickyContainer>
      <Content> 
        <Outlet />
      </Content>
    </Container>
  );
}

export default ClubRoot;
