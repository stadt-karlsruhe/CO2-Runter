import * as React from "react";
import Slider from "@mui/material/Slider";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

import { updateItem } from '../../features/Store';
import { useDispatch } from 'react-redux';


const CostumSlider = (props) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [value, setValue] = React.useState(
    props.value !== undefined ? props.value : 0
  );

  const dispatch = useDispatch();

  const valueAdjustToSlider = 100 / (props.values.length - 1);
  let marks = props.replies.map((replies, index) => ({
    value: props.values[index] * valueAdjustToSlider,
    label:
      isSmallScreen && index !== 0 && index !== props.replies.length - 1
        ? ""
        : replies,
  }));
  const handleChange = (event, newValue) => {
    setValue(newValue);
    const value = newValue / valueAdjustToSlider
    //props.onCo2ValuesChange(value);

    const activeStep = props.rememberValue[0] // 0
    const index = props.rememberValue[1]// 0
    dispatch(updateItem({ category: activeStep, index: index, value: value }));

    console.log("Slider - value: ",value)
    console.log("Slider - cat/idx: ",activeStep,index)


  };

  const valueLabelFormat = (value) => {
    return marks.findIndex((mark) => mark.value === value);
  };
  return (
    <Slider
      aria-label="Restricted values"
      value={value}
      valueLabelFormat={valueLabelFormat}
      step={null}
      marks={marks}
      onChange={handleChange}
    />
  );
};

export default CostumSlider;