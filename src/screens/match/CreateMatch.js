import { gql, useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import FormError from "../../components/auth/FormError";
import Input from "../../components/auth/Input";
import Button from "../../components/auth/Button";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

function CreateMatch() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Container>
      <span>Create Match</span>
    </Container>
  );
}
export default CreateMatch;