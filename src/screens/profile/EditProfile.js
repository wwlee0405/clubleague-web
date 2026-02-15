import { gql, useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import useUser, { ME_QUERY } from "../../hooks/useUser";
import styled from "styled-components";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { MainText, SubText } from "../../components/shared";
import Input from "../../components/auth/Input";
import Button from "../../components/auth/Button";

const EDIT_PROFILE = gql`
  mutation editProfile(
    $fullName: String
    $username: String
    $email: String
    $password: String
    $bio: String
  ) {
    editProfile(
      fullName: $fullName
      username: $username
      email: $email
      password: $password
      bio: $bio
    ) {
      error
      ok
    }
  }
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  width: 1200px;
  max-width: 1200px;
  
  // 데스크톱 (768px 이상) 스타일
  @media (min-width: 768px) {
    flex-direction: row;
    background-color: red;
    font-size: 18px;
  }

  // 모바일 (767px 이하) 스타일
  @media (max-width: 767px) {
    background-color: pink;
    padding: 10px;
    font-size: 14px;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 30px 40px;
`;
const Title = styled(MainText)`
  font-size: 28px;
  font-weight: 600;
  margin-bottom: 20px;
`;
const Row = styled.div`
  // 모바일 (767px 이하) 스타일
  display: flex;
  flex-direction: column;

  // 데스크톱 (768px 이상) 스타일
  @media (min-width: 768px) {
    flex-direction: row-reverse;
  }
`;
const AvatarWrep = styled.div`
  // 모바일 (767px 이하) 스타일

  // 데스크톱 (768px 이상) 스타일
  @media (min-width: 768px) {
    margin-top: 30px;
    padding-left: 50px; 
  }
`;
const Avatar = styled.div`
  height: 200px;
  width: 200px;
  border-radius: 50%;
  overflow: hidden;
`;
const Img = styled.img`
  max-width: 100%;
`;
const UserFont = styled.div`
  display : flex;
  align-items: center;
  justify-content: center;
  border: 1px solid ${(props) => props.theme.symbolColor};
  height: 200px;
  width: 200px;
  border-radius: 50%;
`;
const NameTag = styled(MainText)`
  font-size: 17px;
  margin-top: 20px;
`;
const ExpanatinText = styled(SubText)`
  font-size: 13px;
  margin-top: 5px;
`;
const ProfileWrep = styled.div`
  display: flex;
  flex-direction: column;
`;
const ButtonWrep = styled.div`
  width: 120px;
`;

function EditProfile() {
  const { data } = useUser();
  const { register, handleSubmit, setValue, formState: { errors, isValid }, setError, getValues, watch } = useForm({
    defaultValues: {
      fullName: data?.me?.fullName,
      email: data?.me?.email,
      bio: data?.me?.bio,
    }
  });
  const onCompleted = (cache, result) => {
    const {
      data: {
        editProfile: { ok, error },
      },
    } = result;
    if (ok) {

    }
  };

  const [editProfileMutation, { loading }] = useMutation(
    EDIT_PROFILE, {
      refetchQueries: [ME_QUERY],
      update: onCompleted,
    },
  );
  const onSubmitValid = ({ fullName, email, bio }) => {
    if (!loading) {
      editProfileMutation({
        variables: {
          fullName,
          email,
          bio,
        },
      });
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmitValid)}>
      <Container>
        
        <Title>Profile</Title>

        <Row>
          <AvatarWrep>
            <Avatar>{data?.me?.avatar ? <Img src={data?.me?.avatar} /> : <UserFont><FontAwesomeIcon icon={faUser} size="6x" style={{ color: "#2e8b57" }} /></UserFont>}</Avatar>
          </AvatarWrep>

          <ProfileWrep>
            <NameTag>Name</NameTag>
            <Input
              {...register("fullName")}
              type="text"
              placeholder="Input your name"
            />
            <ExpanatinText>Your name may appear around GitHub where you contribute or are mentioned. You can remove it at any time.</ExpanatinText>

            <NameTag>Area</NameTag>
            <Input
              {...register("area")}
              type="text"
              placeholder="Input your area"
            />
            <ExpanatinText>You can appear the area in which you are active.</ExpanatinText>
            
            <NameTag>Bio</NameTag>
            <Input
              {...register("bio")}
              type="text"
              placeholder="Tell us a little bit about yourself"
            />
            <ExpanatinText>You can mention other users and organizations to link to them.</ExpanatinText>

            <ButtonWrep>
              <Button
                type="submit"
                value={loading ? "Loading..." : "Update Profile"}
                disabled={!isValid || loading}
              />
            </ButtonWrep>
          </ProfileWrep>
        </Row>
      </Container>
    </form>
  );
}
export default EditProfile;