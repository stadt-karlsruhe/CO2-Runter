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
        props.questions.detailed.questions.map((question) => (
          <Question question={question} />
        ))
      ) : (
        <Question question={props.questions.quick} />
      )}
      <Switch checked={isDetailed} onChange={handleSwitchChange} />
    </div>
  );
};

export default QuestionBlock;