import { gql, useQuery } from "@apollo/client";
import Photo from "../components/feed/Photo";
import PageTitle from "../components/PageTitle";

const FEED_QUERY = gql`
  query seeFeed($offset: Int!) {
    seeFeed(offset: $offset) {
      id
      user {
        username
        avatar
      }
      file
      caption
      likes
      createdAt
      isMine
      isLiked
    }
  }
`;

function Outcluber() {
  const { data } = useQuery(FEED_QUERY, {
    variables: {
      offset: 0,
    },
  });
  return (
    <div>
      <PageTitle title="Outcluber | Clubleague" />
      {data?.seeFeed?.map((photo) => (
        <Photo key={photo.id} {...photo} />
      ))}
    </div>
  );
}
export default Outcluber;
