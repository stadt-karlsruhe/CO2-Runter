import React, { useState, useEffect } from "react";
import axios from "axios";
import { Tab, Tabs, Typography, Button } from "@mui/material";
import CityDistrictChoice from "./CityDistrictChoice";
import GroupChoice from "./GroupChoice";
import Login from "./Login";
import { useNavigate } from "react-router-dom";


import ComputeTotalCo2 from "../QuestionBlock/Calculation/ComputeTotalCo2"
import { useSelector } from 'react-redux';


const ChoiceScreen = ({ co2ValuesPerCategory, categories }) => {
  const [tabValue, setTabValue] = useState(0);
  const [selectedDistricts, setSelectedDistricts] = useState();
  const [selectedGroups, setSelectedGroups] = useState([]);
  const navigate = useNavigate();
  const CO2Token = localStorage.getItem('CO2Token');


  const storeCats = useSelector(state => state.categories); // Replace 'categories' with your state slice name
  const co2vals = ComputeTotalCo2(storeCats.categories)
  const totalCo2 = co2vals.sum
  

  useEffect(() => {
  
  }, [selectedGroups])

  function updateSelectedGroups(prevSelectedGroups) {
    setSelectedGroups(prevSelectedGroups);
  }
  
  
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const truncate = (num, decimalPlaces) => {
    const factor = Math.pow(10, decimalPlaces);
    return Math.floor(num * factor) / factor;
  };

  const handleSubmitData = async () => {
    try {
      const districtId = selectedDistricts ? selectedDistricts.district_ID : 0;
      const response = await axios.post("/api/footprint", {
        groups: selectedGroups,
        district: districtId,
        data: co2vals.cats,
      });
      if (response.status === 200) {
        navigate("/CO2Rechner/finish", {
          state: {
            co2ValuesPerCategory: storeCats, // co2ValuesPerCategory,
            categories: categories,
            dataSent: true,
          },
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleContinue = () => {

    navigate("/CO2Rechner/finish", {
      state: {
        co2ValuesPerCategory: storeCats, // co2ValuesPerCategory,
        categories: categories,
        dataSent: false,
        totalCo2: totalCo2,
      },
    });
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Typography
        variant="body1"
        style={{ marginBottom: "10px", marginTop: "15px" }}
      >
        Herzlichen Glückwunsch! Sie haben das Ende erreicht.
      </Typography>
      <Typography variant="h4" style={{ marginBottom: "10px" }}>
        {truncate(totalCo2, 2)} t CO2
      </Typography>
      <Typography variant="body1" style={{ marginBottom: "10px" }}>
        Hier ist die Summe Ihrer CO2-Werte pro Kategorie.
      </Typography>
      <Tabs
        value={tabValue}
        onChange={handleTabChange}
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "10px",
        }}
      >
        <Tab label="Stadtteile" />
        <Tab label="Gruppen" />
      </Tabs>
      {tabValue === 0 && (
        <CityDistrictChoice setSelectedDistricts={setSelectedDistricts} />
      )}
      {tabValue === 1 &&
        (CO2Token ? (
          <GroupChoice  updateSelectedGroups={updateSelectedGroups}/>
        ) : (
          <Login updateSelectedGroups={updateSelectedGroups} />
        ))}
      <Button
        onClick={handleSubmitData}
        variant="contained"
        style={{ display: "block", marginBottom: "10px", marginTop: "10px" }}
      >
        Daten abschicken
      </Button>
      <Button
        onClick={handleContinue}
        variant="outlined"
        style={{ display: "block", marginBottom: "10px" }}
      >
        Weiter ohne Daten zu senden
      </Button>
    </div>
  );
};

export default ChoiceScreen;
