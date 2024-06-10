import { Button, TextField } from "@mui/material";
import { styled } from "@mui/system";
import React from "react";
import { useNavigate } from "react-router-dom";
import { loginFetch } from "../service/user";
const Container = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "100vh",
});

const Form = styled("form")({
  display: "flex",
  flexDirection: "column",
  gap: "16px",
  marginBottom: "16px",
});

const ButtonWrapper = styled("div")({
  alignSelf: "center",
});

const LoginPage = () => {
  const navigate = useNavigate();
  return (
    <Container>
      <Form onSubmit={(e) => loginFetch(e, navigate)}>
        <TextField
          type="text"
          name="username"
          label="Nombre de usuario"
          variant="outlined"
        />
        <TextField
          type="password"
          name="password"
          label="Contraseña"
          variant="outlined"
        />
        <ButtonWrapper>
          <Button type="submit" variant="contained" color="primary">
            Enviar
          </Button>
        </ButtonWrapper>
      </Form>
    </Container>
  );
};

export default LoginPage;
