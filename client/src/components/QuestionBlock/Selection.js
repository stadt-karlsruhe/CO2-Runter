import * as React from "react";
import { useEffect, useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import { updateItem } from '../../features/Store';
import { useDispatch } from 'react-redux';


const Selection = (props) => {
  console.log("DBG: selection props:", props)
  const storedData = localStorage.getItem("CO2questions");
  const jsonData = JSON.parse(storedData);

  const dispatch = useDispatch();
  
  const calculateSelectedValue = () => {
    let selectedValue = "";
 
    if(props.detailed){
      selectedValue = jsonData.category[props.rememberValue[0]].questions[props.rememberValue[1]].detailed.questions[props.rememberValue[2]].selectedValue;
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
      console.log("Selection - detailed")
      jsonData.category[props.rememberValue[0]].questions[props.rememberValue[1]].detailed.questions[props.rememberValue[2]].selectedValue = selectedValue;
    }else{
      console.log("Selection - quick")
      jsonData.category[props.rememberValue[0]].questions[props.rememberValue[1]].quick.selectedValue = selectedValue;
    }
    setSelectedValue(selectedValue);
    localStorage.setItem("CO2questions", JSON.stringify(jsonData));


    const activeStep = props.rememberValue[0] // 0
    const index = props.rememberValue[1]// 0
    dispatch(updateItem({ category: activeStep, index: index, value: selectedValue }));

    console.log("Selection - selected: ",selectedValue)
    console.log("Selection - updating local storage: ",jsonData)
    console.log("Selection - cat/idx: ",activeStep,index)

    //props.onCo2ValuesChange(selectedValue, selectedValue);
  };

  return (
    <FormControl fullWidth>
      {(selectedValue === "" || typeof selectedValue === "undefined") && (
        <InputLabel id="simple-select-label">
          Wählen Sie eine Option
        </InputLabel>
      )}
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
