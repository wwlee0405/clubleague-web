import { gql, useMutation } from "@apollo/client";
import styled from "styled-components";
import useUser from "../../hooks/useUser";
import { useForm } from "react-hook-form";
import Avatar from "../shared/Avatar";
import { faPaperPlane } from "@fortawesome/free-regular-svg-icons";
import { faPaperPlane as SolidPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { OrbitProgress } from "react-loading-indicators";

const CREATE_COMMENT_MUTATION = gql`
  mutation createComment($matchId: Int!, $payload: String!) {
    createComment(matchId: $matchId, payload: $payload) {
      ok
      error
      id
    }
  }
`;

const Container = styled.div`
  margin: 10px;
`;
const Row = styled.div`
  display: flex;
  flex-direction: row;
`;
const CommentWrep = styled.div`
  margin-left: 15px;
  border-radius: 8px;
  padding: 7px;
  background-color: ${(props) => props.theme.cardHeader};
  border: 1px solid ${(props) => props.theme.border};
`;
const Comment = styled.input`
  width: 100%;
  justify-content: center;
  box-sizing: border-box;
  background-color: transparent;
  &::placeholder {
    font-size: 13px;
    color: ${(props) => props.theme.subText};
  }
  &:focus {
    border-color: rgb(38, 38, 38);
  }
    
  // 모바일 (767px 이하) 스타일
  width: 380px;
  
  // 데스크톱 (768px 이상) 스타일
  @media (min-width: 768px) {
    min-width: 500px;
  }
`;
const CommentBottom = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
`;
const Action = styled.button`
  display: flex;
  height: 40px;
  width: 40px;
  border-radius: 50%;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  border: 1px solid transparent;
  cursor: pointer;
  &:hover,
  &:focus {
    background-color: ${(props) => props.theme.hover};
  }
`;

export default function CommentInput({ matchId }) {
  const { data: userData } = useUser();
  const { register, handleSubmit, setValue, formState: { errors, isValid }, getValues, watch } = useForm();
  const createCommentUpdate = (cache, result) => {
    const { payload } = getValues();
    setValue("payload", "");
    const {
      data: {
        createComment: { ok, id },
      },
    } = result;
    if (ok && userData?.me) {
      const newComment = {
        __typename: "Comment",
        createdAt: Date.now() + "",
        id,
        isMine: true,
        payload,
        user: {
          ...userData.me,
        },
      };
      const newCacheComment = cache.writeFragment({
        data: newComment,
        fragment: gql`
          fragment NewComment on Comment {
            id
            createdAt
            isMine
            payload
            user {
              username
              avatar
            }
          }
        `,
      });
      cache.modify({
        id: `Match:${matchId}`,
        fields: {
          comments(prev) {
            return [...prev, newCacheComment];
          },
          commentNumber(prev) {
            return prev + 1;
          },
        },
      });
    }
  };
  const [createCommentMutation, {loading}] = useMutation(
    CREATE_COMMENT_MUTATION, {
      update: createCommentUpdate,
    },
  );
  const onValid = (data) => {
    const { payload } = data;
    if (loading) {
      return;
    }
    createCommentMutation({
      variables: {
        matchId,
        payload,
      },
    });
  };
  return (
    <Container>
      <Row>
        <Avatar $lg url={require('../../data/eeee.png')} />
        <form onSubmit={handleSubmit(onValid)}>
          <CommentWrep>
            <Comment
              {...register("payload", { required: true })}
              type="text"
              placeholder={"Leave a comment in " + userData?.me?.username + "'s name"}
            />
            <CommentBottom>
              <Action type="submit">
                {loading ? (
                  <OrbitProgress color="white" style={{ fontSize: "5px" }} />
                    ) : (
                  <FontAwesomeIcon
                    style={{ 
                      color: !isValid ? "#999" : "#2e8b57",
                      fontSize: "20px",
                      opacity: !isValid ? "0.2": "1"
                    }}
                    icon={!isValid || loading ? faPaperPlane : SolidPaperPlane}
                  />
                )}
              </Action>
            </CommentBottom>
          </CommentWrep>
        </form>
      </Row>
    </Container>
  );
}