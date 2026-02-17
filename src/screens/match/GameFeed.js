import { gql, useQuery } from "@apollo/client";
import { GAME_FRAGMENT, COMMENT_FRAGMENT } from "../../gql/fragments";
import PageTitle from "../../components/PageTitle";
import GameItem from "../../components/match/GameItem";
import { useLocation } from "react-router-dom";
import styled from "styled-components";

const SEE_GAME = gql`
  query seeGame($id: Int!) {
    seeGame(id: $id) {
      id
      user {
        id
        avatar
        username
      }
      file
      caption
      date
      homeGame {
        ...GameFragment
        entryNumber
        entries {
          id
          user {
            avatar
            username
          }
        }
        isEntry
      }
      awayGame {
        ...GameFragment
        entryNumber
        entries {
          user {
            avatar
            username
          }
        }
        isEntry
      }
      comments {
        ...CommentFragment
      }  
      commentNumber
    }
  }
  ${GAME_FRAGMENT}
  ${COMMENT_FRAGMENT}
`;

const Container = styled.div`
  margin: 0 auto;
  padding-top: 20px;
  padding-bottom: 20px;
  max-width: 615px;
  width: 100%;
`;

function GameFeed() {
  const { state } = useLocation();
  const { data } = useQuery(SEE_GAME, {
    variables: {
      id: state?.matchId,
    },
  });
  return (
    <Container>
      <GameItem key={data?.seeGame.id} {...data?.seeGame} />
    </Container>
  );
}
export default GameFeed;
