import * as React from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from '@mui/material/InputAdornment';

const Inputfield = (props) => {
  return (
    <div>
      <OutlinedInput
        id="outlined-adornment"
        type="number"
        endAdornment={<InputAdornment position="end">{props.value}</InputAdornment>}
        aria-describedby="outlined-weight-helper-text"
      />
    </div>
  );
};

export default Inputfield;
