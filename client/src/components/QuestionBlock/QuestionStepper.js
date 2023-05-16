import React from "react";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { Typography} from "@mui/material";

const QuestionStepper = ({
  activeStep,
  category,
  onStepChange,
  isSmallScreen,
}) => (
    <>
    <Stepper activeStep={activeStep}>
      {category.map((label, index) => (
        <Step key={label.name}>
          <StepLabel onClick={() => onStepChange(index)}>
            {!isSmallScreen && label.name}
          </StepLabel>
        </Step>
      ))}
    </Stepper>
    {isSmallScreen && (
      <Typography variant="caption" align="center" sx={{ fontWeight: "bold" }}>
        {category[activeStep].name}
      </Typography>
    )}
  </>
);

export default QuestionStepper;
