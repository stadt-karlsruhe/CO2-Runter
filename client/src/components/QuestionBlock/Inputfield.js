import * as React from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import { Box, Container } from "@mui/material";

const Inputfield = (props) => {
  const [value, setValue] = React.useState(0);

  const handleFocus = () => {
    if (value === 0) {
      setValue("");
    }
  };

  const handleChange = (event) => {
    const valueAsNumber = parseFloat(event.target.value);
    setValue(valueAsNumber);
    props.onCo2ValuesChange(event.target.value);
  };

  return (
    <Container>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
        <OutlinedInput
          id="outlined-adornment"
          type="number"
          value={value}
          onChange={handleChange}
          onFocus={handleFocus}
          inputProps={{ style: { textAlign: "right" } }}
          endAdornment={
            <InputAdornment position="end">{props.unit}</InputAdornment>
          }
        />
      </Box>
    </Container>
  );
};

export default Inputfield;
