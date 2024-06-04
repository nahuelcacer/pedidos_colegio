import { Button, TextField } from "@mui/material";
import { styled } from "@mui/system";
import React from "react";
import loginFetch from "../service/loginUser";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate()
  const loginUser = async (e) => {
    try {

      const response = await loginFetch(e.target.username.value, e.target.password.value);
      const data = response.token
      localStorage.setItem('authTokens', JSON.stringify(data));
      navigate('/')
    }
    catch (error) {
      console.error('Error durante el login:', error);
      // Maneja el error de la solicitud (por ejemplo, problemas de red)
    }
  }
  return (
    <Container>
      <Form onSubmit={loginUser}>
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
