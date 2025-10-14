import React, { useState } from "react";
import { gql, useQuery } from "@apollo/client";
import MatchItem from "../components/match/MatchItem";
import PageTitle from "../components/PageTitle";
import styled from "styled-components";
import { CardContainer, CardBottom, MainText, SubText } from "../components/shared";
import { GAME_FRAGMENT } from "../fragments";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

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

const CircleActionWrep = styled.div`
  margin: 10px;
  height: 30px;
  width: 30px;
`;
const CircleAction = styled.div`
  display : flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  color: ${(props) => props.theme.subText};
  border: 2px solid ${(props) => props.theme.subText};
  height: 30px;
  width: 30px;
  border-radius: 50%;
  cursor: pointer;
  &:hover,
  &:focus {
    color: ${(props) => props.theme.symbolColor};
    border: 3px solid ${(props) => props.theme.symbolColor};  
  }
`;

function Match() {
  const { data, loading, error, refetch, fetchMore } = useQuery(MATCH_QUERY, {
    variables: {
      offset: 0,
    },
  });

  const loadMoreMatchs = () => {
    fetchMore({
      variables: {
        offset: data?.seeMatch?.length, // Calculate new offset
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        return {
          ...prev,
          seeMatch: [...prev.seeMatch, ...fetchMoreResult.seeMatch], // Merge new matchs
        };
      },
    });
  };
  
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  
  return (
    <div>
      <PageTitle title="Match | Clubleague" />

      <CircleActionWrep>
        <Link to={null}>
          <CircleAction><FontAwesomeIcon icon={faPlus} size="x" /></CircleAction>
        </Link>
      </CircleActionWrep>

      {data?.seeMatch?.map((match) => (
        <MatchItem key={match.id} {...match} /> 
      ))}

      <button onClick={loadMoreMatchs}>Load More</button>
    </div>
  );
}
export default Match;