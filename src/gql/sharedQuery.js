import { gql } from "@apollo/client";
import { GAME_FRAGMENT } from "./fragments";

export const MATCH_QUERY = gql`
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

export const SEE_GAME = gql`
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
        isEntry
      }
      awayGame {
        ...GameFragment
        entryNumber
        isEntry
      }
      commentNumber
    }
  }
  ${GAME_FRAGMENT}
`;