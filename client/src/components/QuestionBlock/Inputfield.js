import * as React from "react";
import { useEffect } from "react";
import Input from "@mui/material/Input";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import { Box, Container } from "@mui/material";

import { updateItem } from '../../features/Store';
import { useDispatch } from 'react-redux';

const Inputfield = (props) => {
  const storedData = localStorage.getItem("CO2questions");
  const jsonData = JSON.parse(storedData);

  const dispatch = useDispatch();

  const calculateSelectedValue = () => {
    let selectedValue = "";

    if (props.detailed) {
      selectedValue = jsonData.category[props.rememberValue[0]].questions[props.rememberValue[1]].detailed.questions[props.rememberValue[2]].selectedValue;
      if ((selectedValue == "") || (selectedValue == 0)) {
        selectedValue = jsonData.category[props.rememberValue[0]].questions[props.rememberValue[1]].detailed.questions[props.rememberValue[2]].defaultValue
      }
    } else {
      selectedValue = jsonData.category[props.rememberValue[0]].questions[props.rememberValue[1]].quick.selectedValue;
      if ((selectedValue == "") || (selectedValue == 0)) {
        selectedValue = jsonData.category[props.rememberValue[0]].questions[props.rememberValue[1]].quick.defaultValue
      }
    }
    return selectedValue || 0;
  }

  const [value, setValue] = React.useState(calculateSelectedValue);
  const handleFocus = () => {
    if (value === 0) {
      setValue("");
    }
  };
  const calculateCO2 = (number) => {
    if (!props.detailed) {
      const formulaString = props.formula;
      console.log("DBG - Input: ", number, ", formula ", formulaString)
      const formula = eval(`(${formulaString})`);
      return formula(number);
    } else {
      const formulaString = jsonData.category[props.rememberValue[0]].questions[props.rememberValue[1]].detailed.formula
      console.log("DBG - Input: formula ", formulaString)
      const formula = eval(`(${formulaString})`);
      const values = []
      jsonData.category[props.rememberValue[0]].questions[props.rememberValue[1]].detailed.questions.forEach((v,i)=> {
        console.log(v,i)
        const detFormString =  jsonData.category[props.rememberValue[0]].questions[props.rememberValue[1]].detailed.questions[i].formula
        console.log(detFormString)
        const detFormula = eval(`(${detFormString})`);
        if (v.selectedValue == "") {
          values.push(detFormula(v.defaultValue))
        } else {
          values.push(detFormula(v.selectedValue))
        }
      })
      console.log("DBG - Input: values ", values)
      const result = formula(values)
      console.log("DBG - Input: result ", result)
      return result

    }
  };

  const saveSelectedValue = (selectedValue) => {
    if (props.detailed) {
      jsonData.category[props.rememberValue[0]].questions[props.rememberValue[1]].detailed.questions[props.rememberValue[2]].selectedValue = selectedValue;
      console.log("DBG input detailed: ", jsonData.category[props.rememberValue[0]].questions[props.rememberValue[1]].detailed.questions)
      console.log("DBG input detailed: ", jsonData.category[props.rememberValue[0]].questions[props.rememberValue[1]].detailed.formula)
    } else {
      jsonData.category[props.rememberValue[0]].questions[props.rememberValue[1]].quick.selectedValue = selectedValue;
    }
    localStorage.setItem("CO2questions", JSON.stringify(jsonData));
  }

  const handleChange = (event) => {
    const inputValue = event.target.value
    console.log("Input value: ",inputValue)
    const valueAsNumber = parseFloat(inputValue);
    console.log("Input number: ",valueAsNumber)

    let co2value = calculateCO2(0) //props.minInput)
    if (!isNaN(valueAsNumber)) {
      if (valueAsNumber > props.maxInput) {
        setValue(props.maxInput);
        saveSelectedValue(props.maxInput)
      } else {
        setValue(valueAsNumber);
        saveSelectedValue(valueAsNumber)
        co2value = calculateCO2(valueAsNumber)
      }
    }
    //props.onCo2ValuesChange(value, event.target.value);
    const activeStep = props.rememberValue[0] // 0
    const index = props.rememberValue[1]// 0
    dispatch(updateItem({ category: activeStep, index: index, value: co2value }));

    console.log("Input - value: ", co2value)
    console.log("Input - cat/idx: ", activeStep, index)

  };

  useEffect(() => {
    const newSelectedValue = calculateSelectedValue();
    setValue(newSelectedValue);
  }, [props.detailed]);

  // <OutlinedInput
  //

  return (
    <Container>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <OutlinedInput
          id="outlined-adornment"
          type="number"
          value={value}
          onChange={handleChange}
          onFocus={handleFocus}
          inputProps={{
            style: { textAlign: "right" },
            min: 0,
            max: props.maxInput,
          }}
          endAdornment={
            <InputAdornment position="end">{props.unit}</InputAdornment>
          }
        />
      </Box>
    </Container>
  );
};

export default Inputfield;
