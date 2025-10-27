import { gql, useMutation } from "@apollo/client";
import React, { useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import PageTitle from "../../components/PageTitle";
import FormError from "../../components/auth/FormError";
import Input from "../../components/auth/Input";
import Button from "../../components/auth/Button";

const CREATE_CLUB = gql`
  mutation createClub(
    $clubname: String!
    $clubArea: String
    $clubBio: String
    $emblem: Upload
  ) {
    createClub(
      clubname: $clubname
      clubArea: $clubArea
      clubBio: $clubBio
      emblem: $emblem
    ) {
      ok
      error
    }
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Emblem = styled.div`
  justify-content: center;
  align-items: center;
  width: 130px;
  height: 130px;
  border-radius: 50%;
  background-color: green;
`;
const EmblemImg = styled.img`
  width: 130px;
  height: 130px;
  border-radius: 50%;
`;
const TextInput = styled.input`
	padding: 10px;
	background-color: red;
	text-align: center;
	font-size: 20px;
`;
const ExplanationText = styled.span`
   padding: 40px 70px;
   font-size: 15px;
   text-align: center;
`;
const Notification = styled.div`
  color: #2ecc71;
`;

function NewClub() {
  const navigate = useNavigate();
  const location = useLocation();
  const { register, handleSubmit, setValue, formState: { errors, isValid }, setError, getValues, watch } = useForm({
    mode: "onChange",
    defaultValues: {
      clubname: location?.state?.clubname || "",
    },
  });


  const onCompleted = (data) => {
    const {
      createClub: { ok, error },
    } = data;
    const { clubname, clubArea } = getValues();
    if (!ok) {
      return setError("result", {
        message: error,
      });
    }
    if (ok) {
      navigate(`/`, {
        clubname,
        clubArea,
      });
    }
  };
  const [createClubMutation, { loading }] = useMutation(CREATE_CLUB, {
    onCompleted,
  });
  const onSubmitValid = ({ clubname, clubArea }) => {
    
    if (loading) {
      return;
    }
    createClubMutation({
      variables: {
        clubname,
        clubArea,
      },
    });
  };
  return (
    <Container>
      <PageTitle title="Create Club" />
      
      <Emblem><EmblemImg /></Emblem>
      <Notification>{location?.state?.message}</Notification>
      <form onSubmit={handleSubmit(onSubmitValid)}>
        <Input
          {...register("clubname", {
            required: "Clubname is required",
            minLength: {
              value: 5,
              message: "Clubname should be longer than 5 characters."
            },
          })}
          type="text"
          placeholder="Input Club Name"
          hasError={Boolean(errors.clubname?.message)}
        />
        <FormError message={errors.clubname?.message} />
        <Input
          {...register("clubArea")}
          type="text"
          placeholder="Input Club Area"
        />

        <Button
          type="submit"
          value={loading ? "Loading..." : "Sign up"}
          disabled={!isValid || loading}
          
        />

        <button
          type="button"
          onClick={() => {
            const inputs = [
              {
                type: "manual",
                name: "clubname",
                message: "This clubname is already taken.",
              },
            ]

            inputs.forEach(({ name, type, message }) => {
              setError(name, { type, message })
            })
          }}
        >
          Trigger Name Errors
        </button>

      </form>

        <ExplanationText>You can change club name and picture after you create it.</ExplanationText>
    </Container>
  );
}
export default NewClub;