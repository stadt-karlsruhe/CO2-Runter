import React from "react";
import { Box, Button, Typography, Stack } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import QRCodeGenerator from "./QRCodeGenerator";

const GroupSuccesfull = (props) => {
  const rootUrl = window.location.origin;
  const joinLink = `${rootUrl}/CO2Rechner?groupcode=${props.groupCode}`;
  const dashLink = `${rootUrl}/Dashboard?groupcode=${props.groupCode}`;

  return (
    <Stack spacing={2}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
      <Typography variant="h4">Ihre neue Gruppe</Typography>
      <Typography variant="h3">{props.groupName}</Typography>
      <Typography variant="h4">wurde erstellt</Typography>
      <Typography>
        Teilen Sie den Beitrittslink oder QR-Code mit ihren Freunden und fangen
        Sie an gemeinsam ihren CO2-Fußabdruck zu berechnen.
      </Typography>
      <Typography>Beitrittslink:</Typography>
      <Button endIcon={<ContentCopyIcon />}>{joinLink}</Button>
      <Typography>Dashboardlink:</Typography>
      <Button endIcon={<ContentCopyIcon />}>{dashLink}</Button>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Typography>Gruppen Code:</Typography>
        <Button endIcon={<ContentCopyIcon />}>{props.groupCode}</Button>
      </Box>
      <QRCodeGenerator text={joinLink} />
      </div>
    </Stack>
  );
};

export default GroupSuccesfull;
