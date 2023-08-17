import React, { useEffect } from "react";
import CurrentCO2 from "../CurrentCO2";

import ComputeTotalCo2 from "./ComputeTotalCo2"

import { useSelector } from 'react-redux';


const CalculationSum = () => {

  const baseCO2 = 1.15;

  const categories = useSelector(state => state.categories); // Replace 'categories' with your state slice name
  console.log("co2 cats:",categories)

  const co2vals = ComputeTotalCo2(categories.categories)
  console.log("Calculate:",co2vals)

  /*
  const co2Sum = [
    categories.categories[0].reduce((acc, val) => acc + val, 0),
    categories.categories[1].reduce((acc, val) => acc + val, 0),
    categories.categories[2].reduce((acc, val) => acc + val, 0),
    categories.categories[3].reduce((acc, val) => acc + val, 0)
  ].reduce((acc,val) => acc + val,0)
  */
  console.log("New sum: ",co2vals.sum)

/*
  useEffect(() => {
    const valuesAsNumbers = props.values
      .flat()
      .map((value) => (value === "" ? 0 : parseFloat(value)))
      .filter((value) => !isNaN(value));

    setTotalCo2(
      baseCO2+valuesAsNumbers.reduce((sum, number) => sum + number, 0)
    );
  }, [props.values, setTotalCo2]);
*/
//return <CurrentCO2 co2Value={totalCo2} />;
  return <CurrentCO2 co2Value={co2vals.sum} />;
};

export default CalculationSum;