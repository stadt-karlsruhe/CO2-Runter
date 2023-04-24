import * as React from "react";
import { TextField, Button, Stack, Alert } from "@mui/material";

const LoginForm = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState(null);
  const isPasswordValid = !password || password.length >= 4;
  // Überprüfen, ob die E-Mail-Adresse gültig ist
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  const isEmailValid = !email || emailRegex.test(email);
  const isFormFilled = isEmailValid && isPasswordValid && password && email;

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ usermail: email, password }),
      });
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("token", data.token);
      } else {
        setError("Anmeldung fehlgeschlagen");
      }
    } catch (error) {
      setError("Ein Serverfehler ist aufgetreten");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={2}>
        {error && <Alert severity="error">{error}</Alert>}
        <TextField
          label="Email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          error={!isEmailValid}
          helperText={!isEmailValid && 'Ungültige E-Mail-Adresse'}
        />
        <TextField
          label="Passwort"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          error={!isPasswordValid}
          helperText={!isPasswordValid && 'Das Passwort muss mindestens 4 Zeichen lang sein'}
        />
        <Button variant="contained" type="submit" disabled={!isFormFilled}>
          Anmelden
        </Button>
      </Stack>
    </form>
  );
};
export default LoginForm;
