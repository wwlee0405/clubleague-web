import { gql } from "@apollo/client";
import { CLUB_FRAGMENT, MEMBER_FRAGMENT, GAME_FRAGMENT } from "./fragments";

export const SEE_CLUB = gql`
  query seeClub($id: Int!) {
    seeClub(id: $id) {
      ...ClubFragment
      clubMember {
        ...MemberFragment
      }
    }
  }
  ${CLUB_FRAGMENT}
  ${MEMBER_FRAGMENT}
`;

export const SEE_JOINED_CLUB = gql`
  query seeJoinedClub($userId:Int!,$clubId: Int!) {
    seeJoinedClub(userId: $userId,clubId: $clubId) {
      id
      boardAuth
      user {
        id
      }
      club {
        ...ClubFragment
        writeAuth
        inviteAuth
      }
    }
  }
  ${CLUB_FRAGMENT}
`;

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
      date
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