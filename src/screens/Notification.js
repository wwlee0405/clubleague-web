import React from "react";
import { gql, useQuery } from "@apollo/client";
import Photo from "../components/feed/Photo";
import PageTitle from "../components/PageTitle";

const SEE_NOTI = gql`
  query seeNotification($offset: Int!) {
    seeNotification(offset: $offset) {
      id
      user {
        username
      }
      payload
    }
  }
`;

function Notification() {
  const { data } = useQuery(SEE_NOTI, {
    variables: {
      offset: 0,
    },
  });
  return (
    <div>
      <PageTitle title="Notification | Clubleague" />
      {data?.seeNotification?.map((noti) => (
        <div>{noti.user.username}..@@..{noti.payload}</div>
      ))}
    </div>
  );
}
export default Notification;