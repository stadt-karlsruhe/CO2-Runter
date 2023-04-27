import React, { useState } from "react";
import axios from "axios";
import { Tab, Tabs, Typography, Button } from "@mui/material";
import CityDistrictChoice from "./CityDistrictChoice";
import GroupChoice from "./GroupChoice";
import Login from "./Login";
import { useNavigate } from "react-router-dom";


const FinishScreen = ({ co2ValuesPerCategory, categories, totalCo2 }) => {
  const [tabValue, setTabValue] = useState(0);
  const [sentData, setSentData] = useState(false);
  const navigate = useNavigate();
  const isLoggedIn = false; // Hier können Sie den Anmeldestatus des Benutzers überprüfen

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const truncate = (num, decimalPlaces) => {
    const factor = Math.pow(10, decimalPlaces);
    return Math.floor(num * factor) / factor;
  };

  const handleSubmitData = async () => {
    try {
      // Hier müssen Sie die districts-, groups- und answers-Daten angeben
      const response = await axios.post("/api/footprint", {
        districts: {},
        groups: {},
        data: {},
      });
      if (response.status === 200) {
        setSentData(true);
        navigate("/CO2Rechner/finish", {
          state: {
            co2ValuesPerCategory: co2ValuesPerCategory,
            categories: categories,
            dataSent: sentData,
          },
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleContinue = () => {
    setSentData(false);
    navigate("/CO2Rechner/finish", {
      state: {
        co2ValuesPerCategory: co2ValuesPerCategory,
        categories: categories,
        dataSent: sentData,
        totalCo2: totalCo2,
      },
    });
  };

  return (
    <>
    {console.log("Kategorien:"+ categories)}
      <Typography variant="body1">
        Herzlichen Glückwunsch! Sie haben das Ende erreicht.
      </Typography>
      <Typography variant="h4">{truncate(totalCo2, 2)} t CO2</Typography>
      <Typography variant="body1">
        Hier ist die Summe Ihrer CO2-Werte pro Kategorie.
      </Typography>
      <Tabs value={tabValue} onChange={handleTabChange}>
        <Tab label="Stadtteile" />
        <Tab label="Gruppen" />
      </Tabs>
      {tabValue === 0 && <CityDistrictChoice />}
      {tabValue === 1 && (isLoggedIn ? <GroupChoice /> : <Login />)}
      <Button onClick={handleSubmitData} variant="contained">
        Daten abschicken
      </Button>
      <Button onClick={handleContinue} variant="outlined">
        Weiter ohne Daten zu senden
      </Button>
    </>
  );
};

export default FinishScreen;
