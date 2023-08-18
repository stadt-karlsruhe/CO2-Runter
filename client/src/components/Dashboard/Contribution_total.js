import { Card, CardContent, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';

export default function Contribution_Total() {
    // call a api to get the number of co2Footprint
    const [co2Footprint, setCo2Footprint] = useState(0);
    useEffect(() => {
        const fetchCo2Footprint = async () => {
            const response = await fetch("/api/foodprint/total");
            const data = await response.json();
            setCo2Footprint(data[0].total);
        };
        fetchCo2Footprint();
    }, []);
    
    
  return (
    <div style={{ margin: "20px"}}>
    <Card style={{ width: "90%", marginBottom: "10px", padding: "25px", backgroundColor: "#f7f9f5" }}>
      <CardContent>
        <Typography variant="h2" align="center"  style={{color: '#5470c6'}}>
          {co2Footprint}
        </Typography>
        <Typography variant="subtitle1" align="center">
          Abgegebene CO2-Fussabdrücke
        </Typography>
      </CardContent>
    </Card>
    </div>
  );
}
