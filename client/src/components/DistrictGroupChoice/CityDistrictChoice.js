import React, { useState, useEffect } from "react";
import axios from "axios";
import { Autocomplete, TextField, Typography, Card } from "@mui/material";

const CityDistrictChoice = (props) => {
  const [districts, setDistricts] = useState([]);

  useEffect(() => {
    const fetchDistricts = async () => {
      try {
        const response = await axios.get("/api/districts");
        if (response.status === 200) {
          setDistricts(response.data);
        }
        
      } catch (error) {
        console.error(error);
      }
    };
    fetchDistricts();
  }, []);

  const handleAutocompleteChange = (event, value) => {
    props.setSelectedDistricts(value);
    //props.setSelectedDistricts(districts[value].district_ID);
  };

  return (
    <Card style={{ width: "90%", marginBottom: "10px", padding: "25px", backgroundColor: "#f7f9f5" }}>
      <Typography variant="body1" style={{ marginBottom: "10px" }}>
        Wählen Sie ihren Stadtteil, in dem sie ansässig sind.
      </Typography>
      <Autocomplete
        options={districts}
        getOptionLabel={(option) => option.name}
        onChange={handleAutocompleteChange}
        renderInput={(params) => (
          <TextField {...params} label="Stadtteil auswählen" />
        )}
      />
    </Card>
  );
};

export default CityDistrictChoice;
