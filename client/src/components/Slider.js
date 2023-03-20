import * as React from "react";
import Slider from "@mui/material/Slider";

const QuestionBlock = (props) => {
  const maxValue = Math.max(...props.values);
  const valueAdjustToSlider = 100/(props.values.length-1);
  const marks = props.answer.map((answer, index) => ({
    value: props.values[index] * valueAdjustToSlider,
    label: answer
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
        defaultValue={maxValue}
        valueLabelFormat={valueLabelFormat}
        getAriaValueText={valuetext}
        step={null}
        valueLabelDisplay="off"
        marks={marks}
      />
  );
};

export default QuestionBlock;
