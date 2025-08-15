import styled from "styled-components";
import Header from "./Header";
import React from "react";

const Content = styled.main`
  margin: 0 auto;
  margin-top: 45px;
  max-width: 615px;
  width: 100%;
`;

function Layout({ children }) {
  return (
    <>
      <Header />
      <Content>{children}</Content>
    </>
  );
}

export default Layout;