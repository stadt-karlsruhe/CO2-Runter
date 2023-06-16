import React from "react";
import {
  Typography,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Link,
} from "@mui/material";
import { ExpandMore } from "@mui/icons-material";
import Header from "../Header/Header";
import HeroSection from "./HeroSection";
import Footer from "../Footer/Footer";
import { useNavigate } from "react-router-dom";
import "../../css/components/Landingpage/landingpage.css";
import CheckAuth from "../CheckAuth";

const Landingpage = () => {
  const navigate = useNavigate();
  const isLoggedIn = CheckAuth();
  

  const handleCO2 = () => {
    navigate("/CO2Rechner");
  };

  const handleDashboard = () => {
    navigate("/Dashboard");
  };

  const handleNewGroup = () => {
    if(isLoggedIn){
      navigate("/NewGroup/loggedIn");
    }else{
      navigate("/NewGroup/loggedOut");
    }
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
          <AccordionDetails className="accordionDetail">
            <Typography>
              Laut Energiebilanz Karlsruhe 2019 liegt der CO2 Ausstoß bei 7,8t
              jährlich pro Kopf. Die Effekte durch privaten Konsum sind dabei
              nicht enthalten. Addiert man hier den Grundwert (3,5t) gemäß
              unserer Vereinfachung des UBA-Modells, dann erhält man 11,3t CO2.
              Dies entspricht ungefähr der Grundwert-Summe der CO2APP (11t CO2).
              Diese Grundwert-Summe bildet sich aus 4 "Sektoren", die wir durch
              unseren Lebensstil beinflussen können plus einer festen Zugabe für
              öffentliche Infrastruktur. Wohnen (Heizung und Strom) Mobilität
              Ernährung Allgemeiner Konsum Die verwendeten Daten und
              Berechnungsmodelle sind an den CO2-Rechner des Umweltbundesamts
              angeleht und wollen die Effekte zeigen, die wir durch sparsamen
              oder weniger sparsamen Lebensstil erreichen können. Eine exaktere
              Berechnung ist ohne weitere Informationen über die persönliche
              Situation im Einzelfall nicht möglich. Weitere Informationen zum
              UBA-Modell und den Einsparpotentialen finden sich{" "}
              <Link
                className="text-link"
                href="https://www.umweltbundesamt.de/publikationen/klimaneutral-leben"
                target="_blank"
              >
                hier.
              </Link>
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
              Wo kann ich die Ergebnisse vom CO2 Rechner sehen?
            </Typography>
          </AccordionSummary>
          <AccordionDetails className="accordionDetail">
            <Typography>
              Persönliche Maßnahmen für den Klimaschutz werden umso
              erfolgreicher, wenn wir auch andere Menschen davon überzeugen.
              Geben Sie Ihren Stadtteil an und die Anzahl der Personen, die sie
              dort als Mitstreiter:Innen gewinnen können und nehmen Sie so an
              der Klima-Challenge teil. Die aktuellen Ergebnisse sind auf
              unserem{" "}
              <Link className="text-link" href="/Dashboard" target="_blank">
                CO2-Dashboard
              </Link>{" "}
              sichtbar. Im Kanal "Grüne Stadt" der{" "}
              <Link
                className="text-link"
                href="https://www.karlsruhe.de/stadt-rathaus/so-ist-karlsruhe/digital-smart/karlsruheapp"
                target="_blank"
              >
                Karlsruhe-App
              </Link>{" "}
              wird das Umweltamt das Projekt weiter verfolgen.
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
          <AccordionDetails className="accordionDetail">
            <Typography>
              Hier kommt noch Text wie unser Gruppenssystem funktioniert.
            </Typography>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleNewGroup}
            >
              Neue Gruppe erstellen
            </Button>
          </AccordionDetails>
        </Accordion>
      </div>
      <div className="landingpage-buttons">
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
