import * as React from "react";
import Slider from "@mui/material/Slider";

const QuestionBlock = (props) => {
  const minValue = Math.min(...props.values);
  const valueAdjustToSlider = 100/(props.values.length-1);
  const marks = props.replies.map((replies, index) => ({
    value: props.values[index] * valueAdjustToSlider,
    label: replies
  }));


  function valuetext(value) {
    return `${value}`;
  }

  function valueLabelFormat(value) {
    return marks.findIndex((mark) => mark.value === value);
  }

  return (
      <Slider
        aria-label="Restricted values"
        defaultValue={minValue}
        valueLabelFormat={valueLabelFormat}
        getAriaValueText={valuetext}
        step={null}
        valueLabelDisplay="off"
        marks={marks}
      />
  );
};

export default QuestionBlock;
