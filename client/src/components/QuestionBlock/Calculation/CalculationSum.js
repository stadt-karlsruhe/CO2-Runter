import React, { useState, useEffect } from "react";
import CurrentCO2 from "../CurrentCO2";

const CalculationSum = (props) => {
  const [totalCo2, setTotalCo2] = useState(0);
  const baseCO2 = 2;

  useEffect(() => {
    const valuesAsNumbers = props.values
      .map((value) => (value === "" ? 0 : parseFloat(value)))
      .filter((value) => !isNaN(value));

    setTotalCo2(
      baseCO2 + valuesAsNumbers.reduce((sum, number) => sum + number, 0)
    );
  }, [props.values]);

  return <CurrentCO2 co2Value={baseCO2 + totalCo2} />;
};

export default CalculationSum;
