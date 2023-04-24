import React, { useState } from "react";
import MobileStepper from "@mui/material/MobileStepper";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import QuestionBlock from "./QuestionBlock";
import {
  Typography,
  Box,
  Button,
  Container,
  useMediaQuery,
} from "@mui/material";
import CalculationSum from "./Calculation/CalculationSum";

const QuestionCategory = (props) => {
  const [activeStep, setActiveStep] = useState(0);
  const [isDetailed, setIsDetailed] = useState({});
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const [co2ValuesPerCategory, setCo2ValuesPerCategory] = useState ([]);

  const handleCo2ValuesChange = (index, value) => {
    setCo2ValuesPerCategory((prevValues) => {
      const newValues = [...prevValues];
      newValues[index] = value;
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
      <Box sx={{ my: 2, textAlign: "center" }}>
        <Stepper activeStep={activeStep}>
          {props.category.map((label, index) => (
            <Step key={label.name}>
              <StepLabel onClick={() => handleStepChange(index)}>
                {!isSmallScreen && label.name}
              </StepLabel>
            </Step>
          ))}
        </Stepper>
        {isSmallScreen && (
          <Typography variant="caption" align="center" sx={{fontWeight: "bold"}}>
            {props.category[activeStep].name}
          </Typography>
        )}
        <Box sx={{ overflow: "scroll", maxHeight: "70vh" }}>
          {props.category[activeStep].questions.map((categoryQuestions, index) => (
            <QuestionBlock
              key={index}
              questions={categoryQuestions}
              isDetailed={isDetailed[categoryQuestions.name]}
              onSwitchChange={() => handleSwitchChange(categoryQuestions.name)}
              onCo2ValuesChange={(value)=>handleCo2ValuesChange (index, value)}
            />
          ))}
        </Box>
        <CalculationSum values={co2ValuesPerCategory} />
        <MobileStepper
          variant="dots"
          steps={props.category.length}
          activeStep={activeStep}
          position={"static"}
          nextButton={
            <Button
              size="small"
              onClick={() => handleStepChange(activeStep + 1)}
              disabled={activeStep === props.category.length - 1}
            >
              Next
            </Button>
          }
          backButton={
            <Button
              size="small"
              onClick={() => handleStepChange(activeStep - 1)}
              disabled={activeStep === 0}
            >
              Back
            </Button>
          }
        />
      </Box>
    </Container>
  );
};

export default QuestionCategory;
