import PageTitle from "../../components/PageTitle";
import useUser from "../../hooks/useUser";
import UserProfile from "../../components/profile/UserProfile";
import styled from "styled-components";
import UserSettig from "../../components/profile/UserSettig";

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
          <UserSettig />
        </FlexOne>

        <FlexTwo>
          <UserSettig />
        </FlexTwo>          
      </Row>
    </div>
  );
}
export default Me;