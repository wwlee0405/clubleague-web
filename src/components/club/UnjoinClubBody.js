import styled from "styled-components";
import PageTitle from "../../components/PageTitle";
import ActionButton from "../shared/ActionButton";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;
const NavBtn = styled.div`
  padding: 10px 30px;
  align-items: center;
  justify-content: center;
`;
const Text = styled.span`
  font-weight: 600;
  font-size: 20px;
`;

function UnjoinClubBody({ title }) {
  return (
    <Container>
      <PageTitle
        title={title}
      />
        
      <NavBtn>
        <Text>{title} unjoin_Club_Close</Text>
      </NavBtn>
              
      <NavBtn>
        <ActionButton
          text="Join Club"
        />
      </NavBtn> 
    </Container>
  );
}
export default UnjoinClubBody;
