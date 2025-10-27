import { gql } from "@apollo/client";

export const CLUB_FRAGMENT = gql`
  fragment ClubFragment on Club {
    id
    clubLeader {
      id
      username
    }
    clubname
    clubArea
    emblem
    totalMember
    isJoined
    createdAt
  }
`;

export const MEMBER_FRAGMENT = gql`
  fragment MemberFragment on Member {
    id
    user {
      username
      avatar
    }
    club {
      isJoined
    }
    createdAt
  }
`;

export const GAME_FRAGMENT = gql`
  fragment GameFragment on Game {
    id
    club {
      id
      clubname
      emblem
    }
  }
`;

export const FEED_MATCH = gql`
  fragment FeedMatch on Match {
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
  }
  ${GAME_FRAGMENT}
`;

export const COMMENT_FRAGMENT = gql`
  fragment CommentFragment on Comment {
    id
    user {
      username
      avatar
    }
    payload
    isMine
    createdAt
  }
`;

export const USER_FRAGMENT = gql`
  fragment UserFragment on User {
    id
    username
    avatar
    isMe
    isFollowing
  }
`;

export const PHOTO_FRAGMENT = gql`
  fragment PhotoFragment on Photo {
    id
    file
    likes
    commentNumber
    isLiked
  }
`;

export const FEED_PHOTO = gql`
  fragment FeedPhoto on Photo {
    ...PhotoFragment
    user {
      id
      username
      avatar
    }
    caption
    createdAt
    isMine
  }
  ${PHOTO_FRAGMENT}
`;

export const ROOM_FRAGMENT = gql`
  fragment RoomParts on Room {
    id
    unreadTotal
    users {
      avatar
      username
    }
  }
`;

