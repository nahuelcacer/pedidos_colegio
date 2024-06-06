import { Button, TextField } from "@mui/material";
import { styled } from "@mui/system";
import React from "react";
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
  const navigate = useNavigate();

  const loginUser = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://127.0.0.1:8002/api/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: e.target.username.value,
          password: e.target.password.value,
        }),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();
      localStorage.setItem('authTokens', JSON.stringify(data.token));
      navigate('/'); // Redirect to home page after successful login
    } catch (error) {
      console.error('Error during login:', error);
      // Handle the error appropriately (e.g., display an error message to the user)
    }
  };

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
