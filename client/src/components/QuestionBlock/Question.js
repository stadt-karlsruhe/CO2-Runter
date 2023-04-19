import React from "react";
import Selection from "./Selection";
import InputField from "./Inputfield";
import Slider from "./Slider";
import { Box, Container, Typography } from "@mui/material";

const Question = (props) => {
  const { text, typ, replies, values, unit } = props.question;

  let Component;

  switch (typ) {
    case "auswahl":
      Component = Selection;
      break;
    case "input":
      Component = InputField;
      break;
    case "slider":
      Component = Slider;
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
          <Component replies={replies} values={values} unit={unit} />
        )}
      </Box>
    </Container>
  );
};

export default Question;
