import PropTypes from "prop-types";
import styled from "styled-components";
import { MainText, SubText } from "../shared";

const Text = styled(MainText)`
  font-weight: bold;
`;
const EmblemWrap = styled.div`
  padding: 30px 50px;
`;
const ClubEmblem = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 75px;
  border: 5px solid ${(props) => props.theme.primary};
`;
const InfoWrap = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px 50px;
`;
const ClubnameText = styled(MainText)`
  font-weight: bold;
  font-size: 30px;
`;
const ClubAreaText = styled(SubText)`
  font-size: 15px;
`;
const LeaderText = styled(SubText)`
  margin-top: 15px;
  font-size: 13px;
`;
const MemberText = styled(SubText)`
  font-size: 13px;
`;

function ClubItem({ club }) {
  return (
    <div>
      <EmblemWrap>
        {club?.emblem ? (
          <ClubEmblem src={club?.emblem} />
        ) : (
          <ClubEmblem src={require('../../data/2bar.jpg')} />
        )}
      </EmblemWrap>
      
      <InfoWrap>
        <ClubnameText>{club?.clubname}</ClubnameText>
        <ClubAreaText>{club?.clubArea}</ClubAreaText>
        <Text>sports</Text>
        <LeaderText>Leader <Text>{club?.clubLeader.username}</Text></LeaderText>
        <MemberText>{club?.totalMember === 1 ? "Member" : "Members"} <Text>{club?.totalMember}</Text></MemberText>
      </InfoWrap> 
    </div>
  );
}

ClubItem.propTypes = {
  club: PropTypes.shape({
    id: PropTypes.number,
    clubname: PropTypes.string,
    emblem: PropTypes.string,
    clubArea: PropTypes.string,
    clubLeader: PropTypes.shape({
      username: PropTypes.string,
    }),
    sports: PropTypes.string,
    totalMember: PropTypes.number,
  }),
};

export default ClubItem;