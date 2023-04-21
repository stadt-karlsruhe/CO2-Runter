import React, { useState, useEffect } from "react";
import CurrentCO2 from "../CurrentCO2";

const CalculationSum = (props) => {
  const [totalCo2, setTotalCo2] = useState(0);
  const baseCO2 = 2;

  useEffect(() => {
    // Überprüfen Sie, ob alle Werte im `values`-Prop Zahlen sind
    if (props.values.every((value) => typeof value === "number")) {
      setTotalCo2(
        baseCO2 + props.values.reduce((sum, number) => sum + number, 0)
      );
    }
  }, [props.values]);

  return <CurrentCO2 co2Value={baseCO2 + totalCo2} />;
};

export default CalculationSum;