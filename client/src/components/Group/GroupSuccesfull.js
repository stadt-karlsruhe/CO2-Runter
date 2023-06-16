import React from "react";
import { Box, Button, Typography, Stack } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import QRCodeGenerator from "./QRCodeGenerator";

const GroupSuccesfull = (props) => {
  const rootUrl = window.location.origin;
  const joinLink = `${rootUrl}/CO2Rechner?groupcode=${props.groupCode}`;
  const dashLink = `${rootUrl}/Dashboard?groupcode=${props.groupCode}`;

  const copyToClipboard = (text) => {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard
        .writeText(text)
        .then(() => {
          console.log("Text copied to clipboard:", text);
        })
        .catch((error) => {
          console.error("Failed to copy text to clipboard:", error);
        });
    } else {
      // Fallback option for unsupported browsers or environments
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.style.position = "fixed";
      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();
      try {
        const successful = document.execCommand("copy");
        if (successful) {
          console.log("Text copied to clipboard:", text);
        } else {
          console.error("Failed to copy text to clipboard.");
        }
      } catch (error) {
        console.error("Failed to copy text to clipboard:", error);
      } finally {
        document.body.removeChild(textarea);
      }
    }
  };
  

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
      <Button endIcon={<ContentCopyIcon />} onClick={() => copyToClipboard(joinLink)}>
        {joinLink}
      </Button>
      <Typography>Dashboardlink:</Typography>
      <Button endIcon={<ContentCopyIcon />} onClick={() => copyToClipboard(dashLink)}>
        {dashLink}
      </Button>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Typography>Gruppen Code:</Typography>
        <Button endIcon={<ContentCopyIcon />} onClick={() => copyToClipboard(props.groupCode)}>
          {props.groupCode}
        </Button>
      </Box>
      <QRCodeGenerator text={joinLink} />
      </div>
    </Stack>
  );
};

export default GroupSuccesfull;
