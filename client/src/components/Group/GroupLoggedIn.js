import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { Button, TextField, Typography, Stack } from "@mui/material";

const GroupLoggedIn = () => {
  const [groupName, setGroupName] = useState("");
  const [groupCode, setGroupCode] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleCreateGroup = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch("/groups/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token, groupname: groupName }),
      });
      if (response.ok) {
        const data = await response.json();
        setGroupCode(data.groupcode);
      } else {
        const data = await response.json();
        setError(data.error);
      }
    } catch (err) {
      setError("A server error occurred.");
    }
  };

  return (
    <>
      <Header />
      <Stack spacing={2}>
        <Typography variant="h4">Neue Gruppe erstellen</Typography>
        <Typography>
          Geben Sie einen Gruppenname ein. Anschließend wird Ihnen von uns
          einmal der Gruppenbeitrittscode, sowie ein Link und QR-Code
          mitgeteilt.
        </Typography>
        <TextField
          label="Gruppenname"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
        />
        <Button disabled={!groupName} onClick={handleCreateGroup}>
          Gruppe erstellen
        </Button>
        {groupCode && (
          <>
            <Typography>Gruppenbeitrittscode: {groupCode}</Typography>
            {/* Hier können Sie auch den Link und QR-Code anzeigen */}
          </>
        )}
        {error && <Typography color="error">{error}</Typography>}
        <Button onClick={() =>navigate(-1)}>Zurück</Button>
      </Stack>
      <Footer />
    </>
  );
};

export default GroupLoggedIn;
