import React, { useState } from "react";
import Switch from "@mui/material/Switch";
import Question from "./Question";

const QuestionBlock = (props) => {
  const [isDetailed, setIsDetailed] = useState(false);

  const handleSwitchChange = () => {
    setIsDetailed((prevIsDetailed) => !prevIsDetailed);
  };

  return (
    <div>
      <h3>{props.questions.name}</h3>

      {isDetailed ? (
        <Question questions={props.questions.detailed}></Question>
      ) : (
        <Question questions={props.questions.quick}></Question>
      )}

      <Switch checked={isDetailed} onChange={handleSwitchChange} />
    </div>
  );
};

export default QuestionBlock;