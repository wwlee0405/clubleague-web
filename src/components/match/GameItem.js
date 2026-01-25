import { gql, useQuery, useMutation } from "@apollo/client";
import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  faClock,
  faMap,
} from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import { CardContainer, CardBottom, MainText, SubText } from "../shared";
import HeaderAvatar from "../shared/HeaderAvatar";
import useUser from "../../hooks/useUser";
import useModal from '../../hooks/useModal';
import useEntryModal from '../../hooks/useEntryModal';
import ProfileRow from "../profile/ProfileRow";
import DateTime_Month from "../shared/DateTime_Month";
import DateTime_DayOfWeek from "../shared/DateTime_DayOfWeek";

import AwayClubModal from "./AwayClubModal";
import Avatar from "../shared/Avatar";
import ActionButton from "../shared/ActionButton";

const SEE_MY_CLUB = gql`
  query seeMyClub($offset: Int!) {
    seeMyClub(offset: $offset) {
      id
      club {
        id
        clubname
        emblem
      }
    }
  }
`;

const Container = styled(CardContainer)``;
const ExtraContainer = styled(CardBottom)``;
const Dates = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px 0px;
  align-items: center;
`;
const MatchDate = styled(MainText)`
  font-weight: bold;
  font-size: 35px;
`;
const MatchWeek = styled(MainText)`
  font-weight: 600;
  font-size: 20px;
`;
const GameContent = styled.div`
  display: flex;
  flex-direction: row;
  margin: 0px 15px 0px;
`;
const ClubData = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 15px;
  align-items: center;
  width: 35%;
`;
const ClubEmblem = styled.img`
  width: 60px;
  height: 60px;
  border-radius: 30px;
`;
const ClubName = styled(MainText)`
  font-size: 15px;
  font-weight: bold;
  text-align: center;
`;
const KickOffData = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 30%;
`;
const KickOffTime = styled.span`
  color: ${(props) => props.theme.yellow};
  font-size: 30px;
  font-weight: bold;
  text-align: center;
  margin: 5px 0px;
`;
const Location = styled(SubText)`
  width: 150px;
  display: block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 13px;
  text-align: center;
`;
const AwayBtn = styled.div`
  margin-bottom: 15px;
  align-items: center;
  width: 35%;
`;
const AwayText = styled(SubText)`
  font-weight: 600;
  font-size: 25px;
`;
const TimeLocationContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const TimeLocationData = styled(SubText)`
  flex-direction: row;
  align-items: center;
`;
const TimeLocation = styled.span`
  padding-left: 3px;
`;
const EntryContent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
const Entry = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 5px 15px 5px;
  cursor: pointer;
`;
const EntryText = styled(SubText)`
  justify-content: center;
  align-items: center;
  padding-right: 10px;
`;
const UserAvatar = styled.img`
  width: 25px;
  height: 25px;
  border-radius: 12.5px;
`;
const FileImg = styled.img`
  min-width: 100%;
  max-width: 100%;
`;


const CaptionData = styled.div`
  margin: 10px 15px;
  padding-horizontal: 15px;
`;
const CommentContent = styled.div`
  margin: 8px 15px;
`;
const CommentCount = styled(SubText)`
  font-weight: 600;
  font-size: 14px;
`;

const AwayData = styled.div`
  background-color: ${(props) => props.theme.cardContent};
  border-radius: 5px; 
  width: 100%;
  padding: 5px;
  cursor: pointer;
  &:hover,
  &:focus {
    background-color: ${(props) => props.theme.hover};
  }
`;
const ModalWrapper = styled.div`
  align-items: center;
  padding: 5px 20px;
  cursor: pointer;
  &:hover,
  &:focus {
    background-color: ${(props) => props.theme.hover};
  }
`;
const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 5px 0px;
`;
const AwayClubname = styled(MainText)`
  padding-left: 10px;
  font-size: 18px;
  font-weight: 600;
`;
const TitleText = styled(SubText)`
  font-size: 15px;
`;
const SelectText = styled(MainText)`
  font-size: 18px;
  font-weight: 600;
