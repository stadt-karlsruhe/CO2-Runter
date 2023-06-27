import React from "react";
import Selection from "./Selection";
import InputField from "./Inputfield";
import CostumSlider from "./CostumSlider";
import { Box, Container, Typography } from "@mui/material";

const Question = (props) => {
  const { text, typ, replies, values, unit, maxInput, formula } =
    props.question;
  let Component;
  switch (typ) {
    case "auswahl":
      Component = Selection;
      break;
    case "input":
      Component = InputField;
      break;
    case "slider":
      Component = CostumSlider;
      break;
    default:
      Component = null;
      break;
  }
  return (
    <Container>
      <Box sx={{ my: 2 }}>
        <Box sx={{ mb: 2 }}>
          <Typography variant="h6" component="div">
            {text}
          </Typography>
        </Box>
        {Component && (
          <Component
            value={props.selectedValue}
            replies={replies}
            values={values}
            unit={unit}
            maxInput={maxInput}
            formula={formula}
            onCo2ValuesChange={props.onCo2ValuesChange}
            rememberValue={props.rememberValue}
            detailed={props.detailed}
          />
        )}
      </Box>
    </Container>
  );
};

export default Question;
