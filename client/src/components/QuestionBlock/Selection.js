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
      {answer === "" && (
        <InputLabel id="simple-select-label">Wählen Sie eine Option</InputLabel>
      )}
      <Select
        labelId="simple-select-label"
        id="simple-select"
        value={answer}
        label={props.label}
        onChange={handleChange}
      >
        {props.replies.map((replies, index) => (
          <MenuItem key={index} value={props.values[index]}>
            {replies}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default Selection;
