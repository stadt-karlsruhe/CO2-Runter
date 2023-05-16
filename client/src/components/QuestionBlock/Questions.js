import React from "react";
import { Box } from "@mui/material";
import QuestionBlock from "./QuestionBlock";

const Questions = ({
  questions,
  isDetailed,
  onSwitchChange,
  onCo2ValuesChange,
}) => (
  <Box
    sx={{
      overflow: "scroll",
      maxHeight: "70vh",
      "@media (max-width: 600px)": {
        maxHeight: "63vh",
      },
    }}
  >
    {questions.map((categoryQuestions, index) => (
      <QuestionBlock
        key={index}
        questions={categoryQuestions}
        isDetailed={isDetailed[categoryQuestions.name]}
        onSwitchChange={() => onSwitchChange(categoryQuestions.name)}
        onCo2ValuesChange={(value) => onCo2ValuesChange(index, value)}
      />
    ))}
  </Box>
);

export default Questions;
