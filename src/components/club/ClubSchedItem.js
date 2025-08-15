import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Avatar from "../shared/Avatar";
import { MainText, SubText } from "../shared";

const Container = styled.div`
  border-radius: 15px;
  margin: 5px;
  padding: 15px;
  elevation: 2;
  background-color: ${(props) => props.theme.cardContent};
`;
const SchedContent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 15px;
`;
const SchedData = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const DateText = styled(MainText)`
  font-size: 30px;
  font-weight: bold;
`;
const DateList = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 10px;
`;
const WeekText = styled(MainText)`
  font-weight: bold;
`;
const MonthText = styled(SubText)`
`;
const Sports = styled(MainText)`
  font-weight: 600;
  font-size: 15px;
`;
const MatchContent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-horizontal: 15px;
  margin-bottom: 15px;
  
`;
const MatchData = styled.div`
  align-items: center;
  justify-content: center;
`;
const HomeAway = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;
const VersusText = styled(SubText)`
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  margin-right: 10px;
`;
const HomeAwayList = styled.div`
  display: flex;
  flex-direction: row;
  padding-left: 10px;
`;
const ClubName = styled(MainText)`
  font-size: 17px;
  font-weight: 600;
  text-align: center;
  padding-left: 10px;
`;
const EnteryText = styled(MainText)`
`;
const TimeLocationContent = styled.div`
  align-items: center;
  justify-content: center;
`;
const TimeText = styled.span`
  font-size: 25px;
  font-weight: bold;
  color: ${(props) => props.theme.symbolColor};
`;
const Location = styled(SubText)`
  font-weight: 600;
  padding-left: 10px;
`;

function ClubSchedItem({
  id,
  club,
  home,
  away,
  isEntry,
  entryNumber
}) {
  return (
    <Container>
      
      <SchedContent>
        <SchedData>
          <DateText>23</DateText>
          <DateList>
            <WeekText>SUNDAY</WeekText>
            <MonthText>OCT</MonthText>
          </DateList>
        </SchedData>
        <div>
          <Sports>Soccer Match</Sports>
        </div>
      </SchedContent>

      <MatchContent>
        <MatchData>
          {club.id === home.homeGame?.club.id ? (
            <HomeAway>
              <VersusText>VS</VersusText>
                <Avatar lg url={away.homeGame?.club.emblem} />
                <ClubName>{away.homeGame?.club.clubname}</ClubName>
              
            </HomeAway>
          ) : (
            <HomeAway>
              <VersusText>VS</VersusText>
              <HomeAwayList>
                <Avatar lg url={require('../../data/1ars.jpg')} />
                <ClubName>{away.awayGame?.club.clubname}Not Yet</ClubName>
              </HomeAwayList>
            </HomeAway>
          )}
        </MatchData>
      </MatchContent>

      <EnteryText>{entryNumber === 1 ? "1 entry" : `${entryNumber} entries`}</EnteryText>
      <TimeLocationContent>
        <TimeText>10:00-14:00</TimeText>
        <Location>Santiago Bernabéu</Location>
      </TimeLocationContent>
      
    </Container>
  );
}

ClubSchedItem.propTypes = {
  club: PropTypes.shape({
  id: PropTypes.number,
  isJoined: PropTypes.bool,
  }),
  home: PropTypes.shape({
    homeGame: PropTypes.shape({
      club: PropTypes.shape({
        id: PropTypes.number,
        clubname: PropTypes.string,
        emblem: PropTypes.string,
      }),
    }),
    awayGame: PropTypes.shape({
      club: PropTypes.shape({
        id: PropTypes.number,
        clubname: PropTypes.string,
        emblem: PropTypes.string,
      }),
    }),
  }),
  away: PropTypes.shape({
    awayGame: PropTypes.shape({
      club: PropTypes.shape({
        id: PropTypes.number,
        clubname: PropTypes.string,
        emblem: PropTypes.string,
      }),
    }),
  }),
  entryNumber: PropTypes.number,
  isEntry: PropTypes.bool,
};

export default ClubSchedItem;