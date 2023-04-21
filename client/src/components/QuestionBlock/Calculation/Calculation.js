import React, {useState} from "react";

const Calculation = () => {
  const [totalCO2, setTotalCO2] = useState(0);

  const baseCO2 = 2;

  calculate((input) => {
    let co2;
    if (typeof input === "number") {
      co2 = input;
    } else if (typeof input === "object") {
      const { formula, values } = input;
      co2 = formula(values);
    }
    return setTotalCO2(baseCO2 + co2)
  });

  return <CurrentCO2 co2Value={totalCO2} />;
};

export default Calculation;
