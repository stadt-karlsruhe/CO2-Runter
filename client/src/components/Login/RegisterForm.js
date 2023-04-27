import * as React from "react";
import { TextField, Button, Stack, Alert } from "@mui/material";

const RegisterForm = () => {
  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [error, setError] = React.useState(null);
  const isPasswordValid = !password || password.length >= 4;
  const isConfirmedPasswordValid =
    !confirmPassword || confirmPassword.length >= 4;
  // Überprüfen, ob die E-Mail-Adresse gültig ist
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  const isEmailValid = !email || emailRegex.test(email);
  const isFormFilled =
    username &&
    isEmailValid &&
    isPasswordValid &&
    isConfirmedPasswordValid &&
    password &&
    confirmPassword &&
    email;

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      setError("Die Passwörter stimmen nicht überein");
    } else {
      try {
        const response = await fetch("/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, usermail: email, password }),
        });
        if (response.ok) {
          const data = await response.json();
          localStorage.setItem("token", data.token);
        } else if (response.status === 400) {
          setError("Fehlender Benutzername, E-Mail oder Passwort");
        } else if (response.status === 422) {
          setError("Ungültige Eingabe");
        } else if (response.status === 409) {
          setError("Die E-Mail oder der Benutzername ist bereits vergeben");
        } else {
          setError("Registrierung fehlgeschlagen");
        }
      } catch (error) {
        setError("Ein Serverfehler ist aufgetreten");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={2}>
        {error && <Alert severity="error">{error}</Alert>}
        <TextField
          label="Benutzername"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
        <TextField
          label="Email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          error={!isEmailValid}
          helperText={!isEmailValid && "Ungültige E-Mail-Adresse"}
        />
        <TextField
          label="Passwort"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          error={!isPasswordValid}
          helperText={
            !isPasswordValid &&
            "Das Passwort muss mindestens 4 Zeichen lang sein"
          }
        />
        <TextField
          label="Passwort bestätigen"
          type="password"
          value={confirmPassword}
          onChange={(event) => setConfirmPassword(event.target.value)}
          error={!isConfirmedPasswordValid}
          helperText={
            !isConfirmedPasswordValid &&
            "Das Passwort muss mindestens 4 Zeichen lang sein"
          }
        />
        <Button variant="contained" type="submit" disabled={!isFormFilled}>
          Registrieren
        </Button>
      </Stack>
    </form>
  );
};

export default RegisterForm;
