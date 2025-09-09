import { gql, useQuery } from "@apollo/client";
import PageTitle from "../components/PageTitle";
import { GAME_FRAGMENT } from "../fragments";
import { Link } from "react-router-dom";
import MyClubList from "../components/home/MyClubList";
import MySchedItem from "../components/home/MySchedItem";
import styled from "styled-components";
import { MainText } from "../components/shared";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const SEE_MY_CLUB = gql`
  query seeMyClub($offset: Int!) {
    seeMyClub(offset: $offset) {
      id
      user {
        id
      }
      club {
        id
        clubname
        emblem
      }
    }
  }
`;
const SEE_MY_SCHED = gql`
  query seeMySched($offset: Int!) {
    seeMySched(offset: $offset) {
      ...GameFragment
      home {
        homeGame {
          ...GameFragment
        }
      }
      away {
        awayGame {
          ...GameFragment
        }
      }
      entries {
        id
        user {
          username
          avatar
        }
      }
      createdAt
      entryNumber
      isEntry
    }
  }
  ${GAME_FRAGMENT}
`;

const ColumnContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 20px;
`;
const RowContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 20px;
  margin-bottom: 40px;
  padding-left: 10px;
  padding-right: 10px;
`;
const EmblemWrep = styled.div`
  padding: 10px;
  &:hover,
  &:focus {
    border-radius: 10%;
    background-color: ${(props) => props.theme.hover};
  }  
`;
const CircleActionWrep = styled.div`
  padding: 10px;
`;
const TitleWrep = styled.div`
  display: flex;
  justify-content: space-between;
`;
const Title = styled(MainText)`
  font-size: 20px;
  font-weight: 600;
  padding-left: 20px;
  padding-right: 20px;
`;
const Action = styled.div`
  width: 25px;
  height: 25px;
  border-radius: 50%;
  margin-right: 20px;
  justify-content: center;
  align-items: center;
  display: flex;
  color: ${(props) => props.theme.text};
  cursor: pointer;
  &:hover,
  &:focus {
    background-color: ${(props) => props.theme.hover};
  }
`;
const CircleAction = styled.div`
  display : flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  color: ${(props) => props.theme.subText};
  border: 2px solid ${(props) => props.theme.subText};
  height: 80px;
  width: 80px;
  border-radius: 50%;
  cursor: pointer;
  &:hover,
  &:focus {
    color: ${(props) => props.theme.symbolColor};
    border: 3px solid ${(props) => props.theme.symbolColor};  
  }
`;

function Home() {
  const { data: clubData } = useQuery(SEE_MY_CLUB, {
    variables: {
      offset: 0,
    },
  });
  const { data } = useQuery(SEE_MY_SCHED, {
    variables: {
      offset: 0,
    },
  });
  return (
    <div>
      <PageTitle title="Home" />
      <TitleWrep>
        <Title>My Club</Title>
        <Link to={`/createclub`}>
          <Action>
            <FontAwesomeIcon icon={faPlus} fontSize="20px" />
          </Action>
        </Link>
      </TitleWrep>
      <RowContainer>
        {clubData?.seeMyClub?.map((myClubs) => (
          <EmblemWrep>
            <MyClubList key={myClubs.id} {...myClubs} />
          </EmblemWrep>
        ))}
        <CircleActionWrep>
          <Link to={`/createclub`}>
            <CircleAction><FontAwesomeIcon icon={faPlus} size="2x" /></CircleAction>
          </Link>
        </CircleActionWrep>
      </RowContainer>

      <Title>My Schedule</Title>
      <ColumnContainer>
        {data?.seeMySched?.map((sched) => (
          <MySchedItem key={sched.id} {...sched} />
        ))}
      </ColumnContainer>
    </div>
  );
}
export default Home;
