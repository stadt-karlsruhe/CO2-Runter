import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Autocomplete, TextField } from '@mui/material';

const CityDistrictChoice = () => {
  const [districts, setDistricts] = useState([]);

  useEffect(() => {
    const fetchDistricts = async () => {
      try {
        const response = await axios.get('/api/districts');
        if (response.status === 200) {
          setDistricts(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchDistricts();
  }, []);

  return (
    <Autocomplete
      options={districts}
      getOptionLabel={(option) => option.name}
      renderInput={(params) => (
        <TextField {...params} label="Stadtteil auswählen" />
      )}
    />
  );
};

export default CityDistrictChoice;
