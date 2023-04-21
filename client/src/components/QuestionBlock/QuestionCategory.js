import React, { useState } from "react";
import MobileStepper from "@mui/material/MobileStepper";
import CurrentCO2 from "./CurrentCO2";
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

const QuestionCategory = (props) => {
  const [activeStep, setActiveStep] = useState(0);
  const [isDetailed, setIsDetailed] = useState({});
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const [co2Values, setCo2Values] = useState ([]);

  const handleCo2ValuesChange = (value) => {
    setCo2Values((prevValues) => [...prevValues, value]);
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
              test={index}
              questions={categoryQuestions}
              isDetailed={isDetailed[categoryQuestions.name]}
              onSwitchChange={() => handleSwitchChange(categoryQuestions.name)}
              onCo2ValuesChange={handleCo2ValuesChange}
            />
          ))}
        </Box>
        <CurrentCO2 co2Value="20" />
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
      <div>Test<ul>
        {co2Values.map((value, index) => (
          <li key={index}>{value}</li>
        ))}
      </ul></div>
    </Container>
  );
};

export default QuestionCategory;
