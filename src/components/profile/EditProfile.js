import { gql, useQuery, useMutation } from "@apollo/client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useLocation } from "react-router-dom";
import useUser, { ME_QUERY } from "../../hooks/useUser";
import styled from "styled-components";
import Avatar from "../shared/Avatar";
import { MainText, SubText } from "../shared";
import ActionButton from "../shared/ActionButton";
import Input from "../auth/Input";
import Button from "../auth/Button";

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

const Wrapper = styled.div`
  padding: 5px 15px;
  display: flex;
  flex-direction: column;
`;
const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
const Username = styled(MainText)`
  padding-left: 10px;
  padding-right: 10px;
  font-weight: 600;
`;
const Title = styled(SubText)`
  margin: 5px 15px;
  font-size: 12px;
`;
const BottonWrep = styled.div`
  display: flex;  
  align-items: center;
  justify-content: center;
`;

function EditProfile({ onClose }) {
  const navigate = useNavigate();
  const { data: userData } = useUser();
  const { register, handleSubmit, setValue, formState: { errors, isValid }, setError, getValues, watch } = useForm({
    defaultValues: {
      fullName: userData?.me?.fullName,
      email: userData?.me?.email,
    }
  });

  const onCompleted = (cache, result) => {
    const {
      data: {
        editProfile: { ok, error },
      },
    } = result;
    if (ok) {
      
      navigate('/');
    }

  };

  const [editProfileMutation, { loading }] = useMutation(
    EDIT_PROFILE, {
      refetchQueries: [ME_QUERY],
      update: onCompleted,
    },
  );

  const onSubmitValid = ({ fullName, email }) => {
    if (!loading) {
      editProfileMutation({
        variables: {
          fullName,
          email,
        },
      });
    }
  };
    
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmitValid)}>

        <Row>
          <Title>Name</Title>
          <Input
            {...register("fullName")}
            type="text"
            placeholder="Input your name"
          />
        </Row>

        <Row>
          <Title>Area</Title>
          <Username>Barcelona, Spain</Username>
        </Row>

        <Row>
          <Title>Email</Title>
          <Input
            {...register("email")}
            type="text"
            placeholder="Input your Email"
          />
        </Row>

        <BottonWrep>
          <Button
            type="submit"
            value={loading ? "Loading..." : "Edit"}
            disabled={!isValid || loading}
          />
        </BottonWrep>
      </form>
    </div>
  );
}


export default EditProfile;
