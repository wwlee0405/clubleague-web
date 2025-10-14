import PropTypes from "prop-types";
import styled from "styled-components";
import { MainText } from "../shared";
import { Link } from "react-router-dom";
import useUser from "../../hooks/useUser";
import Avatar from "../shared/Avatar";

const Wrapper = styled.div`
  padding: 5px 15px;
`;
const Column = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const Username = styled(MainText)`
  padding-left: 10px;
  padding-right: 10px;
  font-weight: 600;
`;

function MemberRow({ user, boardAuth }) {
  const { data } = useUser();
  const profileLink = (
    data?.me?.username !== user.username ? 
      (`/users/${user.username}`) : (`/${data?.me?.username}`)
  );
  return (
    <Wrapper>      
      <Column>
        <Link 
          to={profileLink} 
          state={user.id}
        >
          {user.avatar ? 
            <Avatar url={user.avatar} />
            : 
            <Avatar url={require('../../data/gggg.jpg')} />
          }
        </Link>
        <Link to={profileLink} state={user.id}>
          <Username>{user.username}</Username>
        </Link>
        {boardAuth ? <span>임원</span>: null}
      </Column>
    </Wrapper>
  );
}

MemberRow.propTypes = {
  user: PropTypes.shape({
    avatar: PropTypes.string,
    username: PropTypes.string.isRequired,
  }),
  boardAuth: PropTypes.bool,
};

export default MemberRow;