import React from "react";
import MobileStepper from "@mui/material/MobileStepper";
import { Button} from "@mui/material";

const BottomStepper = ({ activeStep, category, onStepChange }) => (
    <MobileStepper
      variant="dots"
      steps={category.length}
      activeStep={activeStep}
      position={"static"}
      nextButton={
        <Button
          size="small"
          onClick={() => onStepChange(activeStep + 1)}
          disabled={activeStep === category.length - 1}
        >
          Next
        </Button>
      }
      backButton={
        <Button
          size="small"
          onClick={() => onStepChange(activeStep - 1)}
          disabled={activeStep === 0}
        >
          Back
        </Button>
      }
    />
  );

  export default BottomStepper;