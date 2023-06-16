import * as React from "react";
import { TextField, Button, Stack, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

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
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
      event.preventDefault();
      if (password !== confirmPassword) {
        setError('Die Passwörter stimmen nicht überein');
      } else {
        try {
          const response = await axios.post('/api/register', { username, email, password });
          console.log("Registrierung antwort Status: "+response.status);
          if (response.status === 201) {
            localStorage.setItem('CO2Token', response.data.token);  
            console.log("Neuer Token: "+response.data.token);   
            navigate("/");    
          }
        } catch (error) {
          if (error.response) {
            switch (error.response.status) {
              case 400:
                setError('Fehlender Benutzername, E-Mail oder Passwort');
                break;
              case 422:
                setError('Ungültige Eingabe');
                break;
              case 409:
                setError('Die E-Mail oder der Benutzername ist bereits vergeben');
                break;
              default:
                setError('Registrierung fehlgeschlagen');
            }
          } else {
            setError('Ein Serverfehler ist aufgetreten');
          }
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
        <Button variant="contained" type="submit" disabled={!isFormFilled} className="btn">
          Registrieren
        </Button>
      </Stack>
    </form>
  );
};

export default RegisterForm;
