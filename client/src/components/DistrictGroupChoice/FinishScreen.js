import React from 'react';
import axios from 'axios';
import { Tab, Tabs, Typography, Button } from '@mui/material';
import CityDistrictChoice from './CityDistrictChoice';
import GroupChoice from './GroupChoice';
import Login from './Login';

const FinishScreen = ({ co2ValuesPerCategory }) => {
  const [tabValue, setTabValue] = React.useState(0);
  const isLoggedIn = false; // Hier können Sie den Anmeldestatus des Benutzers überprüfen

  const co2Sum = co2ValuesPerCategory.reduce(
    (sum, category) => sum + category.reduce((a, b) => a + b, 0),
    0
  );

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleSubmitData = async () => {
    try {
      // Hier müssen Sie die districts-, groups- und answers-Daten angeben
      const response = await axios.post('/footprint', {
        districts: {},
        groups: {},
        answers: {},
      });
      if (response.status === 200) {
        // Erfolgreich gesendet
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Typography variant="body1">
        Herzlichen Glückwunsch! Sie haben das Ende erreicht.
      </Typography>
      <Typography variant="h4">{co2Sum}</Typography>
      <Typography variant="body1">
        Hier ist die Summe Ihrer CO2-Werte pro Kategorie.
      </Typography>
      <Tabs value={tabValue} onChange={handleTabChange}>
        <Tab label="Stadtteile" />
        <Tab label="Gruppen" />
      </Tabs>
      {tabValue === 0 && <CityDistrictChoice />}
      {tabValue === 1 && (isLoggedIn ? <GroupChoice /> : <Login />)}
      <Button onClick={handleSubmitData} variant="contained">Daten abschicken</Button>
      <Button variant="outlined">Weiter ohne Daten zu senden</Button>
    </>
  );
};

export default FinishScreen;