`;

function GameItem({ id, user, homeGame, awayGame, caption, date, commentNumber }) {
  const { data } = useUser();
  const { EntryModal: HomeEntryModal, entryOpen: homeEntryOpen } = useEntryModal();
  const { EntryModal: AwayEntryModal, entryOpen: awayEntryOpen } = useEntryModal();

  const { Modal: AwayGame, open: awayGameOpen, close: awayGameClose } = useModal();

  const [chosenClubId, setChosenClubId] = useState("");
  const [chosenClubname, setChosenClubname] = useState("");
  const [chosenEmblem, setChosenEmblem] = useState("");
    
  const chooseClub = (clubId, clubname, emblem) => {
    setChosenClubId(clubId);
    setChosenClubname(clubname);
    setChosenEmblem(emblem);
  };

  const { data: awayClubData } = useQuery(SEE_MY_CLUB, {
    variables: {
      offset: 0,
    },
  });
  
  //Mon Dec 01 2025
  //const year = dateString.slice(11, 15);  "2025" 
  //Thu Dec 25 2025 10:10:00 GMT+0900 (한국 표준시)
  const day = new Date(parseInt(date)).toString().slice(8, 10);
  const time = new Date(parseInt(date)).toString().slice(16, 21);
  return (
    <Container key={id}>
      <HeaderAvatar
        profileLink={
          data?.me?.username !== user?.username ? 
            (`/users/${user?.username}`) : (`/${data?.me?.username}`)
        }
        image={user?.avatar ? user.avatar : require('../../data/gggg.jpg')}
        topData={user?.username}
        bottomData="Seoul, Korea"
      />
     
      <ExtraContainer>
        <Dates>
          <MatchDate><DateTime_Month date={date} /> {day}</MatchDate>
          <MatchWeek><DateTime_DayOfWeek date={date} /></MatchWeek>
        </Dates>

        <GameContent>
          <ClubData>
            {homeGame?.club.emblem ? (
              <ClubEmblem src={homeGame?.club.emblem} />
            ) : (
              <ClubEmblem src={require('../../data/2bar.jpg')} />
            )}
            <ClubName>{homeGame?.club.clubname}</ClubName>
          </ClubData>
          <KickOffData>
            <KickOffTime>{time}</KickOffTime>
            <Location>Santiago Bernabéu dkndkfnbkdfnbkfjdnb</Location>
          </KickOffData>
          {awayGame?.id ? (
            <ClubData
              onClick={() => null}
            >
              {awayGame?.club.emblem ? (
                <ClubEmblem src={awayGame?.club.emblem} />
              ) : (
                <ClubEmblem src={require('../../data/2bar.jpg')} />
              )}
                <ClubName>{awayGame?.club.clubname}hvbhjvhvhgvhgvgvvgvgvgvgv</ClubName>
            </ClubData>
          ) : (
            <ClubData>
              <AwayText>Away</AwayText>
            </ClubData>
            )}
        </GameContent>

        <TimeLocationContent>
          <TimeLocationData>
            <FontAwesomeIcon icon={faClock} size="1x" />
            <TimeLocation>14:00 - 16:00</TimeLocation>
          </TimeLocationData>
          <TimeLocationData>
            <FontAwesomeIcon icon={faMap} size="1x"/>
           
            <TimeLocation>Camp Nou</TimeLocation>
          </TimeLocationData>
        </TimeLocationContent>

        <EntryContent>
          <Entry onClick={homeEntryOpen}>          
            <EntryText>{homeGame?.entryNumber === 1 ? "1 entry" : `${homeGame?.entryNumber} entries`}</EntryText>
            <div>
              <UserAvatar src={require('../../data/ffff.jpg')} />
            </div>
            <div>
              <UserAvatar src={require('../../data/gggg.jpg')} />
            </div>
          </Entry>
          {/* Home Entry Modal */}
          <HomeEntryModal>
            <div>
              {homeGame?.entries?.map((entry) => (
                <ProfileRow  
                  profileLink={
                    data?.me?.username !== entry?.user.username ? 
                      (`/users/${entry?.user.username}`) : (`/${data?.me?.username}`)
                  } 
                  avatar={entry?.user.avatar} 
                  username={entry?.user.username} 
                />
              ))}
            </div>
          </HomeEntryModal>

          {awayGame?.id ? (
            <div>
              <Entry onClick={awayEntryOpen}>
                <EntryText>{awayGame?.entryNumber === 1 ? "1 entry" : `${awayGame?.entryNumber} entries`}</EntryText>
                <div style={{ paddingRight: 3 }}>
                  <UserAvatar src={require('../../data/ffff.jpg')} />
                </div>
                <div style={{ paddingRight: 3 }}>
                  <UserAvatar src={require('../../data/gggg.jpg')} />
                </div>
              </Entry>
              {/* Away Entry Modal */}
              <AwayEntryModal>
                <div>
                  {awayGame?.entries?.map((entry) => (
                    <ProfileRow
                      profileLink={
                        data?.me?.username !== entry?.user.username ? 
                          (`/users/${entry?.user.username}`) : (`/${data?.me?.username}`)
                      }
                      avatar={entry?.user.avatar} 
                      username={entry?.user.username} 
                    />
                  ))}
                </div>
              </AwayEntryModal>
            </div>       
          ) : (
            <Entry>
              <EntryText>No awayclub</EntryText>
            </Entry>
          )}
        </EntryContent>

        <FileImg 
          src={require('../../data/bbbb.jpg')} 
        />

        <div>
          <AwayData onClick={awayGameOpen}>
            {chosenClubId !== "" ? (
              <Row>
                <Avatar url={require('../../data/gggg.jpg')} />   
                <AwayClubname>{chosenClubname}</AwayClubname>
              </Row>
            ) : (
              <TitleText>Select a home club to play the game</TitleText>
            )}
          </AwayData>
        </div>
        <AwayGame title="Away 클럽을 정하시오.">
          
          <AwayClubModal
            matchId={id} 
            userId={user?.id}  
            onClose={awayGameClose}
          />
        </AwayGame>

        <CaptionData>
          <span>{caption}</span>
        </CaptionData>

        <CommentContent>
          <CommentCount>{commentNumber === 1 ? "1 comment" : `${commentNumber} comments`}</CommentCount>
        </CommentContent>

      </ExtraContainer>
    
    </Container>
  );
}

GameItem.propTypes = {
  id: PropTypes.number,
  user: PropTypes.shape({
    id: PropTypes.number,
    avatar: PropTypes.string,
    username: PropTypes.string.isRequired,
  }),
  caption: PropTypes.string,
  date: PropTypes.string,
  homeGame: PropTypes.shape({
    id: PropTypes.number,
    entryNumber: PropTypes.number,
    club: PropTypes.shape({
      clubname: PropTypes.string,
      emblem: PropTypes.string,
    }),
    entries: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        user: PropTypes.shape({
          username: PropTypes.string,
          avatar: PropTypes.string,
        }),
      }),
    ),
  }),
  awayGame: PropTypes.shape({
    id: PropTypes.number,
    entryNumber: PropTypes.number,
    club: PropTypes.shape({
      clubname: PropTypes.string,
      emblem: PropTypes.string,
    }),
    entries: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        user: PropTypes.shape({
          username: PropTypes.string,
          avatar: PropTypes.string,
        }),
      }),
    ),
  }),
  commentNumber: PropTypes.number,
};

export default GameItem;