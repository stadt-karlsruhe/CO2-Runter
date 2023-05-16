import React from "react";
import { Typography } from "@mui/material";

const HeroSection = () => {
  return (
    <div className="hero">
      <Typography variant="h1" fontWeight="boldl">CO2 Runter</Typography>
      <Typography variant="h5">
        Wie viel CO2 kann ich durch einen veränderten Lebensstil einsparen und
        wie viel macht es in meinem Stadtteil aus, wenn ich noch andere in
        meinem Umfeld davon überzeuge?
      </Typography>
    </div>
  );
};

export default HeroSection;
