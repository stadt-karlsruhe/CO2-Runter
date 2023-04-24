import React from "react";
import {
  Typography,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import { ExpandMore } from "@mui/icons-material";
import Header from "../Header/Header";
import HeroSection from "./HeroSection";
import Footer from "../Footer/Footer";
import { useNavigate } from "react-router-dom";

const Landingpage = () => {
  const navigate = useNavigate();

  const handleCO2 = () => {
    navigate("/CO2Rechner");
  };

  const handleDashboard = () => {
    navigate("/Dashboard");
  };

  const handleNewGroup = () => {
    navigate("/NewGroup/loggedOut");
  };

  return (
    <div className="App">
      <Header />
      <HeroSection />
      <div className="accordion">
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMore />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography variant="h6">
              Wie funktioniert der CO2 Rechner?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>Der CO2 Rechner funktioniert wie folgt: ...</Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMore />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography variant="h6">
              Wo kann ich die Ergebnisse vom CO2 Rechner sehen?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Nachdem du den CO2 Rechner benutzt hast, kannst du die Ergebnisse
              in deinem Dashboard sehen.
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMore />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography variant="h6">
              Wie funktioniert das Gruppensystem?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Hier kommt noch Text wie unser Gruppenssystem funktioniert.
            </Typography>
            <Button variant="contained" color="secondary" onClick={handleNewGroup}>Neue Gruppe erstellen</Button>
          </AccordionDetails>
        </Accordion>
      </div>
      <div className="buttons">
        <Button variant="contained" color="primary" onClick={handleCO2}>
          CO2 Rechner starten
        </Button>
        <Button variant="contained" color="secondary" onClick={handleDashboard}>
          Zum Dashboard
        </Button>
      </div>
      <Footer />
    </div>
  );
};

export default Landingpage;
