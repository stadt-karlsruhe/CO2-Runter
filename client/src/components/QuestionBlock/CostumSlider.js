import * as React from "react";
import Slider from "@mui/material/Slider";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

const CostumSlider = (props) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const minValue = Math.min(...props.values);
  const valueAdjustToSlider = 100 / (props.values.length - 1);
  let marks = props.replies.map((replies, index) => ({
    value: props.values[index] * valueAdjustToSlider,
    label:
      isSmallScreen && index !== 0 && index !== props.replies.length - 1
        ? ""
        : replies,
  }));

  const handleChange = (event) => {
    props.onCo2ValuesChange(event.target.value);
  };

  const valueLabelFormat = (value) => {
    return marks.findIndex((mark) => mark.value === value);
  };
  return (
    <Slider
      aria-label="Restricted values"
      defaultValue={minValue}
      valueLabelFormat={valueLabelFormat}
      step={null}
      marks={marks}
      onChange={handleChange}
    />
  );
};

export default CostumSlider;
