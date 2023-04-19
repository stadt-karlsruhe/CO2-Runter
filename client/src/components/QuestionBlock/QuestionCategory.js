import React from "react";
import MobileStepper from "@mui/material/MobileStepper";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import QuestionBlock from "./QuestionBlock";
import { Box, Button, Container, useMediaQuery } from "@mui/material";

const QuestionCategory = (props) => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [isDetailed, setIsDetailed] = React.useState({});
  const isSmallScreen = useMediaQuery((theme) => theme.breakpoints.down("sm"));

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
      <Box sx={{ my: 2 }}>
        <Stepper activeStep={activeStep}>
          {props.category.map((label, index) => (
            <Step key={label.name}>
              <StepLabel onClick={() => handleStepChange(index)}>
                {!isSmallScreen && label.name}
              </StepLabel>
            </Step>
          ))}
        </Stepper>
        <Box sx={{ overflow: "auto", maxHeight: "70vh" }}>
          {props.category[activeStep].questions.map((categoryQuestions) => (
            <QuestionBlock
              key={categoryQuestions.name}
              questions={categoryQuestions}
              isDetailed={isDetailed[categoryQuestions.name]}
              onSwitchChange={() => handleSwitchChange(categoryQuestions.name)}
            />
          ))}
        </Box>
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
