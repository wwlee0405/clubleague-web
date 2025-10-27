import { gql, useQuery } from "@apollo/client";
import { GAME_FRAGMENT, COMMENT_FRAGMENT } from "../../gql/fragments";
import PageTitle from "../../components/PageTitle";
import GameItem from "../../components/match/GameItem";
import CommentItem from "../../components/match/CommentItem";
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
      commentNumber
    }
  }
  ${GAME_FRAGMENT}
`;

const SEE_GAME_COMMENTS = gql`
  query seeGame($id: Int!) {
    seeGame(id: $id) {
      id
      comments {
        ...CommentFragment
      }
      commentNumber
    }
  }
  ${COMMENT_FRAGMENT}
`;

const Background = styled.div`
  background-color: ${(props) => props.theme.bgColor};
`;
const Container = styled.div`
  margin: 0 auto;
  max-width: 925px;
  padding: 20px 0;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
`;
const WrapComment = styled.div`
  display: flex;
  flex-direction: column;


  padding-left: 20px;
`;

function GameFeed({ route }) {
  const { state } = useLocation();
  const { data } = useQuery(SEE_GAME, {
    variables: {
      id: state?.matchId,
    },
  });
  const { data: dataComment } = useQuery(SEE_GAME_COMMENTS, {
    variables: {
      id: state?.matchId,
    },
  });
  return (
    <Background>

      <Container>
        <GameItem key={data?.seeGame.id} {...data?.seeGame} />
        
        <WrapComment>
          {dataComment?.seeGame?.comments?.map((comment) => (
            <CommentItem key={comment.id} {...comment} />
          ))}
        </WrapComment>
      </Container>

    </Background>
  );
}
export default GameFeed;
