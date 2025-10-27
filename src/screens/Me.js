import { gql } from "@apollo/client";
import PageTitle from "../components/PageTitle";
import useUser from "../hooks/useUser";
import UserProfile from "../components/profile/UserProfile";
import styled from "styled-components";
import UserSetting from "../components/profile/UserSetting";

const Row = styled.div`
  display: flex;
  flex-direction: row;
`;
const FlexOne = styled.div`
  width: 35%;
`;
const FlexTwo = styled.div`
  width: 65%;
`;

function Me() {
  const { data, loading } = useUser();
    
  return (
    <div>
      <PageTitle
        title={
          loading ? "Loading..." : `${data?.me?.username}'s Profile | Clubleague`
        }
      />

      <UserProfile key={data?.me.id} {...data?.me} />
      <Row>
        <FlexOne>
          <UserSetting />
        </FlexOne>

        <FlexTwo>
          <UserSetting />
        </FlexTwo>          
      </Row>
    </div>
  );
}
export default Me;