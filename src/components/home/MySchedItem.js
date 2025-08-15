import React from "react";
import { gql, useMutation } from "@apollo/client";
import PropTypes from "prop-types";
import styled from "styled-components";
import { CardContainer, CardBottom, MainText, SubText } from "../shared";
import HeaderAvatar from "../shared/HeaderAvatar";
import Avatar from "../shared/Avatar";
import ActionButton from "../shared/ActionButton";

const TOGGLE_ENTRY_MUTATION = gql`
  mutation toggleEntry($gameId: Int!) {
    toggleEntry(gameId: $gameId) {
      ok
      error
      id
    }
  }
`;

const Container = styled(CardContainer)`
  margin-bottom: 20px;
  elevation: 2;
`;
const SchedCard = styled(CardBottom)`
  padding: 10px 15px;
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
  padding: 10px;
`;
const EnteryText = styled(MainText)``;
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
const buttonColor = {
  main: (props) => props.theme.blue
};
const textColor = {
  main: (props) => props.theme.white
};

function MySchedItem({ id, club, entryNumber, isEntry, loading }) {
  const toggleEntryUpdate = (cache, result) => {
    const {
      data: {
        toggleEntry: { ok },
      },
    } = result;
    if (ok) {
      const gameId = `Game:${id}`;
      cache.modify({
        id: gameId,
        fields: {
          isEntry(prev) {
            return !prev;
          },
          entryNumber(prev) {
            if (isEntry) {
              return prev - 1;
            }
            return prev + 1;
          },
        },
      });
    }
  };
  const [toggleEntry] = useMutation(TOGGLE_ENTRY_MUTATION, {
    variables: {
      gameId: id,
    },
    update: toggleEntryUpdate,
  });
  
  return (
    <Container key={id}>
      <HeaderAvatar
        profileLink={`/club/${club?.clubname}`} 
        profileState={{ clubId: club?.id }}
        image={club?.emblem ? club?.emblem : require('../../data/1ars.jpg')}
        topData={club?.clubname}
        bottomData="Seoul, Korea"
      />
      
      <SchedCard>
        <SchedContent>
          <SchedData>
            <DateText>23</DateText>
            <DateList>
              <WeekText>SUNDAY</WeekText>
              <MonthText>OCT</MonthText>
            </DateList>
          </SchedData>
          <div>
            <Sports>Soccer</Sports>
          </div>
        </SchedContent>

        <MatchContent>
          <MatchData>
            <HomeAway>
              <VersusText>VS</VersusText>
              <HomeAwayList>
                <Avatar lg url={require('../../data/2bar.jpg')} />
                <ClubName>Not Yet</ClubName>
              </HomeAwayList>
            </HomeAway>
          </MatchData>

          <ActionButton
            onClick={toggleEntry}
            buttonColor={isEntry ? { main: (props) => props.theme.grey03 } : buttonColor}
            textColor={isEntry ? { main : (props) => props.theme.black } : textColor}
            text={isEntry ? "Unentry" : "Entry"}
          />
        </MatchContent>

        <EnteryText>{entryNumber === 1 ? "1 entry" : `${entryNumber} entries`}</EnteryText>
        <TimeLocationContent>
          <TimeText>10:00-14:00</TimeText>
          <Location>Santiago Bernabéu</Location>
        </TimeLocationContent>

      </SchedCard>
    </Container>
  );
}

MySchedItem.propTypes = {
  id: PropTypes.number.isRequired,
  club: PropTypes.shape({
    clubname: PropTypes.string.isRequired,
  }),
  home: PropTypes.shape({
    homeGame: PropTypes.shape({
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

export default MySchedItem;