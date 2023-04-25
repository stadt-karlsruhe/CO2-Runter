import React from "react";
import MobileStepper from "@mui/material/MobileStepper";
import { Button } from "@mui/material";

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
      >
        {activeStep === category.length - 1 ? "Ende" : "Weiter"}
      </Button>
    }
    backButton={
      <Button
        size="small"
        onClick={() => onStepChange(activeStep - 1)}
        disabled={activeStep === 0}
      >
        Zurück
      </Button>
    }
  />
);

export default BottomStepper;
