import React, { useEffect } from "react";
import CurrentCO2 from "../CurrentCO2";

const CalculationSum = (props) => {
  const { totalCo2, setTotalCo2 } = props;
  const baseCO2 = 1.15;

  useEffect(() => {
    const valuesAsNumbers = props.values
      .flat()
      .map((value) => (value === "" ? 0 : parseFloat(value)))
      .filter((value) => !isNaN(value));

    setTotalCo2(
      baseCO2+valuesAsNumbers.reduce((sum, number) => sum + number, 0)
    );
  }, [props.values, setTotalCo2]);

  return <CurrentCO2 co2Value={totalCo2} />;
};

export default CalculationSum;