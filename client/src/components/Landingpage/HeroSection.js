import React from "react";
import { Typography } from "@mui/material";
import "../../css/components/Landingpage/heroSection.css";

const HeroSection = () => {
  return (
    <div className="hero">
      <div className="container">
        <Typography variant="h1">CO2 Runter</Typography>
        <Typography variant="h5">
          Wie viel CO2 kann ich durch einen veränderten Lebensstil einsparen und
          wie viel macht es in meinem Stadtteil aus, wenn ich noch andere in
          meinem Umfeld davon überzeuge?
        </Typography>
      </div>
    </div>
  );
};

export default HeroSection;