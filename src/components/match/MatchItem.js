import { gql, useMutation } from "@apollo/client";
import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import styled from "styled-components";
import useUser from "../../hooks/useUser";
import { CardContainer, CardBottom, MainText, SubText } from "../shared";
import HeaderAvatar from "../shared/HeaderAvatar";
import DateTime_Month from "../shared/DateTime_Month";
import DateTime_DayOfWeek from "../shared/DateTime_DayOfWeek";

const DELETE_GAME_MUTATION = gql`
  mutation deleteGame($id: Int!) {
    deleteGame(id: $id) {
      ok
    }
  }
`;

const Container = styled(CardContainer)`
  margin-bottom: 20px;
`;
const MatchCard = styled(CardBottom)``;
const SchedContent = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 15px;
`;
const SchedData = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
`;
const DateList = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 10px;
`;
const DateText = styled(MainText)`
  font-size: 35px;
  font-weight: 600;
`;
const WeekText = styled(MainText)`
  font-weight: 600;
`;
const MonthText = styled(SubText)``;
const Sports = styled(MainText)`
  font-size: 15px;
  font-weight: 600;
`;
const GameContent = styled.div`
  margin: 30px 15px 15px;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
`;
const ClubEmblem = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 40px;
`;
const KickOffData = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 30%;
`;
const KickOffTime = styled.span`
  font-size: 40px;
  font-weight: 600;
  text-align: center;
  color: ${(props) => props.theme.yellow};
`;
const Location = styled(SubText)`
  font-size: 15px;
  text-align: center;
  width: 100%;
  overflow: hidden;
`;
const AwayText = styled(SubText)`
  font-size: 35px;
  font-weight: 600;
`;
const VersusContent = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin: 30px;
`;
const VersusText = styled(SubText)`
  font-size: 15px;
  text-align: center;
  color: ${(props) => props.theme.subText};
`;
const ClubName = styled(MainText)`
  font-size: 15px;
  font-weight: 600;
  text-align: center;
  overflow: hidden;
`;

function MatchItem({ id, user, homeGame, awayGame, date }) {
  const { data } = useUser();
  const [modalVisible, setModalVisible] = useState(false);
  const updateDeleteGame = (cache, result) => {
    const {
      data: {
        deleteGame: { ok },
      },
    } = result;
    if (ok) {
      cache.evict({ id: `Match:${id}` });
    }
  };
  const [deleteGameMutation] = useMutation(DELETE_GAME_MUTATION, {
    variables: {
      id,
    },
    update: updateDeleteGame,
  });
  const onDeleteClick = () => {
    deleteGameMutation();
  };

  const day = new Date(parseInt(date)).toString().slice(8, 10);
  const time = new Date(parseInt(date)).toString().slice(16, 21);
  const homeClubname = homeGame.club.clubname;
  const homeEmblem = homeGame.club.emblem;
  const awayClubname = awayGame?.club.clubname;
  const awayEmblem = awayGame?.club.emblem;
  return (
    <Container key={id}>
      <HeaderAvatar
        profileLink={
          data?.me?.username !== user.username ? 
            (`/users/${user.username}`) : (`/${data?.me?.username}`)
        }
        image={user.avatar ? user.avatar : require('../../data/gggg.jpg')}
        topData={user.username}
        bottomData={homeClubname}
        modalVisible={() => setModalVisible(true)}
      />
      
      <Link to={`/match/${id}`} state={{ matchId: id }}>
        <MatchCard>

          <SchedContent>
            <SchedData>
              <DateText>{day}</DateText>
              <DateList>
                <WeekText><DateTime_DayOfWeek date={date} /></WeekText>
                <MonthText><DateTime_Month date={date} /></MonthText>
              </DateList>
            </SchedData>
            <div>
              <Sports>SoccerMatch</Sports>
            </div>       
          </SchedContent>

          <GameContent>
            {homeEmblem ?
              <ClubEmblem src={homeEmblem} />
              :
              <ClubEmblem src={require('../../data/1ars.jpg')} />
            }
            <KickOffData>
              <KickOffTime>{time}</KickOffTime>
              <Location 
              >
                Santiago Bernabéu
              </Location>
            </KickOffData>

            {awayClubname ? (
              <div>
                {awayEmblem ? (
                  <ClubEmblem src={awayEmblem} />
                ) : (
                  <ClubEmblem src={require('../../data/2bar.jpg')} />
                )}
              </div>
            ) : (
              <AwayText>Away</AwayText>
            )}
          </GameContent>
          
          <VersusContent>
            <VersusText>
              <ClubName>{homeClubname} </ClubName>
              V
              {awayClubname ?
                <ClubName> {awayClubname}</ClubName>
                :
                <ClubName> 없음</ClubName>
              }
            </VersusText>
          </VersusContent>

        </MatchCard>
      </Link>
    </Container>
  );
}

MatchItem.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string,
  }),
  date: PropTypes.string,
  homeGame: PropTypes.shape({
    id: PropTypes.number,
    club: PropTypes.shape({
      clubname: PropTypes.string,
      emblem: PropTypes.string,
    }),
  }),
  awayGame: PropTypes.shape({
    id: PropTypes.number,
    club: PropTypes.shape({
      clubname: PropTypes.string,
      emblem: PropTypes.string,
    }),
  }),
};

export default MatchItem;