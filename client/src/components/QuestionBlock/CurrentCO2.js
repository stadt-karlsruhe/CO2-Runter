import React from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  IconButton,
  useMediaQuery,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import { useNavigate } from "react-router-dom";


const CurrentCO2 = ({ co2Value }) => {
  const navigate = useNavigate();
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  console.log("DBG - current co2:",co2Value)
  const handleInformation = () => {
    navigate("/information");
  };

  const truncate = (num, decimalPlaces) => {
    console.log("DBG - truncate co2:",num)
    const factor = Math.pow(10, decimalPlaces);
    return Math.floor(num * factor) / factor;
  };

  const variant = "h6";

  return (
    <Card
      sx={{
        display: "block",
        margin: "0 auto",
        width: "80%",
        maxWidth: "100%",
        border: "1px solid rgba(0, 0, 0, 0.1)",
        borderRadius: "8px",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
      }}
    >
      <CardContent>
        <Box display="flex" justifyContent="center" alignItems="center">
          <Typography variant={variant} component="h6" >
            Ihr aktueller CO2 Fußabdruck beträgt: {truncate(co2Value, 2)}t
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default CurrentCO2;
