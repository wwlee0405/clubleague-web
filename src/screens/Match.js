import React from "react";
import { gql, useQuery } from "@apollo/client";
import MatchItem from "../components/match/MatchItem";
import PageTitle from "../components/PageTitle";
import { GAME_FRAGMENT } from "../fragments";
import { useNavigate } from "react-router-dom";

const MATCH_QUERY = gql`
  query seeMatch($offset: Int!) {
    seeMatch(offset: $offset) {
      id
      user {
        id
        username
        avatar
      }
      homeGame {
        ...GameFragment
      }
      awayGame {
        ...GameFragment
      }
      file
    }
  }
  ${GAME_FRAGMENT}
`;

function Match() {
  const { data, loading } = useQuery(MATCH_QUERY, {
    variables: {
      offset: 0,
    },
  });
  return (
    <div>
      <PageTitle title="Match" />
      {data?.seeMatch?.map((match) => (
        <MatchItem key={match.id} {...match} /> 
      ))}
    </div>
  );
}
export default Match;