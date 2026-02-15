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
    $username: String
    $email: String
    $password: String
  ) {
    editProfile(
      username: $username
      email: $email
      password: $password
    ) {
      error
      ok
    }
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
const NameTag = styled(MainText)`
  font-size: 17px;
  margin-top: 20px;
`;
const ExpanatinText = styled(SubText)`
  font-size: 13px;
  margin-top: 5px;
`;
const ButtonWrep = styled.div`
  width: 120px;
`;

function EditAccount() {
  const { data } = useUser();
  const { register, handleSubmit, setValue, formState: { errors, isValid }, setError, getValues, watch } = useForm({
    defaultValues: {
      username: data?.me?.username,
      email: data?.me?.email,
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
  const onSubmitValid = ({ username, email, password }) => {
    if (!loading) {
      editProfileMutation({
        variables: {
          username,
          email,
          password,
        },
      });
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmitValid)}>
      <Container>
        
        <Title>Account</Title>

        <NameTag>Username</NameTag>
        <Input
          {...register("username")}
          type="text"
          placeholder="change your username"
        />
        <ExpanatinText>Changing your username can have unintended side effects.</ExpanatinText>

        <NameTag>Email</NameTag>
        <Input
          {...register("email")}
          type="text"
          placeholder="Email address"
        />
        <ExpanatinText>You can appear the area in which you are active.</ExpanatinText>

        <NameTag>Password</NameTag>
        <Input
          {...register("password")}
          type="password"
          placeholder="password"
        />
        <ExpanatinText>You can appear the area in which you are active.</ExpanatinText>

        <ButtonWrep>
          <Button
            type="submit"
            value={loading ? "Loading..." : "Update"}
            disabled={!isValid || loading}
          />
        </ButtonWrep>
        
      </Container>
    </form>
  );
}
export default EditAccount;