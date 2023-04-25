import React from "react";
import { Tab, Tabs, Typography } from "@mui/material";
import CityDistrictChoice from "./CityDistrictChoice";
import GroupChoice from "./GroupChoice";
import Login from "./Login";

const FinishScreen = ({ co2ValuesPerCategory }) => {
  const [tabValue, setTabValue] = React.useState(0);
  const baseCO2 = 2;
  const isLoggedIn = false; // Hier können Sie den Anmeldestatus des Benutzers überprüfen

  const co2Sum = co2ValuesPerCategory.reduce(
    (sum, category) => sum + category.reduce((a, b) => a + b, 0),
    0
  );

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };
  return (
    <>
      <Typography variant="body1">
        Juhu Du hast es geschafft! Dein Aktueller Fußabdruck beträgt:
      </Typography>
      <Typography variant="h4">{co2Sum+baseCO2}</Typography>
      <Typography variant="body1">
      Teile dein Ergebnis mit uns und siehe wie dein Stadtteil oder deine Gruppe im Vergleich zu anderen abschneidet!
      </Typography>
      <Tabs value={tabValue} onChange={handleTabChange}>
        <Tab label="Stadtteile" />
        <Tab label="Gruppen" />
      </Tabs>
      {tabValue === 0 && <CityDistrictChoice />}
      {tabValue === 1 && (isLoggedIn ? <GroupChoice /> : <Login />)}
    </>
  );
};

export default FinishScreen;
