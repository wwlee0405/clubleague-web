import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Header from "./components/Header";

const Container = styled.div`
  background-color: ${(props) => props.theme.bgColor};
`;
const Content = styled.main`
  margin: 0 auto;
  padding-top: 20px;
  padding-bottom: 20px;
  max-width: 615px;
  width: 100%;
`;

function Root() {
  return (
    <Container>
      <Header />
      <Content>
        <Outlet />
      </Content>
    </Container>
  );
}

export default Root;
