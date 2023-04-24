import * as React from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import { Box, Container } from "@mui/material";

const Inputfield = (props) => {
  const [value, setValue] = React.useState(props.value);
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
  const handleChange = (event) => {
    const valueAsNumber = parseFloat(event.target.value);
    if (!isNaN(valueAsNumber)) {
      if (valueAsNumber > props.maxInput) {
        setValue(props.maxInput);
        props.onCo2ValuesChange(calculateCO2(props.maxInput), event.target.value);
      } else {
        setValue(valueAsNumber);
        props.onCo2ValuesChange(calculateCO2(valueAsNumber), event.target.value);
      }
    }
  };

  return (
    <Container>
      {" "}
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        {" "}
        <OutlinedInput
          id="outlined-adornment"
          type="number"
          value={props.value !== undefined ? props.value : 0}
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
        />{" "}
      </Box>{" "}
    </Container>
  );
};

export default Inputfield;
