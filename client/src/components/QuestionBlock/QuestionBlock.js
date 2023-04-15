import React, { useState } from "react";
import Switch from "@mui/material/Switch";
import Question from "./Question";
import { Divider, FormGroup, Stack, Typography } from "@mui/material";

const QuestionBlock = (props) => {
  const [isDetailed, setIsDetailed] = useState(false);

  const handleSwitchChange = () => {
    setIsDetailed((prevIsDetailed) => !prevIsDetailed);
  };

  return (
    <div className="question-block-container">
      <h3>{props.questions.name}</h3>
      <Divider />
      {isDetailed ? (
        props.questions.detailed.questions.map((question) => (
          <div>
            <Question question={question} />
            <Divider sx={{padding:1}} />
          </div>
        ))
      ) : (
        <Question question={props.questions.quick} />
      )}
      <FormGroup>
        <Stack direction="row" spacing={1} alignItems="center">
          <Typography>schnell</Typography>
          <Switch checked={isDetailed} onChange={handleSwitchChange} />
          <Typography>detailliert</Typography>
        </Stack>
      </FormGroup>
    </div>
  );
};

export default QuestionBlock;
