import { gql, useMutation } from "@apollo/client";
import PropTypes from "prop-types";
import { faEllipsis,faX, faComment, faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CardContainer, CardBottom, MainText, SubText } from "../shared";
import useUser from "../../hooks/useUser";
import styled from "styled-components";
import ProfileRow from "../profile/ProfileRow";
import useEntryModal from '../../hooks/useEntryModal';

const DELETE_COMMENT_MUTATION = gql`
  mutation deleteComment($id: Int!) {
    deleteComment(id: $id) {
      ok
    }
  }
`;

const Container = styled(CardContainer)`
  padding: 0px 15px 15px;
  margin-bottom: 5px;
`;

const Top = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;
const Action = styled.button`
  display: flex;
  height: 30px;
  width: 30px;
  border-radius: 50%;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  border: 1px solid transparent;
  color: ${(props) => props.theme.text};
  cursor: pointer;
  &:hover,
  &:focus {
    background-color: ${(props) => props.theme.hover};
  }
`;
const CommentWrep = styled.div`
  display: flex;
  flex-direction: row;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  &:hover,
  &:focus {
    background-color: ${(props) => props.theme.hover};
  }
`;
const CommentCaption = styled.span`
  font-size: 15px;
`;

function CommentItem({ id, matchId, user, payload, isMine }) {
  const { data } = useUser();
  const { EntryModal: CommentModal, entryOpen: commentOpen } = useEntryModal();
  const updateDeleteComment = (cache, result) => {
    const {
      data: {
        deleteComment: { ok },
      },
    } = result;
    if (ok) {
      cache.evict({ id: `Comment:${id}` });
      cache.modify({
        id: `Match:${matchId}`,
        fields: {
          commentNumber(prev) {
            return prev - 1;
          },
        },
      });
    }
  };
  const [deleteCommentMutation] = useMutation(DELETE_COMMENT_MUTATION, {
    variables: {
      id,
    },
    update: updateDeleteComment,
  });
  const onDeleteClick = () => {
    deleteCommentMutation();
  };
  return (
    <Container key={id}>
      <Top>
        <ProfileRow
          profileLink={
            data?.me?.username !== user.username ? 
              (`/users/${user.username}`) : (`/${data?.me?.username}`)
          }
          avatar={user.avatar}
          username={user.username}
        />
        
        {isMine ? (
          <Action onClick={commentOpen}>
            <FontAwesomeIcon 
              icon={faEllipsis} 
              fontSize="18px"
            />
          </Action> 
        ) : null}
        
        {/* Comment Modal */}
        <CommentModal>
          <CommentWrep onClick={onDeleteClick}>
            <FontAwesomeIcon 
              icon={faX} 
              fontSize="18px"
            />
            <span>삭제</span>
          </CommentWrep>
          <CommentWrep onClick={null}>
            <FontAwesomeIcon 
              icon={faComment} 
              fontSize="18px"
            />
            <span>코멘트</span>
          </CommentWrep>
          <CommentWrep onClick={null}>
            <FontAwesomeIcon 
              icon={faHeart} 
              fontSize="18px"
            />
            <span>하트</span>
          </CommentWrep>
        </CommentModal>
      </Top>
      <CommentCaption>{payload}</CommentCaption>
    </Container>
  );
}

CommentItem.propTypes = {
  id: PropTypes.number,
  user: PropTypes.shape({
    id: PropTypes.number,
    avatar: PropTypes.string,
    username: PropTypes.string.isRequired,
  }),
  commentNumber: PropTypes.number,
};

export default CommentItem;