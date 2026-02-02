import { gql, useLazyQuery } from "@apollo/client";
import styled from "styled-components";
import { MainText } from "./shared";
import useUser from "../hooks/useUser";
import { useForm } from "react-hook-form";
import Input from "./auth/Input";
import ProfileRow from "./profile/ProfileRow";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SEARCH_CLUBS = gql`
  query searchClubs($keyword: String!) {
    searchClubs(keyword: $keyword) {
      id
      clubname
      clubArea
      emblem
      totalMember
      clubLeader {
        username
      }
      isJoined
    }
  }
`;

const SearchModalContainer = styled.div`
  padding: 5px 10px;
  border-radius: 10px;
  background-color: ${(props) => props.theme.cardContent};
  width: 300px;
`;
const SearchModalHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const SearchModalWrep = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
`;
const SearchModalText = styled(MainText)`
  font-size: 16px;
`;

export default function HeaderSearch({ onClose }) {
  const { setValue, register, watch, handleSubmit } = useForm();
  const [startQueryFn, { loading, data: searchData, called }] = useLazyQuery(SEARCH_CLUBS);
  const { data } = useUser();
  const onValid = ({ keyword }) => {
    startQueryFn({
      variables: {
        keyword,
      },
    });
  };
  return (
    <SearchModalContainer>
      <form onSubmit={handleSubmit(onValid)}>
        <SearchModalHeader>
          <div onClick={onClose}>
            <FontAwesomeIcon icon={faArrowLeft} fontSize="18px" style={{paddingRight:10}} />
          </div>
          <Input
            {...register("keyword", {
              required: "Email is required",
              minLength: 1,
            })}
            type="text"
            placeholder="Search clubs"
          />
        </SearchModalHeader>
      </form>
        {loading ? <SearchModalWrep><SearchModalText>searching...</SearchModalText></SearchModalWrep> : null}
        {!called ? <SearchModalWrep><SearchModalText>Search by keyword</SearchModalText></SearchModalWrep> : null}
        {searchData?.searchClubs !== undefined ? (
          searchData?.searchClubs?.length === 0 ? (
            <SearchModalWrep><SearchModalText>Could not find anything.</SearchModalText></SearchModalWrep>
              ) : (
                searchData?.searchClubs?.map((club) => (     
                  <ProfileRow 
                    key={club?.id}
                    profileLink={`/club/${club?.clubname}`}
                    state={{ clubId: club?.id, userId: data?.me.id }}
                    avatar={club?.emblem} 
                    username={club?.clubname} 
                  />
            ))
          )
        ) : null}
    </SearchModalContainer>
  );
}