import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import styled from "styled-components";
import Avatar from "../shared/Avatar";

const Wrapper = styled.div`
  padding: 8px 0px;
`;
const Column = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const Username = styled.span`
  padding-left: 5px;
  font-weight: 600;
  font-size: 15px;
  color: ${(props) => props.theme.text};
`;

function ProfileRow({ profileLink, state, avatar, username, lg }) {
  return (
    <Wrapper>
      <Column>
        {avatar ? 
          <Link to={profileLink} state={state}>
            <Avatar url={avatar} />
          </Link>
          : 
          <Link to={profileLink} state={state}>
            <Avatar url={require('../../data/gggg.jpg')} />
          </Link>
        }
        <Link to={profileLink} state={state}>
          <Username>{username}</Username>
        </Link> 
      </Column>
    </Wrapper>
  );
}
  
ProfileRow.propTypes = {
  avatar: PropTypes.string,
  username: PropTypes.string.isRequired,
};

export default ProfileRow;
