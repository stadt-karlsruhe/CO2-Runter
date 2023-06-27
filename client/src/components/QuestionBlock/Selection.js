import * as React from "react";
import { useEffect, useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const Selection = (props) => {
  const storedData = localStorage.getItem("CO2questions");
  const jsonData = JSON.parse(storedData);
 
  const calculateSelectedValue = () => {
    let selectedValue = "";
 
    if(props.detailed){
      selectedValue = jsonData.category[props.rememberValue[0]].questions[props.rememberValue[1]].detailed.questions[2].selectedValue;
    }else{
      selectedValue = jsonData.category[props.rememberValue[0]].questions[props.rememberValue[1]].quick.selectedValue;
    }
    return selectedValue || "";
  }
  const [selectedValue, setSelectedValue] = useState(() =>
  calculateSelectedValue()
  );

  useEffect(() => {
    const newSelectedValue = calculateSelectedValue();
    setSelectedValue(newSelectedValue);
  }, [props.detailed]);

  const handleChange = (event) => {
    const selectedValue = event.target.value;
    
    if(props.detailed){
      jsonData.category[props.rememberValue[0]].questions[props.rememberValue[1]].detailed.questions[2].selectedValue = selectedValue;
    }else{
      jsonData.category[props.rememberValue[0]].questions[props.rememberValue[1]].quick.selectedValue = selectedValue;
    }
    setSelectedValue(selectedValue);
    localStorage.setItem("CO2questions", JSON.stringify(jsonData));
    props.onCo2ValuesChange(selectedValue, selectedValue);
  };

  return (
    <FormControl fullWidth>
      {(selectedValue === "" || typeof selectedValue === "undefined") && (
        <InputLabel id="simple-select-label">
          Wählen Sie eine Option
        </InputLabel>
      )}
      {console.log("1"+calculateSelectedValue())}
      <Select
        labelId="simple-select-label"
        id="simple-select"
        value={selectedValue}
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
