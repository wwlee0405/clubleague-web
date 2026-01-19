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

const Form = styled.div`
  // 모바일 (767px 이하) 스타일

  margin: 0 auto;
  justify-content: center;
  display: flex;
  flex-direction: column;
  background-color: ${(props) => props.theme.bgColor};

  // 데스크톱 (768px 이상) 스타일
  @media (min-width: 768px) {
    flex-direction: row;
  }
`;
const Container = styled.div`
  padding: 10px;
`;

function GameFeed() {
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
    <Form>

      <Container>
        <GameItem key={data?.seeGame.id} {...data?.seeGame} />       
      </Container>

      <Container>
        {dataComment?.seeGame?.comments?.map((comment) => (
          <CommentItem key={comment.id} {...comment} />
        ))}
      </Container>

    </Form>
  );
}
export default GameFeed;
