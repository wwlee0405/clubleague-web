import styled from "styled-components";
import { Link } from "react-router-dom";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
const NavBtn = styled.div`
  padding: 10px 0px;
  flex-grow: 1;
  cursor: pointer;
`;
const ClubNavItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

function ClubNav({
  id,
  clubname,
}) {
  return (
    <Container>
      <NavBtn>
        <Link to={`/club/${clubname}`} state={{ clubId: id }}>
          <ClubNavItem>
            <span>Home</span>
          </ClubNavItem>
        </Link>
      </NavBtn>
              
      <NavBtn>
        <Link to={`/club/${clubname}/calendar`} state={{ clubId: id }}>
          <ClubNavItem>
            <span>Calendar</span>
          </ClubNavItem>
        </Link>
      </NavBtn>
                        
      <NavBtn>
        <Link to={`/club/${clubname}/member`} state={{ clubId: id }}>
          <ClubNavItem>
            <span>Member</span>
          </ClubNavItem>
        </Link>
      </NavBtn>
              
      <NavBtn>
        <Link to={`/club/${clubname}/setting`} state={{ clubId: id }}>
          <ClubNavItem>
            <span>Setting</span>
          </ClubNavItem>
        </Link>
      </NavBtn>
    </Container>
  );
}
export default ClubNav;