import React from "react";
import MobileStepper from "@mui/material/MobileStepper";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import QuestionBlock from "./QuestionBlock";

const QuestionCategory = (props) => {
  const [activeStep, setActiveStep] = React.useState(0);

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  return (
    <div>
      <Stepper activeStep={activeStep}>
        {props.category.map((label) => (
          <Step key={label.name}>
            <StepLabel>{label.name}</StepLabel>
          </Step>
        ))}
      </Stepper>
      {props.category[activeStep].questions.map((categoryQuestions) => (
        <QuestionBlock questions={categoryQuestions} />
      ))}
      <MobileStepper
        variant="dots"
        steps={props.category.length}
        activeStep={activeStep}
        nextButton={
          <button
            onClick={() => handleStepChange(activeStep + 1)}
            disabled={activeStep === props.category.length - 1}
          >
            Next
          </button>
        }
        backButton={
          <button
            onClick={() => handleStepChange(activeStep - 1)}
            disabled={activeStep === 0}
          >
            Back
          </button>
        }
      >
        {props.category.map((label, index) => (
          <Step key={index}>
            <StepLabel onClick={() => handleStepChange(index)}>
              {label.name}
            </StepLabel>
          </Step>
        ))}
      </MobileStepper>
    </div>
  );
};

export default QuestionCategory;
