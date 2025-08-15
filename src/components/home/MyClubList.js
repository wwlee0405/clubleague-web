import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import styled from "styled-components";

const ClubTeam = styled.div`
  display: flex;
  flex-direction: column;
  width: 80px;
`;
const ClubEmblem = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
`;
const ClubName = styled.span`
  font-weight: bold;
  width: 80px;
  height: 30px;
  display: block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: center;
  color: ${(props) => props.theme.text};
  padding-top: 10px;
`;

function MyClubList({ club }) {

  return (
    <Link to={`/club/${club.clubname}`} state={{ clubId: club.id }}>    
      <ClubTeam>
        {club.emblem ?
          (<ClubEmblem src={club.emblem} />)
          :
          (<ClubEmblem src={require('../../data/2bar.jpg')} />)
        }
        <ClubName>{club.clubname}</ClubName>
      </ClubTeam>
    </Link>
  );
}
  
MyClubList.propTypes = {
  club: PropTypes.shape({
    id: PropTypes.number,
    emblem: PropTypes.string,
    clubname: PropTypes.string.isRequired,
  }),
};

export default MyClubList;  