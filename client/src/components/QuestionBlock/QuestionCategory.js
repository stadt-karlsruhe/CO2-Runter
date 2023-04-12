import React from "react";
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
      <div>
        {activeStep > 0 && (
          <button onClick={() => handleStepChange(activeStep - 1)}>Back</button>
        )}
        {activeStep < 4 - 1 && (
          <button onClick={() => handleStepChange(activeStep + 1)}>Next</button>
        )}
      </div>
    </div>
  );
};

export default QuestionCategory;
