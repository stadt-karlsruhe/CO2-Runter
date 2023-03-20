import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const Selection = (props) => {
  const [answer, setAnswer] = React.useState("");

  const handleChange = (event) => {
    setAnswer(event.target.value);
  };

  return (
      <FormControl fullWidth>
        <InputLabel id="simple-select-label">{props.label}</InputLabel>
        <Select
          labelId="simple-select-label"
          id="simple-select"
          value={answer}
          label={props.label}
          onChange={handleChange}
        >
        {props.answer.map((answer, index) => (
        <MenuItem key={index} value={props.values[index]}>{answer}</MenuItem>
        ))}
        </Select>
      </FormControl>
  );
};

export default Selection;
