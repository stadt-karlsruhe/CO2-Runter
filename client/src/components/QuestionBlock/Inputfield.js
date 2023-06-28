import * as React from "react";
import { useEffect } from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import { Box, Container } from "@mui/material";

const Inputfield = (props) => {
  const storedData = localStorage.getItem("CO2questions");
  const jsonData = JSON.parse(storedData);

  const calculateSelectedValue = () => {
    let selectedValue = "";
 
    if(props.detailed){
      selectedValue = jsonData.category[props.rememberValue[0]].questions[props.rememberValue[1]].detailed.questions[props.rememberValue[2]].selectedValue;
    }else{
      selectedValue = jsonData.category[props.rememberValue[0]].questions[props.rememberValue[1]].quick.selectedValue;
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
    const formulaString = props.formula;
    const formula = eval(`(${formulaString})`);
    return formula(number);
  };

  const saveSelectedValue = (selectedValue) => {
    if(props.detailed){
      jsonData.category[props.rememberValue[0]].questions[props.rememberValue[1]].detailed.questions[props.rememberValue[2]].selectedValue = selectedValue;
    }else{
      jsonData.category[props.rememberValue[0]].questions[props.rememberValue[1]].quick.selectedValue = selectedValue;
    }
    localStorage.setItem("CO2questions", JSON.stringify(jsonData));
  }

  const handleChange = (event) => {
    const valueAsNumber = parseFloat(event.target.value);
    if (!isNaN(valueAsNumber)) {
      if (valueAsNumber > props.maxInput) {
        setValue(props.maxInput);
        saveSelectedValue(props.maxInput)
        props.onCo2ValuesChange(calculateCO2(props.maxInput), event.target.value);
      } else {
        setValue(valueAsNumber);
        saveSelectedValue(valueAsNumber)
        props.onCo2ValuesChange(calculateCO2(valueAsNumber), event.target.value);
      }
    }
  };

  useEffect(() => {
    const newSelectedValue = calculateSelectedValue();
    setValue(newSelectedValue);
  }, [props.detailed]);

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
