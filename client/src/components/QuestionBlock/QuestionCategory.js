import React, { useState } from "react";
import { Box, Container, useMediaQuery } from "@mui/material";
import CalculationSum from "./Calculation/CalculationSum";
import Questions from "./Questions";
import QuestionStepper from "./QuestionStepper";
import BottomStepper from "./BottomStepper";

const QuestionCategory = (props) => {
  const [activeStep, setActiveStep] = useState(0);
  const [isDetailed, setIsDetailed] = useState({});
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const [co2ValuesPerCategory, setCo2ValuesPerCategory] = useState(
    Array.from({ length: props.category.length }, () => [])
  );
  const [totalCo2, setTotalCo2] = useState(0);

  const handleCo2ValuesChange = (index, value) => {
    setCo2ValuesPerCategory((prevValues) => {
      const newValues = [...prevValues];
      newValues[activeStep][index] = value;
      return newValues;
    });
  };

  const handleStepChange = (step) => {
    {console.log(co2ValuesPerCategory)}
    setActiveStep(step);
  };

  const handleSwitchChange = (name) => {
    setIsDetailed((prevIsDetailed) => ({
      ...prevIsDetailed,
      [name]: !prevIsDetailed[name],
    }));
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 2, textAlign: "center" }}>
        <QuestionStepper
          activeStep={activeStep}
          category={props.category}
          onStepChange={handleStepChange}
          isSmallScreen={isSmallScreen}
        />
        <Questions
          key={activeStep}
          questions={props.category[activeStep].questions}
          isDetailed={isDetailed}
          onSwitchChange={handleSwitchChange}
          onCo2ValuesChange={handleCo2ValuesChange}
        />
        <CalculationSum
          values={co2ValuesPerCategory}
          totalCo2={totalCo2}
          setTotalCo2={setTotalCo2}
        />
        <BottomStepper
          activeStep={activeStep}
          category={props.category}
          onStepChange={handleStepChange}
        />
      </Box>
    </Container>
  );
};

export default QuestionCategory;
