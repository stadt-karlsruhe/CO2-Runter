import React, { useState } from "react";
import axios from "axios";
import { Tab, Tabs, Typography, Button } from "@mui/material";
import CityDistrictChoice from "./CityDistrictChoice";
import GroupChoice from "./GroupChoice";
import Login from "./Login";
import { useNavigate } from "react-router-dom";

const ChoiceScreen = ({ co2ValuesPerCategory, categories, totalCo2 }) => {
  const [tabValue, setTabValue] = useState(0);
  const [selectedDistricts, setSelectedDistricts] = useState("");
  const [selectedGroups, setSelectedGroups] = useState([]);
  const [sentData, setSentData] = useState(false);
  const navigate = useNavigate();
  const isLoggedIn = false;

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
        districts: { selectedDistricts },
        groups: {selectedGroups},
        data: {co2ValuesPerCategory},
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
    <div style={{ display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center" }}>
      <Typography variant="body1" style={{ marginBottom: "10px", marginTop: "15px" }}>
        Herzlichen Glückwunsch! Sie haben das Ende erreicht.
      </Typography>
      <Typography variant="h4" style={{ marginBottom: "10px" }}>
        {truncate(totalCo2, 2)} t CO2
      </Typography>
      <Typography variant="body1" style={{ marginBottom: "10px" }}>
        Hier ist die Summe Ihrer CO2-Werte pro Kategorie.
      </Typography>
      <Tabs value={tabValue} onChange={handleTabChange} style={{ display: "flex", justifyContent: "center", marginBottom: "10px" }}>
        <Tab label="Stadtteile" />
        <Tab label="Gruppen" />
      </Tabs>
      {tabValue === 0 && <CityDistrictChoice setSelectedDistricts={setSelectedDistricts} />}
      {tabValue === 1 && (isLoggedIn ? <GroupChoice setSelectedGroups={setSelectedGroups}/> : <Login />)}
      <Button onClick={handleSubmitData} variant="contained" style={{ display: "block", marginBottom: "10px", marginTop: "10px" }}>
        Daten abschicken
      </Button>
      <Button onClick={handleContinue} variant="outlined" style={{ display: "block", marginBottom: "10px" }}>
        Weiter ohne Daten zu senden
      </Button>
    </div>
  );
};

export default ChoiceScreen;