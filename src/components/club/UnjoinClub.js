import { gql, useMutation } from "@apollo/client";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import ActionButton from "../shared/ActionButton";

const UNJOIN_CLUB = gql`
  mutation unjoinClub($id:Int!) {
    unjoinClub(id:$id) {
      error
      id
      ok
    }
  }
`;

const BottonWrep = styled.div`
  display: flex;  
  align-items: center;
  justify-content: center;
`;

function UnjoinClub({ id, club }) {
  const navigate = useNavigate();
  const unjoinClubUpdate = (cache, result) => {
    const {
      data: {
        unjoinClub: { ok, id }
      },
    } = result;
    if (ok) {
      const memberId = `Member:${id}`;
      cache.evict({ id: `Club:${club?.id}` });
      const deleteClub = {
        __typename: "Club",
        id: club?.id,        
      };
      const deleteCacheClub = cache.writeFragment({
        data: deleteClub,
        fragment: gql`
          fragment UnjoinClub on Club {
            id
          }
        `,
      });
      cache.modify({
        id: memberId,
        field: {
          club(prev) {
            return [...prev, deleteCacheClub];
          },
        },
      });
      navigate(`/`);
    }
  };
  const [unjoinClub, { loading }] = useMutation(UNJOIN_CLUB, {
    variables: {
      id,
    },
    update: unjoinClubUpdate,
  });
  return (
    <div>
      <span>이 클럽에서 정말 탈퇴합니까?</span>
      <BottonWrep>
        <ActionButton
          onClick={unjoinClub}
          buttonColor={{ main: (props) => props.theme.primary }}
          textColor={{ main: (props) => props.theme.white }}
          text={loading ? "Loading..." : "Yes"}
        />
      </BottonWrep>
    </div>
  )
}

UnjoinClub.propTypes = {
  id: PropTypes.number,
  club: PropTypes.shape({
    id: PropTypes.number,
  }),
};

export default UnjoinClub;