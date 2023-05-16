import React, { useState, useEffect } from "react";
import axios from "axios";
import { Autocomplete, TextField, Typography } from "@mui/material";

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
    console.log(value)
    props.setSelectedDistricts(value);
  };

  return (
    <>
      <Typography variant="body1">Wählen Sie ihren Stadteil, in dem sie Ansässig sind.</Typography>
      <Autocomplete
        options={districts}
        getOptionLabel={(option) => option.name}
        onChange={handleAutocompleteChange}
        renderInput={(params) => (
          <TextField {...params} label="Stadtteil auswählen" />
        )}
      />
    </>
  );
};

export default CityDistrictChoice;
