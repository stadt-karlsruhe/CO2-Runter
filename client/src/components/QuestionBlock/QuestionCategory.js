import React, { useState } from "react";
import { Box, Container, useMediaQuery } from "@mui/material";
import CalculationSum from "./Calculation/CalculationSum";
import Questions from "./Questions";
import QuestionStepper from "./QuestionStepper";
import BottomStepper from "./BottomStepper";
import ChoiceScreen from "../DistrictGroupChoice/ChoiceScreen";

const QuestionCategory = (props) => {
  const [finish, setFinish] = useState(false);
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
      {!finish ? (
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
            onFinish={setFinish}
          />
        </Box>
      ) : (
        <ChoiceScreen co2ValuesPerCategory={co2ValuesPerCategory} categories={props.categories} />
      )}
    </Container>
  );
};

export default QuestionCategory;
