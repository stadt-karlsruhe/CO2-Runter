import React from "react";
import { Box, Card, CardContent, Typography, IconButton } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import { useNavigate } from "react-router-dom";

const CurrentCO2 = ({ co2Value }) => {
  const navigate = useNavigate();

  const handleInforamtion = () => {
    navigate("/information");
  };

  const truncate = (num, decimalPlaces) => {
    const factor = Math.pow(10, decimalPlaces);
    return Math.floor(num * factor) / factor;
  };

  return (
    <Card sx={{
        display: "block",
        margin: "0 auto",
        width: "fit-content",
        maxWidth: "100%",
        bgcolor: "darkgrey"
      }}>
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6" component="div">
            Ihr aktueller CO2 Fußabdruck beträgt: {truncate(co2Value, 2)}t
          </Typography>
          <IconButton onClick={handleInforamtion}>
            <InfoIcon />
          </IconButton>
        </Box>
      </CardContent>
    </Card>
  );
};

export default CurrentCO2;
