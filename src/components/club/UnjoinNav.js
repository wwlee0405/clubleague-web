import styled from "styled-components";
import ActionButton from "../shared/ActionButton";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
const NavBtn = styled.div`
  padding: 10px 30px;
  align-items: center;
  justify-content: center;
`;
const NavText = styled.span`
  font-weight: 600;
  font-size: 20px;
`;

function UnjoinNav({ title, onClick }) {
  return (
    <Container>
      <NavBtn>
        <NavText>{title}</NavText>
      </NavBtn>
              
      <NavBtn>
        <ActionButton
          onClick={onClick}
          $buttoncolor={(props) => props.theme.symbolColor}
          $textcolor={(props) => props.theme.white}
          text="Join Club"
        />
      </NavBtn> 
    </Container>
  );
}
export default UnjoinNav;
